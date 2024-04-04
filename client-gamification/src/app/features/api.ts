import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConfigType, StatisticsType } from "../../types.ts";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://service-mock.devtools.pluto.tv/innovation-fest-gamified"
    }),
    endpoints: (builder) => ({
        getHealth: builder.query({
            query: () => "/health"
        }),
        getBadges: builder.query({
            query: () => "/badges"
        }),
        getStatistics: builder.query<StatisticsType, void>({
            query: () => "/statistics"
        }),
        getConfig: builder.query<ConfigType, void>({
            query: () => "/config"
        })
    })
});

export const { useGetHealthQuery, useGetBadgesQuery, useGetStatisticsQuery, useGetConfigQuery } = api;