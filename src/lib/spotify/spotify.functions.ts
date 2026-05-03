import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { authorizeMiddleware, spotifyClientMiddleware } from '#/lib/middleware';
import {
	type SpotifyArtist,
	type SpotifyPaginatedResponse,
	spotifyTimeRangeSchema
} from '#/types/spotify';

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

export const getTopArtistsByRange = createServerFn({ method: 'GET' })
	.middleware([authorizeMiddleware, spotifyClientMiddleware])
	.inputValidator(
		z.object({
			range: spotifyTimeRangeSchema
		})
	)
	.handler(
		({ context, data }): Promise<SpotifyPaginatedResponse<SpotifyArtist>> => {
			return context.spotifyClient.getUsersTopArtists({
				limit: 50,
				range: data.range
			});
		}
	);
