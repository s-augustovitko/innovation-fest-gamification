package collections

import (
	"context"

	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database"
	"github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserEventsCollection interface {
	GetUserEvents(ctx context.Context) ([]models.UserEvent, error)
	AddUserEvents(ctx context.Context, userEvents []models.UserEvent) error
}

type userEvents struct {
	*mongo.Collection
	userID string
}

func UserEvents(db database.Database, dbName string, userID string) UserEventsCollection {
	return &userEvents{
		Collection: db.Collection(dbName, "user-events"),
		userID:     userID,
	}
}

func (c *userEvents) GetUserEvents(ctx context.Context) ([]models.UserEvent, error) {
	idPrimitive, err := primitive.ObjectIDFromHex(c.userID)
	if err != nil {
		return nil, err
	}

	var userEvents []models.UserEvent

	cur, err := c.Find(ctx, bson.M{"userId": idPrimitive})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	for cur.Next(ctx) {
		var userEvent models.UserEvent
		err := cur.Decode(&userEvent)
		if err != nil {
			return nil, err
		}
		userEvents = append(userEvents, userEvent)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}

	return userEvents, nil
}

func (c *userEvents) AddUserEvents(ctx context.Context, userEvents []models.UserEvent) error {
	idPrimitive, err := primitive.ObjectIDFromHex(c.userID)
	if err != nil {
		return err
	}

	documents := make([]interface{}, len(userEvents))

	for i := range userEvents {
		userEvents[i].ID = primitive.NewObjectID()
		userEvents[i].UserID = idPrimitive

		documents[i] = userEvents[i]
	}

	_, err = c.InsertMany(ctx, documents)
	if err != nil {
		return err
	}

	return nil
}
