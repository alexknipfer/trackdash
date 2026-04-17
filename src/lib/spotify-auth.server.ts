import ky from 'ky';

import { env } from '#/env/env.server';
import type { SpotifyTokenResponse } from '#/types/spotify';

const authToken = Buffer.from(
	`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString('base64');

const spotifyApi = ky.create({
	prefix: 'https://accounts.spotify.com/api',
	headers: {
		Authorization: `Basic ${authToken}`,
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

function getAccessToken(refreshToken: string) {
	return spotifyApi
		.get('token', {
			searchParams: {
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			}
		})
		.json<SpotifyTokenResponse>();
}

export const SpotifyAuth = {
	getAccessToken
};
