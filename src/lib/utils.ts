import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SpotifyImage } from '#/types/spotify';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getSmallestSpotifyImage(images: Array<SpotifyImage>) {
	return images.length
		? images.reduce((prev, curr) => (prev.height < curr.height ? prev : curr))
		: null;
}

export const millisToMinutesAndSeconds = (millis: number) => {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);

	return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};
