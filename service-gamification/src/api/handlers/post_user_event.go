package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
	dbmodels "github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/models"
)

const (
	userEventTypeVOD  = "vod"
	userEventTypeLive = "live"
)

// POSTUserEvent godoc
// @Summary POST User Event
// @Schemes
// @Accept json
// @Produce json
// @Param user_event body models.UserEvent true "User event data"
// @Success 201 {object} models.UserStatistics
// @Router /user_event [post]
func POSTUserEvent(userEventsCollection collections.UserEventsCollection, baseLevelXP int) func(c *gin.Context) {
	return func(c *gin.Context) {
		ctx := c.Request.Context()

		var userEvent models.UserEvent
		if err := c.BindJSON(&userEvent); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := validateUserEvent(userEvent); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := userEventsCollection.AddUserEvent(ctx, dbmodels.UserEvent{
			Type:          userEvent.Type,
			TimeWatchedMs: userEvent.TimeWatchedMs,
			Channel:       userEvent.Channel,
			Series:        userEvent.Series,
			EpisodeNumber: userEvent.EpisodeNumber,
			Category:      userEvent.Category,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		userStatistics, err := getUserStatistics(ctx, userEventsCollection, baseLevelXP)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, userStatistics)
	}
}

func validateUserEvent(userEvent models.UserEvent) error {
	if userEvent.Type == "" {
		return errors.New("missing attribute 'type'")
	}
	if userEvent.Type != userEventTypeVOD && userEvent.Type != userEventTypeLive {
		return errors.New("attribute 'type' should be 'vod' or 'live'")
	}
	if userEvent.Category == "" {
		return errors.New("missing attribute 'category'")
	}
	if userEvent.TimeWatchedMs == 0 {
		return errors.New("missing attribute 'time_watched_ms'")
	}
	if userEvent.Type == userEventTypeVOD {
		if userEvent.Series == "" {
			return errors.New("missing attribute 'series' for type vod")
		}
		if userEvent.EpisodeNumber == 0 {
			return errors.New("missing attribute 'episode_number' for type vod")
		}
	}
	if userEvent.Type == userEventTypeLive {
		if userEvent.Channel == "" {
			return errors.New("missing attribute 'channel' for type live")
		}
	}

	return nil
}
