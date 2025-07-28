import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import themeReducer from './slice/themeSlice';
import adminColorReducer from './slice/adminColorSlice';
import adminLandingReducer from './slice/adminLandingSlice';
import websiteReducer from './slice/websiteSlice';
import publicApiReducer from './slice/publicApiSlice';
import denotionReducer from './slice/denotionSlice';
import packageReducer from './slice/packageSlice';
import contactReducer from './slice/contactSlice';

import tourTransportReducer from './slice/tourTransportSlice';
import packageDetailReducer from './slice/packageDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    adminColor: adminColorReducer,
    adminLanding: adminLandingReducer,
    website: websiteReducer,
    publicApi: publicApiReducer,
    denotion: denotionReducer,
    package: packageReducer,
    contact: contactReducer,
    tourTransport: tourTransportReducer,
    packageDetail: packageDetailReducer,
  },
});
