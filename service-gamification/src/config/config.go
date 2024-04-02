package config

import (
	"os"

	"github.com/joho/godotenv"
)

const (
	configFilePath = "./service-gamification/config.env"
)

type Config struct {
	APIPort         string
	MongoDBURI      string
	MongoDBDatabase string
	UserID          string
}

func ReadFromEnv() (*Config, error) {
	err := godotenv.Load(configFilePath)
	if err != nil {
		return nil, err
	}

	return &Config{
		APIPort:         os.Getenv("API_PORT"),
		MongoDBURI:      os.Getenv("MONGODB_URI"),
		MongoDBDatabase: os.Getenv("MONGODB_DATABASE"),
		UserID:          os.Getenv("USER_ID"),
	}, nil
}
