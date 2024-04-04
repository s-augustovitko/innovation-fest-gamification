package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

// GETStatistics godoc
// @Summary GET Statistics
// @Schemes
// @Produce json
// @Success 200 {object} models.UserStatistics
// @Router /statistics [get]
func GETStatistics(userEventsCollection collections.UserEventsCollection, baseLevelXP int) func(c *gin.Context) {
	return func(c *gin.Context) {
		userStatistics, err := getUserStatistics(c.Request.Context(), userEventsCollection, baseLevelXP)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, userStatistics)
	}
}

func getUserStatistics(ctx context.Context, userEventsCollection collections.UserEventsCollection, baseLevelXP int) (models.UserStatistics, error) {
	userEvents, err := userEventsCollection.GetUserEvents(ctx)
	if err != nil {
		return models.UserStatistics{}, err
	}

	userStatistics := models.UserStatistics{
		TimeWatchedMsPerCategory: map[string]int64{},
		TimeWatchedMsPerChannel:  map[string]int64{},
		TimeWatchedMsPerSeries:   map[string]int64{},
	}

	for _, userEvent := range userEvents {
		userStatistics.TimeWatchedMsTotal += userEvent.TimeWatchedMs

		if userEvent.Category != "" {
			_, alreadyExists := userStatistics.TimeWatchedMsPerCategory[userEvent.Category]
			if !alreadyExists {
				userStatistics.TimeWatchedMsPerCategory[userEvent.Category] = 0
			}
			userStatistics.TimeWatchedMsPerCategory[userEvent.Category] += userEvent.TimeWatchedMs
		}

		if userEvent.Channel != "" {
			_, alreadyExists := userStatistics.TimeWatchedMsPerChannel[userEvent.Channel]
			if !alreadyExists {
				userStatistics.TimeWatchedMsPerChannel[userEvent.Channel] = 0
			}
			userStatistics.TimeWatchedMsPerChannel[userEvent.Channel] += userEvent.TimeWatchedMs
		}

		if userEvent.Series != "" {
			_, alreadyExists := userStatistics.TimeWatchedMsPerSeries[userEvent.Series]
			if !alreadyExists {
				userStatistics.TimeWatchedMsPerSeries[userEvent.Series] = 0
			}
			userStatistics.TimeWatchedMsPerSeries[userEvent.Series] += userEvent.TimeWatchedMs
		}
	}

	userStatistics.XP = calculateXP(userStatistics.TimeWatchedMsTotal)

	userStatistics.Level,
		userStatistics.XPPreviousLevel,
		userStatistics.XPNextLevel =
		calculateLevel(userStatistics.XP, baseLevelXP)

	userStatistics.LevelTitle = levelTitle(userStatistics.Level)
	if userStatistics.Level > 0 {
		userStatistics.PreviousLevelTitle = levelTitle(userStatistics.Level - 1)
	}
	userStatistics.NextLevelTitle = levelTitle(userStatistics.Level + 1)

	return userStatistics, nil
}

// 1 second watched = 1 XP
func calculateXP(timeWatchedMsTotal int64) int64 {
	return timeWatchedMsTotal / 1000
}

func calculateLevel(currentXP int64, baseLevelXP int) (level, xpPreviousLevel, xpNextLevel int64) {
	level = int64(0)
	xpPreviousLevel = int64(0)
	xpNextLevel = int64(baseLevelXP)
	stepXP := float64(baseLevelXP)

	for {
		if currentXP >= xpPreviousLevel && currentXP < xpNextLevel {
			break
		}
		level++
		xpPreviousLevel = xpNextLevel
		stepXP *= 1.25 // how harder is the next level compared with the previous one (25% harder in this case)
		xpNextLevel += int64(stepXP)
	}

	return level, xpPreviousLevel, xpNextLevel
}

func levelTitle(level int64) string {
	switch level {
	case 0:
		return "Novice"
	case 1:
		return "Starter"
	case 2:
		return "Apprentice"
	case 3:
		return "Journeyman"
	case 4:
		return "Adept"
	case 5:
		return "Expert"
	case 6:
		return "Master"
	case 7:
		return "Grand Master"
	case 8:
		return "Doyen"
	case 9:
		return "Guru"
	default:
		return "Yoda"
	}
}
