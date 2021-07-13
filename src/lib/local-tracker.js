import { addAnalyticsPlugin } from '@uniformdev/optimize-tracker-analytics';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import { indexedDbScopeStorage } from "@uniformdev/optimize-tracker-storage-indexeddb"
import { createCookieStorage } from './cookie-storage';
import intentManifest from './intentManifest.json';

const trackerInstance = ({ analytics, cookiePlugin, isServer, scoring }) => {
  return createDefaultTracker({
    intentManifest,
    ...(analytics && {
      addPlugins: [addAnalyticsPlugin(analytics)],
    }),
    isServer: isServer,
    ...(cookiePlugin && {
      storage: {
        scopes: indexedDbScopeStorage({
          scoringStorage: createCookieStorage(cookiePlugin),
        }),
      },
    }),
    ...(scoring && {
      initialIntentScores: scoring,
    }),
    logLevelThreshold: process.env === 'production' ? 'error' : 'info',
  });
};

export default trackerInstance;
