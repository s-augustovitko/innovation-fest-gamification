package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

// GETStatistics godoc
// @Summary GET Statistics
// @Schemes
// @Produce json
// @Success 200 {array} models.UserStatistics
// @Router /statistics [get]
func GETStatistics(userEventsCollection collections.UserEventsCollection) func(c *gin.Context) {
	return func(c *gin.Context) {
		userStatistics, err := getUserStatistics(c.Request.Context(), userEventsCollection)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err,
			})
			return
		}

		c.JSON(http.StatusOK, userStatistics)
	}
}

func getUserStatistics(ctx context.Context, userEventsCollection collections.UserEventsCollection) (models.UserStatistics, error) {
	userEvents, err := userEventsCollection.GetUserEvents(ctx)
	if err != nil {
		return models.UserStatistics{}, err
	}

	var userStatistics models.UserStatistics

	for _, userEvent := range userEvents {
		// TODO
		log.Println(userEvent)
	}

	return userStatistics, nil
}
