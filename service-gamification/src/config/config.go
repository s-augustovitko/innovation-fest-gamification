package config

import (
	"fmt"
	"os"
	"strconv"

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
	BaseLevelXP     int
}

func ReadFromEnv() (*Config, error) {
	err := godotenv.Load(configFilePath)
	if err != nil {
		return nil, err
	}

	baseLevelXP, err := strconv.Atoi(os.Getenv("BASE_LEVEL_XP"))
	if err != nil {
		return nil, fmt.Errorf("invalid env var BASE_LEVEL_XP: %w", err)
	}

	return &Config{
		APIPort:         os.Getenv("API_PORT"),
		MongoDBURI:      os.Getenv("MONGODB_URI"),
		MongoDBDatabase: os.Getenv("MONGODB_DATABASE"),
		UserID:          os.Getenv("USER_ID"),
		BaseLevelXP:     baseLevelXP,
	}, nil
}
