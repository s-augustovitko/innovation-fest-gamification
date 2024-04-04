package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/models"
)

// GETConfig godoc
// @Summary GET Config
// @Schemes
// @Produce json
// @Success 200 {array} models.InputConfig
// @Router /config [get]
func GETConfig(baseLevelXP int) func(c *gin.Context) {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, getConfig(baseLevelXP))
	}
}

func getConfig(baseLevelXP int) models.InputConfig {
	updateTimeMs := baseLevelXP * 200

	return models.InputConfig{
		UpdateTimeMs: int64(updateTimeMs),
	}
}
