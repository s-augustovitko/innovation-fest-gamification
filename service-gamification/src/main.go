package main

import (
	"context"

	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/api"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/config"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/collections"
)

func main() {
	ctx := context.Background()

	cfg, err := config.ReadFromEnv()
	if err != nil {
		panic(err)
	}

	db, err := database.New(ctx, cfg.MongoDBURI)
	if err != nil {
		panic(err)
	}
	defer db.Close(ctx)

	err = db.Ping(ctx)
	if err != nil {
		panic(err)
	}

	usersCollection := collections.User(db, cfg.MongoDBDatabase, cfg.UserID)
	userEventsCollection := collections.UserEvents(db, cfg.MongoDBDatabase, cfg.UserID)

	api, err := api.New(usersCollection, userEventsCollection, cfg.BaseLevelXP)
	if err != nil {
		panic(err)
	}

	err = api.Run(":" + cfg.APIPort)
	if err != nil {
		panic(err)
	}
}
