import { createServerFn } from '@tanstack/react-start';

import { Spotify } from './spotify.server';

export const getSpotifyProfile = createServerFn({ method: 'GET' }).handler(
	async () => {
		return Spotify.getProfile();
	}
);

export const getTopStats = createServerFn({ method: 'GET' }).handler(
	async () => {
		const [topTracks, topArtists] = await Promise.all([
			Spotify.getUsersTopTracks({ limit: 10 }),
			Spotify.getUsersTopArtists({ limit: 10 })
		]);

		return {
			topTracks,
			topArtists
		};
	}
);
