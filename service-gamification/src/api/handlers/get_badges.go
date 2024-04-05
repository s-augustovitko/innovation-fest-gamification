package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

// GETBadges godoc
// @Summary GET Badges
// @Schemes
// @Produce json
// @Success 200 {array} models.Badge
// @Router /badges [get]
func GETBadges(userEventsCollection collections.UserEventsCollection) func(c *gin.Context) {
	return func(c *gin.Context) {
		badges, err := getBadges(c.Request.Context(), userEventsCollection)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err,
			})
		}
		c.JSON(http.StatusOK, badges)
	}
}

func getBadges(ctx context.Context, userEventsCollection collections.UserEventsCollection) ([]models.Badge, error) {
	badges := []models.Badge{}

	halfMinute := int64(30000)

	//counters
	liveShowCount := 0
	totalTimeWatched := int64(0)
	var channels []string

	events, err := userEventsCollection.GetUserEvents(ctx)
	if err != nil {
		return nil, err
	}

	for _, event := range events {
		if event.Type == "live" {
			liveShowCount += 1
		}

		totalTimeWatched += event.TimeWatchedMs

		if event.Channel != "" && !CheckIfExistsStr(event.Channel, channels) {
			channels = append(channels, event.Channel)
		}
	}

	if liveShowCount > 0 {
		badge := models.Badge{
			Name:        "Couch Potato",
			Description: "Watched one Live event",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > halfMinute {
		badge := models.Badge{
			Name:        "Rookie",
			Description: "Watched 1 hour of content",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > (halfMinute * 5) {
		badge := models.Badge{
			Name:        "Genin",
			Description: "Watched 5 hours of content",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > (halfMinute * 24) {
		badge := models.Badge{
			Name:        "Chunin",
			Description: "Watched 24 hours of content",
		}

		badges = append(badges, badge)
	}

	if len(channels) >= 1 {
		badge := models.Badge{
			Name:        "Explorer",
			Description: "Watched content from more than 1 channel",
		}

		badges = append(badges, badge)

	}

	return badges, nil
}

// CheckIfExistsStr checks if slice of strings contains a string
func CheckIfExistsStr(value string, possibleValues []string) bool {
	for _, possibleValue := range possibleValues {
		if value == possibleValue {
			return true
		}
	}
	return false
}
