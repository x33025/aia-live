import { dev } from '$app/environment';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { pb } from '$lib/config/pocketbase'; // Import the PocketBase client
import type { LayoutLoad } from './$types';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

