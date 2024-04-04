package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

const (
	userEventTypeVOD  = "vod"
	userEventTypeLive = "live"
)

// POSTUserEvents godoc
// @Summary POST User Events
// @Schemes
// @Accept json
// @Produce json
// @Param user_events body models.UserEvents true "User events data"
// @Success 201 {object} models.UserStatistics
// @Router /user_events [post]
func POSTUserEvents(userEventsCollection collections.UserEventsCollection, baseLevelXP int) func(c *gin.Context) {
	return func(c *gin.Context) {
		ctx := c.Request.Context()

		var userEvents models.UserEvents
		if err := c.BindJSON(&userEvents); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := validateUserEvents(userEvents); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := userEventsCollection.AddUserEvents(ctx, userEvents.ToDatabaseModel())
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

func validateUserEvents(userEvents models.UserEvents) error {
	for _, userEvent := range userEvents {
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
	}

	return nil
}
