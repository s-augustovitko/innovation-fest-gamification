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
// @Success 200 {array} []models.Badge
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

func getBadges(ctx context.Context, userEventsCollection collections.UserEventsCollection) ([]models.Badge, error){
	badges := []models.Badge{}

	hour := int64(3600000)

	//counters 
	liveShowCount := 0
	totalTimeWatched := int64(0)
	var channels []string


	events, err := userEventsCollection.GetUserEvents(ctx)
	if err != nil {
		return nil, err
	}

	for _, event := range events{
		if event.Type == "live" {
			liveShowCount += 1
		}

		totalTimeWatched += event.TimeWatchedMs

		if !CheckIfExistsStr(event.Channel, channels){
			channels = append(channels, event.Channel)
		}
		
	}

	if liveShowCount > 0 {
		badge := models.Badge{
			Name: "Live Show Novice", 
			Description: "Watched one Live event",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > hour{
		badge := models.Badge{
			Name: "Content Rookie", 
			Description: "Watched 1 hour of content",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > (hour * 5) {
		badge := models.Badge{
			Name: "Content Genin", 
			Description: "Watched 5 hours of content",
		}

		badges = append(badges, badge)
	}

	if totalTimeWatched > (hour * 24) {
		badge := models.Badge{
			Name: "Content Chunin", 
			Description: "Watched 24 hours of content",
		}

		badges = append(badges, badge)
	}

	if len(channels) > 1 {
		badge := models.Badge{
			Name: "Content Explorer", 
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
