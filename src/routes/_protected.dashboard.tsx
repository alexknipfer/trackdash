import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Music, TrendingUp } from 'lucide-react';
import { Button, buttonVariants } from '#/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle
} from '#/components/ui/card';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle
} from '#/components/ui/item';
import { getTopStats } from '#/lib/spotify/spotify.functions';
import {
	cn,
	getSmallestSpotifyImage,
	millisToMinutesAndSeconds
} from '#/lib/utils';

export const Route = createFileRoute('/_protected/dashboard')({
	loader: async () => getTopStats(),
	component: RouteComponent
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<div className="flex flex-row gap-6 px-10">
			<Card className="w-full">
				<CardHeader>
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
				<CardContent>
					<ItemGroup>
						{data.topArtists.items.map((artist) => {
							const image = getSmallestSpotifyImage(artist.images);

							return (
								<Item
									key={artist.id}
									variant="outline"
									role="listitem"
									render={
										<a href="/">
											{image && (
												<ItemMedia variant="image">
													<img
														src={image.url}
														alt={artist.name}
														width={32}
														height={32}
														className="object-cover rounded-lg"
													/>
												</ItemMedia>
											)}
											<ItemContent>
												<ItemTitle className="line-clamp-1">
													{artist.name}
												</ItemTitle>
												<ItemDescription className="line-clamp-1 text-xs">
													<a
														href={artist.external_urls.spotify}
														target="_blank"
														className={cn(
															buttonVariants({
																variant: 'ghost',
																size: 'xs'
															}),
															'p-0 text-xs border-none'
														)}
													>
														Open in spotify
														<ExternalLink />
													</a>
												</ItemDescription>
											</ItemContent>
											<ItemContent className="flex-none text-center">
												<ItemDescription className="text-xs">
													{artist.followers.total.toLocaleString('en-US')}{' '}
													followers
												</ItemDescription>
											</ItemContent>
										</a>
									}
								/>
							);
						})}
					</ItemGroup>
				</CardContent>
			</Card>
			<Card className="w-full">
				<CardHeader className="flex items-center justify-between">
					<CardTitle className="flex items-center font-medium gap-2 text-foreground">
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
				<CardContent>
					<ItemGroup>
						{data.topTracks.items.map((track) => {
							const artistNames = track.artists
								.map((artist) => artist.name)
								.join(', ');
							const image = getSmallestSpotifyImage(track.album.images);

							return (
								<Item
									key={track.id}
									variant="outline"
									role="listitem"
									render={
										<a href="/">
											{image && (
												<ItemMedia variant="image">
													<img
														src={image.url}
														alt={`${track.name} album art`}
														width={32}
														height={32}
														className="object-cover rounded-lg"
													/>
												</ItemMedia>
											)}
											<ItemContent className="pr-2.5">
												<ItemTitle className="line-clamp-1">
													{track.name}
												</ItemTitle>
												<ItemDescription className="line-clamp-1 text-xs">
													{artistNames}&nbsp;·&nbsp;{track.album.name}
												</ItemDescription>
											</ItemContent>
											<ItemContent>
												<ItemDescription>
													{millisToMinutesAndSeconds(track.duration_ms)}
												</ItemDescription>
											</ItemContent>
										</a>
									}
								/>
							);
						})}
					</ItemGroup>
				</CardContent>
			</Card>
		</div>
	);
}
