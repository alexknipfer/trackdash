import { z } from 'zod';

export const spotifyTimeRangeSchema = z.enum([
	'long_term',
	'medium_term',
	'short_term'
]);
export const spotifyTimeRangeOptions = spotifyTimeRangeSchema.options;
export type SpotifyTimeRange = z.infer<typeof spotifyTimeRangeSchema>;

export const externalUrlsSchema = z.object({
	spotify: z.string()
});
export type ExternalUrls = z.infer<typeof externalUrlsSchema>;

export const followersSchema = z.object({
	href: z.null(),
	total: z.number()
});
export type Followers = z.infer<typeof followersSchema>;

export const spotifyImageSchema = z.object({
	height: z.number(),
	url: z.string(),
	width: z.number()
});
export type SpotifyImage = z.infer<typeof spotifyImageSchema>;

export const typeSchema = z.enum(['artist']);
export type Type = z.infer<typeof typeSchema>;

export const externalIDSSchema = z.object({
	isrc: z.string()
});
export type ExternalIDS = z.infer<typeof externalIDSSchema>;

export const spotifyCursorSchema = z.object({
	before: z.string(),
	after: z.string()
});
export type SpotifyCursor = z.infer<typeof spotifyCursorSchema>;

export const spotifyContextSchema = z.object({
	external_urls: externalUrlsSchema,
	href: z.string(),
	type: z.string(),
	uri: z.string()
});
export type SpotifyContext = z.infer<typeof spotifyContextSchema>;

export const spotifyTokenResponseSchema = z.object({
	access_token: z.string(),
	token_type: z.string(),
	expires_in: z.number(),
	refresh_token: z.string(),
	scope: z.string()
});
export type SpotifyTokenResponse = z.infer<typeof spotifyTokenResponseSchema>;

export function createSpotifyPaginatedResponseSchema<
	ItemType extends z.ZodTypeAny
>(itemSchema: ItemType) {
	return z.object({
		items: z.array(itemSchema),
		total: z.number(),
		limit: z.number(),
		offset: z.number(),
		previous: z.null(),
		href: z.string(),
		next: z.string().nullable()
	});
}
export type SpotifyPaginatedResponse<ItemType> = {
	items: ItemType[];
	total: number;
	limit: number;
	offset: number;
	previous: null;
	href: string;
	next: string | null;
};

export function createSpotifyCursorPaginatedResponseSchema<
	ItemType extends z.ZodTypeAny
>(itemSchema: ItemType) {
	return z.object({
		items: z.array(itemSchema),
		cursors: spotifyCursorSchema,
		href: z.string(),
		limit: z.number(),
		next: z.string(),
		total: z.number()
	});
}
export type SpotifyCursorPaginatedResponse<ItemType> = {
	items: ItemType[];
	cursors: SpotifyCursor;
	href: string;
	limit: number;
	next: string;
	total: number;
};

export const artistSchema = z.object({
	external_urls: externalUrlsSchema,
	href: z.string(),
	id: z.string(),
	name: z.string(),
	type: z.string(),
	uri: z.string()
});
export type Artist = z.infer<typeof artistSchema>;

export const spotifyArtistSchema = z.object({
	external_urls: externalUrlsSchema,
	followers: followersSchema,
	genres: z.array(z.string()),
	href: z.string(),
	id: z.string(),
	images: z.array(spotifyImageSchema),
	name: z.string(),
	popularity: z.number(),
	type: typeSchema,
	uri: z.string()
});
export type SpotifyArtist = z.infer<typeof spotifyArtistSchema>;

export const spotifyAlbumSchema = z.object({
	album_type: z.string(),
	artists: z.array(artistSchema),
	available_markets: z.array(z.string()),
	external_urls: externalUrlsSchema,
	href: z.string(),
	id: z.string(),
	images: z.array(spotifyImageSchema),
	name: z.string(),
	release_date: z.string(),
	release_date_precision: z.string(),
	total_tracks: z.number(),
	type: z.string(),
	uri: z.string()
});
export type SpotifyAlbum = z.infer<typeof spotifyAlbumSchema>;

export const spotifyTrackSchema = z.object({
	album: spotifyAlbumSchema,
	artists: z.array(artistSchema),
	available_markets: z.array(z.string()),
	disc_number: z.number(),
	duration_ms: z.number(),
	explicit: z.boolean(),
	external_ids: externalIDSSchema,
	external_urls: externalUrlsSchema,
	href: z.string(),
	id: z.string(),
	is_local: z.boolean(),
	name: z.string(),
	popularity: z.number(),
	preview_url: z.string(),
	track_number: z.number(),
	type: z.string(),
	uri: z.string()
});
export type SpotifyTrack = z.infer<typeof spotifyTrackSchema>;

export const spotifyProfileSchema = z.object({
	display_name: z.string(),
	email: z.string(),
	external_urls: externalUrlsSchema,
	followers: followersSchema,
	href: z.string(),
	id: z.string(),
	images: z.array(spotifyImageSchema),
	type: z.string(),
	uri: z.string()
});
export type SpotifyProfile = z.infer<typeof spotifyProfileSchema>;

export const spotifyRecentlyPlayedSchema = z.object({
	context: spotifyContextSchema,
	played_at: z.string(),
	track: spotifyTrackSchema
});
export type SpotifyRecentlyPlayed = z.infer<typeof spotifyRecentlyPlayedSchema>;

export const spotifyAudioFeaturesSchema = z
	.object({
		danceability: z.number(),
		energy: z.number(),
		key: z.number(),
		loudness: z.number(),
		mode: z.number(),
		speechiness: z.number(),
		acousticness: z.number(),
		instrumentalness: z.number(),
		liveness: z.number(),
		valence: z.number(),
		tempo: z.number(),
		type: z.string(),
		id: z.string(),
		uri: z.string(),
		track_href: z.string(),
		analysis_url: z.string(),
		duration_ms: z.number(),
		time_signature: z.number()
	})
	.catchall(z.union([z.number(), z.string()]));
export type SpotifyAudioFeatures = z.infer<typeof spotifyAudioFeaturesSchema>;

export const playlistTrackSchema = z.object({
	href: z.string(),
	total: z.number(),
	added_at: z.string(),
	added_by: spotifyProfileSchema,
	is_local: z.boolean(),
	track: spotifyTrackSchema
});
export type PlaylistTrack = z.infer<typeof playlistTrackSchema>;

export const spotifyPlaylistSchema = z.object({
	collaborative: z.boolean(),
	external_urls: externalUrlsSchema,
	id: z.string(),
	images: z.array(spotifyImageSchema),
	name: z.string(),
	public: z.string(),
	snapshot_id: z.string(),
	tracks: createSpotifyPaginatedResponseSchema(playlistTrackSchema),
	type: z.string(),
	uri: z.string(),
	description: z.string(),
	followers: followersSchema
});
export type SpotifyPlaylist = z.infer<typeof spotifyPlaylistSchema>;

export const disallowsSchema = z.object({
	resuming: z.boolean()
});
export type Disallows = z.infer<typeof disallowsSchema>;

export const actionsSchema = z.object({
	disallows: disallowsSchema
});
export type Actions = z.infer<typeof actionsSchema>;

export const spotifyNowPlayingResponseSchema = z.object({
	timestamp: z.number(),
	context: spotifyContextSchema,
	progress_ms: z.number(),
	item: spotifyTrackSchema,
	currently_playing_type: z.string(),
	actions: actionsSchema,
	is_playing: z.boolean()
});
export type SpotifyNowPlayingResponse = z.infer<
	typeof spotifyNowPlayingResponseSchema
>;
