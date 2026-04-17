import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { env } from '#/env/env.server';

export const auth = betterAuth({
	socialProviders: {
		spotify: {
			scope: [
				'user-read-email',
				'user-top-read',
				'user-follow-read',
				'user-read-recently-played',
				'playlist-read-private',
				'user-read-currently-playing'
			],
			clientId: env.SPOTIFY_CLIENT_ID,
			clientSecret: env.SPOTIFY_CLIENT_SECRET
		}
	},
	plugins: [tanstackStartCookies()]
});
