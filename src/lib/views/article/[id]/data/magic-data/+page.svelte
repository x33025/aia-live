<script>
    import { onDestroy, onMount } from 'svelte';
    import { magicDataStore } from '$lib/stores/+magic-data';
    import { searchMagicDataPromise } from '$lib/api/+promises';
    import { searchMagicData } from '$lib/api/gpt/+magic-data';
    import Spinner from '$lib/components/+spinner.svelte';
    import DataPointView from '../data-point/+page.svelte';
    import { v4 as uuidv4 } from 'uuid';
    import MagnifyingGlass from '$lib/icons/+magnifying-glass.svelte';
    import { writable } from 'svelte/store';

    let searchTerm = '';
    let currentSearchId = '';
    let currentSearchData = null;
    let searchMessage = '';
    let unsubscribe;

    async function fetchMagicData() {
        const searchQuery = searchTerm.trim();
        if (!searchQuery) {
            alert('Please enter a search term.');
            return;
        }

        const newPromise = (async () => {
            try {
                const { extractedData, additionalText } = await searchMagicData(searchQuery);
                const newSearch = {
                    id: uuidv4(),
                    query: searchQuery,
                    data: extractedData,
                    message: additionalText // Store the additional text without JSON data
                };
                searchMessage = additionalText; // Store the additional text for display
                currentSearchId = newSearch.id;
                magicDataStore.update(existing => [newSearch, ...existing]);
            } catch (error) {
                console.error('Error fetching magic data:', error);
                throw error;
            }
        })();

        searchMagicDataPromise.set(newPromise);

        try {
            await newPromise;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function setCurrentSearch(id) {
        currentSearchId = id;
    }

    onMount(() => {
        unsubscribe = magicDataStore.subscribe(value => {
            const currentSearch = value.find(search => search.id === currentSearchId);
            currentSearchData = currentSearch ? currentSearch.data : null;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
        currentSearchId = '';
    });
</script>

<div class="vstack">
    <div class="hstack">
        <input type="text" bind:value={searchTerm} placeholder="Search magic data..." />
        <button on:click={fetchMagicData}>
            <MagnifyingGlass />
        </button>
    </div>
    <Spinner promise={$searchMagicDataPromise} awaitText="Searching Magic Data...">
        <div slot="then">
            {#if currentSearchData}
                {#each Object.entries(currentSearchData) as [key, value]}
                    <DataPointView {key} {value} />
                {/each}
            {:else}
                <p>Please enter related <b>keywords</b>, <b>topics</b> or <b>categories</b> to look for data.</p>
            {/if}
            {#if searchMessage}
                <hr />
                <p class="message">{searchMessage}</p>
            {/if}
        </div>
        <p slot="catch" let:error style="color: red">
            Failed to fetch magic data: {error.message}
        </p>
    </Spinner>
</div>

<style>
    .vstack {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;
    }

    .hstack {
        display: flex;
        gap: 0.5em;
        align-items: center;
        width: 100%;
    }

    input {
        flex: 1;
        padding: 0.5em;
        border: none;
        border-radius: 0.5em;
        background-color: var(--gray-1);
        font-size: 1em;
        color: black;
    }

    input:focus {
        outline: none;
    }

    button {
        flex: 0 0 3em; /* Set the button to a fixed width and height */
        height: 3em; /* Match the height of the input field */
        border: none;
        background-color: var(--blue);
        color: white;
        cursor: pointer;
        border-radius: 0.75em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        color: var(--gray-6);
    }

    hr {
        margin: 1em 0;
    }

    .message {
        color: var(--gray-6);
    }
</style>
