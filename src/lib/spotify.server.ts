import { getRequestHeaders } from '@tanstack/react-start/server';
import ky from 'ky';
import type {
	SpotifyArtist,
	SpotifyPaginatedResponse,
	SpotifyProfile,
	SpotifyTimeRange,
	SpotifyTrack
} from '#/types/spotify';
import { auth } from './auth/auth.server';

const spotifyApi = ky.create({
	prefix: 'https://api.spotify.com/v1',
	hooks: {
		beforeRequest: [
			async ({ request }) => {
				const { accessToken } = await auth.api.getAccessToken({
					body: {
						providerId: 'spotify'
					},
					headers: getRequestHeaders()
				});

				request.headers.set('Authorization', `Bearer ${accessToken}`);
			}
		]
	}
});

function getProfile() {
	return spotifyApi.get('me').json<SpotifyProfile>();
}

type GetUsersTopTracksOptions = {
	limit?: number;
	range?: SpotifyTimeRange;
};

function getUsersTopTracks({
	limit = 50,
	range = 'long_term'
}: GetUsersTopTracksOptions) {
	return getTopStats<SpotifyTrack>({
		type: 'tracks',
		limit,
		range
	});
}

type GetUsersTopArtistsOptions = {
	limit?: number;
	range?: SpotifyTimeRange;
};

function getUsersTopArtists({
	limit = 50,
	range = 'long_term'
}: GetUsersTopArtistsOptions) {
	return getTopStats<SpotifyArtist>({
		type: 'artists',
		limit,
		range
	});
}

type GetTopStatsOptions = {
	type: 'artists' | 'tracks';
	limit: number;
	range: SpotifyTimeRange;
};

function getTopStats<ResponseType>({ type, limit, range }: GetTopStatsOptions) {
	return spotifyApi
		.get(`me/top/${type}`, {
			searchParams: {
				limit: String(limit),
				time_range: range
			}
		})
		.json<SpotifyPaginatedResponse<ResponseType>>();
}

export const Spotify = {
	getProfile,
	getUsersTopTracks,
	getUsersTopArtists
};
