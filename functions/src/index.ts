/* eslint-disable no-throw-literal */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
import admin = require('firebase-admin');
admin.initializeApp();
import * as functions from 'firebase-functions';

import { onRequest, onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { main, parseSongFromRequest } from './openai';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const suggestions = onCall({ cors: true }, async (request) => {
  const { data } = request;
  return await main(data);
});

export const updateSessionsCurrentSong = onCall(
  { cors: true },
  async (request: any) => {
    const { data } = request;
    try {
      const db = admin.firestore();
      await db
        .collection('sessions')
        .doc(data.sessionId)
        .update({
          current_song_playing: data.song,
        })
        .catch((err) => {
          throw 'Failed to update song:' + err;
        });
    } catch (error: any) {
      throw new functions.https.HttpsError(
        'internal',
        'Failed to update song: ' + (error.message || error)
      );
    }
  }
);

export const getNormalizedSongName = onCall(
  { cors: true },
  async (request: any) => {
    const { data } = request;
    try {
      return await parseSongFromRequest(data.song);
    } catch (error: any) {
      throw new functions.https.HttpsError(
        'internal',
        'Failed to name song: ' + (error.message || error)
      );
    }
  }
);
