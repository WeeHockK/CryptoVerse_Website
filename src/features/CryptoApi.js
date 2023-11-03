import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'f652751e9cmshf051350b05c8ac0p16bc6cjsn5274732157fa',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCrypto: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoInfo: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timeperiod}) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`)
        }),
    }),
});

export const{
    useGetCryptoQuery,
    useGetCryptoInfoQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;