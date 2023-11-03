import { configureStore} from '@reduxjs/toolkit';
import { cryptoApi } from '../features/CryptoApi';
import { cryptoNewsApi } from '../features/CryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cryptoApi.middleware)
            .concat(cryptoNewsApi.middleware),
});