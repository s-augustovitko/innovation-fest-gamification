import { apiBaseUrl } from "./config.ts";

export function sendBeacon(data: Array<Record<string, string | number>>) {
    const reqData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon(apiBaseUrl + "/user_events", reqData);
}