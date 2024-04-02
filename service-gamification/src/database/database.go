package database

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database interface {
	Ping(ctx context.Context) error
	Close(ctx context.Context) error

	Collection(database, name string) *mongo.Collection
}

type database struct {
	client *mongo.Client
}

func New(ctx context.Context, uri string) (Database, error) {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, err
	}

	return &database{
		client: client,
	}, nil
}

func (db *database) Ping(ctx context.Context) error {
	return db.client.Ping(ctx, readpref.SecondaryPreferred())
}

func (db *database) Close(ctx context.Context) error {
	return db.client.Disconnect(ctx)
}

func (db *database) Collection(database, name string) *mongo.Collection {
	return db.client.Database(database).Collection(name)
}
