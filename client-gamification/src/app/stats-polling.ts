import { api } from "./features/api.ts";
import { store } from "./store.ts";

export const startPolling = async () => {
    const configResponse = await store.dispatch(api.endpoints?.getConfig.initiate(undefined, {forceRefetch: true}));
    const config = configResponse.data;

    if (config) {
        setInterval(async () => {
            await store.dispatch(api.endpoints?.getStatistics.initiate(undefined, {forceRefetch: true}));
        }, config.update_time_ms);
    }
};