import { getRequestHeaders } from '@tanstack/react-start/server';
import ky from 'ky';
import { auth } from '#/lib/auth/auth.server';
import type {
	SpotifyArtist,
	SpotifyPaginatedResponse,
	SpotifyProfile,
	SpotifyTimeRange,
	SpotifyTrack
} from '#/types/spotify';

const spotifyApi = ky.create({
	prefix: 'https://api.spotify.com/v1'
});

type GetUsersTopItemsOptions = {
	limit?: number;
	range?: SpotifyTimeRange;
};

type GetTopStatsOptions = {
	type: 'artists' | 'tracks';
	limit: number;
	range: SpotifyTimeRange;
};

export async function createSpotifyApiClient() {
	const response = await auth.api.getAccessToken({
		body: {
			providerId: 'spotify'
		},
		headers: getRequestHeaders()
	});

	const spotifyAuthorizedApi = spotifyApi.extend({
		headers: {
			Authorization: `Bearer ${response.accessToken}`
		}
	});

	async function getTopStats<ResponseType>({
		type,
		limit,
		range
	}: GetTopStatsOptions) {
		return spotifyAuthorizedApi
			.get(`me/top/${type}`, {
				searchParams: {
					limit: String(limit),
					time_range: range
				}
			})
			.json<SpotifyPaginatedResponse<ResponseType>>();
	}

	return {
		getProfile: () => spotifyAuthorizedApi.get('me').json<SpotifyProfile>(),
		getUsersTopTracks: ({
			limit = 50,
			range = 'medium_term'
		}: GetUsersTopItemsOptions) =>
			getTopStats<SpotifyTrack>({ type: 'tracks', limit, range }),
		getUsersTopArtists: ({
			limit = 50,
			range = 'medium_term'
		}: GetUsersTopItemsOptions) =>
			getTopStats<SpotifyArtist>({ type: 'artists', limit, range })
	};
}
