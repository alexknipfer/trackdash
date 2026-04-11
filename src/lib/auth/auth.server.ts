import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { env } from '#/env/env.server';

export const auth = betterAuth({
	socialProviders: {
		spotify: {
			clientId: env.SPOTIFY_CLIENT_ID,
			clientSecret: env.SPOTIFY_CLIENT_SECRET
		}
	},
	plugins: [tanstackStartCookies()]
});
