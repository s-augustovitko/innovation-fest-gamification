package handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

// GETBadges godoc
// @Summary GET Badges
// @Schemes
// @Produce json
// @Success 200 {array} models.Badge
// @Router /badges [get]
func GETBadges(usersCollection collections.UsersCollection) func(c *gin.Context) {
	return func(c *gin.Context) {
		// TODO: example code, remove before actual implementation {
		testUser, _ := usersCollection.GetUser(c.Request.Context(), "000000000000000000000001")
		log.Println(testUser)
		// }
		// TODO: actual implementation
	}
}
