import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '#/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { getTopArtistsByRange } from '#/lib/spotify/spotify.functions';
import { cn, getSmallestSpotifyImage } from '#/lib/utils';
import {
	type SpotifyArtist,
	type SpotifyTimeRange,
	spotifyTimeRangeOptions,
	spotifyTimeRangeSchema
} from '#/types/spotify';

function ArtistCardSkeleton() {
	return (
		<div className="flex flex-col items-center p-4 rounded-lg">
			<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-muted animate-pulse mb-3" />
			<div className="w-24 h-4 bg-muted animate-pulse rounded mb-1" />
			<div className="w-16 h-3 bg-muted animate-pulse rounded" />
		</div>
	);
}

function ArtistsSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
			{Array.from({ length: 18 }).map((_, i) => (
				<ArtistCardSkeleton key={i} />
			))}
		</div>
	);
}

function PendingComponent() {
	return (
		<div className="container mx-auto px-4 py-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Top Artists</CardTitle>
					<CardDescription>
						Your most played artists over different time periods
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs value="medium_term" className="w-full">
						<TabsList className="mb-6">
							{spotifyTimeRangeOptions.map((range) => (
								<TabsTrigger key={range} value={range} disabled>
									{timeRangeLabels[range]}
								</TabsTrigger>
							))}
						</TabsList>

						<TabsContent value="medium_term">
							<ArtistsSkeleton />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}

export const Route = createFileRoute('/_protected/dashboard/artists')({
	validateSearch: z.object({
		time_range: spotifyTimeRangeSchema.optional().default('medium_term')
	}),
	loaderDeps: ({ search: { time_range } }) => ({ time_range }),
	loader: async ({ deps: { time_range } }) => {
		const topArtists = await getTopArtistsByRange({
			data: { range: time_range }
		});

		return { topArtists };
	},
	pendingMinMs: 500,
	pendingMs: 0,
	pendingComponent: PendingComponent,
	component: TopArtistsComponent
});

const timeRangeLabels: Record<SpotifyTimeRange, string> = {
	long_term: 'All Time',
	medium_term: 'Last 6 Months',
	short_term: 'Last 4 Weeks'
};

function TopArtistsComponent() {
	const { topArtists } = Route.useLoaderData();
	const { time_range } = Route.useSearch();
	const navigate = Route.useNavigate();

	const handleTabChange = (value: string) => {
		navigate({ search: { time_range: value as SpotifyTimeRange } });
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Top Artists</CardTitle>
					<CardDescription>
						Your most played artists over different time periods
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						value={time_range}
						onValueChange={handleTabChange}
						className="w-full"
					>
						<TabsList className="mb-6">
							{spotifyTimeRangeOptions.map((range) => (
								<TabsTrigger key={range} value={range}>
									{timeRangeLabels[range]}
								</TabsTrigger>
							))}
						</TabsList>

						{spotifyTimeRangeOptions.map((range) => (
							<TabsContent key={range} value={range}>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
									{topArtists.items.map((artist: SpotifyArtist) => {
										const image = getSmallestSpotifyImage(artist.images);

										return (
											<a
												key={artist.id}
												href={artist.external_urls.spotify}
												target="_blank"
												rel="noopener noreferrer"
												className={cn(
													'group flex flex-col items-center p-4 rounded-lg transition-colors',
													'hover:bg-muted/50'
												)}
											>
												{image ? (
													<img
														src={image.url}
														alt={artist.name}
														width={120}
														height={120}
														className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-3 shadow-md group-hover:shadow-lg transition-shadow"
													/>
												) : (
													<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-muted mb-3 flex items-center justify-center">
														<span className="text-muted-foreground text-xs">
															No Image
														</span>
													</div>
												)}
												<h3 className="font-semibold text-sm text-center line-clamp-2 mb-1">
													{artist.name}
												</h3>
												<p className="text-xs text-muted-foreground text-center">
													{artist.followers.total.toLocaleString('en-US')}{' '}
													followers
												</p>
											</a>
										);
									})}
								</div>
							</TabsContent>
						))}
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
