import { createServerFn } from '@tanstack/react-start';

import { authorizeMiddleware, spotifyClientMiddleware } from '#/lib/middleware';

export const getTopStats = createServerFn({ method: 'GET' })
	.middleware([authorizeMiddleware, spotifyClientMiddleware])
	.handler(async ({ context }) => {
		const [topTracks, topArtists] = await Promise.all([
			context.spotifyClient.getUsersTopTracks({ limit: 10 }),
			context.spotifyClient.getUsersTopArtists({ limit: 10 })
		]);

		return {
			topTracks,
			topArtists
		};
	});
