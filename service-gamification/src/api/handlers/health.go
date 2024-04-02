package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Health godoc
// @Summary Health check route
// @Schemes
// @Produce json
// @Success 200 {object} map[string]any
// @Router /health [get]
func Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
