package models

import (
	dbmodels "github.com/s-augustovitko/innovation-fest-gamification/service-gamification/src/database/models"
)

type Badge struct {
	Name string `json:"name"`
	// TODO
}

type UserStatistics struct {
	XP                 int64  `json:"xp"`
	XPPreviousLevel    int64  `json:"xp_previous_level"`
	XPNextLevel        int64  `json:"xp_next_level"`
	Level              int64  `json:"level"`
	LevelTitle         string `json:"level_title"`
	PreviousLevelTitle string `json:"previous_level_title"`
	NextLevelTitle     string `json:"next_level_title"`

	TimeWatchedMsTotal       int64            `json:"time_watched_ms_total"`
	TimeWatchedMsPerCategory map[string]int64 `json:"time_watched_ms_per_category"`
	TimeWatchedMsPerChannel  map[string]int64 `json:"time_watched_ms_per_channel"`
	TimeWatchedMsPerSeries   map[string]int64 `json:"time_watched_ms_per_series"`
}

type InputConfig struct {
	UpdateTimeMs int64 `json:"update_time_ms"`
}

type UserEvent struct {
	Type          string `json:"type"`
	TimeWatchedMs int64  `json:"time_watched_ms"`
	Channel       string `json:"channel"`
	Series        string `json:"series"`
	EpisodeNumber int64  `json:"episode_number"`
	Category      string `json:"category"`
}

type UserEvents []UserEvent

func (userEvents UserEvents) ToDatabaseModel() []dbmodels.UserEvent {
	dbUserEvents := make([]dbmodels.UserEvent, len(userEvents))
	for i, userEvent := range userEvents {
		dbUserEvents[i] = dbmodels.UserEvent{
			Type:          userEvent.Type,
			TimeWatchedMs: userEvent.TimeWatchedMs,
			Channel:       userEvent.Channel,
			Series:        userEvent.Series,
			EpisodeNumber: userEvent.EpisodeNumber,
			Category:      userEvent.Category,
		}
	}
	return dbUserEvents
}
