package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID primitive.ObjectID `bson:"_id"`
}

type UserEvent struct {
	ID primitive.ObjectID `bson:"_id"`

	UserID        primitive.ObjectID `bson:"userId"`
	Type          string             `bson:"type"`
	TimeWatchedMs int64              `bson:"timeWatchedMs"`
	Channel       string             `bson:"channel"`
	Series        string             `bson:"series"`
	EpisodeNumber int64              `bson:"episodeNumber"`
	Category      string             `bson:"category"`
}

type UserPopulated struct {
	ID     primitive.ObjectID `bson:"_id"`
	Events []UserEvent
}
