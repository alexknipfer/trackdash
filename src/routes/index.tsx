import { createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '#/components/ui/button';
import { getSession } from '#/lib/auth/auth.functions';
import { authClient } from '#/lib/auth/auth-client';

export const Route = createFileRoute('/')({
	beforeLoad: async () => {
		const session = await getSession();

		if (session) {
			throw redirect({ to: '/dashboard' });
		}
	},
	component: App
});

function App() {
	const loginWithSpotify = async () => {
		await authClient.signIn.social({
			provider: 'spotify'
		});
	};

	return (
		<main className="min-h-svh flex items-center justify-center">
			<Button size="lg" onClick={loginWithSpotify}>
				Login with Spotify
			</Button>
		</main>
	);
}
