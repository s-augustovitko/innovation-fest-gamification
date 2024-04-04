package handlers

import (
	"github.com/gin-gonic/gin"
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
		// TODO
	}
}
