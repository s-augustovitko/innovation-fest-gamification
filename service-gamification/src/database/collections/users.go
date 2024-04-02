package collections

import (
	"context"

	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UsersCollection interface {
	GetUser(ctx context.Context, id string) (models.User, error)
}

type users struct {
	*mongo.Collection
}

func User(db database.Database, dbName string) UsersCollection {
	return &users{
		db.Collection(dbName, "users"),
	}
}

func (c *users) GetUser(ctx context.Context, id string) (models.User, error) {
	idPrimitive, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.User{}, err
	}

	var user models.User

	err = c.FindOne(ctx, bson.M{"_id": idPrimitive}).Decode(&user)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}
