package models

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
