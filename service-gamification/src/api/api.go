package api

import (
	"github.com/gin-gonic/gin"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api/handlers"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
	docs "github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/docs"
	swaggerfiles "github.com/swaggo/files"
	ginswagger "github.com/swaggo/gin-swagger"
)

type API interface {
	Run(addr ...string) error
}

type api struct {
	gin *gin.Engine
}

func New(usersCollection collections.UsersCollection, userEventsCollection collections.UserEventsCollection, baseLevelXP int) (API, error) {
	r := gin.Default()

	// Swagger docs
	docs.SwaggerInfo.BasePath = ""
	r.GET("/swagger/*any", ginswagger.WrapHandler(swaggerfiles.Handler))

	// Routes
	r.GET("/health", handlers.Health)
	r.GET("/badges", handlers.GETBadges(userEventsCollection))
	r.GET("/statistics", handlers.GETStatistics(userEventsCollection, baseLevelXP))
	r.GET("/config", handlers.GETConfig(baseLevelXP))
	// TODO: the other routes

	return &api{
		gin: r,
	}, nil
}

func (a *api) Run(addr ...string) error {
	return a.gin.Run(addr...)
}
