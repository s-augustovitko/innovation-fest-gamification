export type ConfigType = { update_time_ms: number };

export type StatisticsType = {
    "xp": number,
    "xp_previous_level": number,
    "xp_next_level": number,
    "level": number,
    "level_title": "Apprentice",
    "previous_level_title": "Starter",
    "next_level_title": "Journeyman",
    "time_watched_ms_total": number,
    "time_watched_ms_per_category": {
        "Comedy": number,
        "News": number
    },
    "time_watched_ms_per_channel": {
        "CBS": number
    },
    "time_watched_ms_per_series": {
        "South Park": number
    }
}
