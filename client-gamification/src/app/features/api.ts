import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConfigType, StatisticsType } from "../../types.ts";
import { apiBaseUrl } from "../config.ts";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl
    }),
    endpoints: (builder) => ({
        getHealth: builder.query({
            query: () => "/health"
        }),
        getStatistics: builder.query<StatisticsType, void>({
            query: () => "/statistics"
        }),
        getConfig: builder.query<ConfigType, void>({
            query: () => "/config"
        })
    })
});

export const { useGetHealthQuery, useGetStatisticsQuery, useGetConfigQuery } = api;