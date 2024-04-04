import { api } from "./features/api.ts";
import { store } from "./store.ts";
import { sendBeacon } from "./send-beacon.ts";

const mockedEvents = [
    {
        "type": "live",
        "time_watched_ms": 180000,
        "channel": "CBS",
        "category": "News"
    },
]

export const startPolling = async () => {
    const configResponse = await store.dispatch(api.endpoints?.getConfig.initiate(undefined, {forceRefetch: true}));
    const config = configResponse.data;

    if (config) {
        setInterval(async () => {
            await store.dispatch(api.endpoints?.getStatistics.initiate(undefined, { forceRefetch: true }));
            sendBeacon(mockedEvents)
        }, config.update_time_ms);
    }
};