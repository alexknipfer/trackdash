import { createFileRoute } from '@tanstack/react-router';
import { Music, TrendingUp } from 'lucide-react';
import { Button } from '#/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from '#/components/ui/card';
import { getTopStats } from '#/lib/spotify.functions';

export const Route = createFileRoute('/_protected/dashboard')({
	loader: async () => getTopStats(),
	component: RouteComponent
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-row gap-2 px-3">
			<Card className="w-full">
				<CardHeader className="">
					<CardAction>
						<Button
							variant="ghost"
							size="sm"
							className="text-primary hover:text-primary/80"
						>
							See All
						</Button>
					</CardAction>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5 text-primary" />
						Top Artists
					</CardTitle>
				</CardHeader>
				<CardContent>Testing</CardContent>
			</Card>
			<Card className="w-full">
				<CardHeader className="flex items-center justify-between">
					<CardTitle className="flex items-center font-medium gap-2 text-foreground text-lg">
						<Music className="h-5 w-5 text-primary" />
						Top Tracks
					</CardTitle>
					<Button
						variant="ghost"
						size="sm"
						className="text-primary hover:text-primary/80"
					>
						See All
					</Button>
				</CardHeader>
			</Card>
		</div>
	);
}
