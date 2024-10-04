import { writable, derived } from 'svelte/store';
import type { Article } from '$lib/types'; // Adjust the type path as necessary

// Writable store for articles
export const articles = writable<Article[]>([]);

// Writable store for article
export const article = writable<Article>();

// Derived store for sorted articles by created date
export const sortedArticles = derived(articles, $articles => {
    return $articles.slice().sort((a, b) => {
        // Assuming 'created' is a Date object or a timestamp
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
});
