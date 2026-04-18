import { createMiddleware } from '@tanstack/react-start';

import { ensureSession } from '#/lib/auth/auth.functions';
import { createSpotifyApiClient } from '#/lib/spotify/spotify.server';

export const authorizeMiddleware = createMiddleware({
	type: 'function'
}).server(async ({ next }) => {
	const session = await ensureSession();

	return next({
		context: {
			session
		}
	});
});

export const spotifyClientMiddleware = createMiddleware({
	type: 'function'
}).server(async ({ next }) => {
	const spotifyClient = await createSpotifyApiClient();

	return next({
		context: {
			spotifyClient
		}
	});
});
