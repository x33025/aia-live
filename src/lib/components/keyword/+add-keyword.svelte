<script lang="ts">
    import type { Keyword, Country } from '$lib/types';

    import { current_user } from '$lib/stores/data/+users';
    import CountryDropdown from '$lib/components/actions/+country-dropdown.svelte';
    import UploadKeywords from './+upload-keywords.svelte';
    import { countries } from '$lib/stores/data/+countries';


    let newKeyword: Partial<Keyword> = {
        keyword: '',
        evergreen: false,
        country: '',
        volume: null,
        density: null
    };


    async function createKeyword() {

    try {
      const response = await fetch("/api/data/create/keyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: $current_user.id, data: newKeyword }),
      });

      if (response.ok) {
        newKeyword = {
            keyword: '',
            evergreen: false,
            country: '',
            volume: null,
            density: null
        };
      }

   

      // const newArticle = await response.json();
      // console.log(newArticle);
      // articles.update((articles) => [...articles, newArticle]);
    } catch (error) {
      console.error(error);
    }
  }


  function handleCountrySelected(country: Country) {
    newKeyword.country = country.id;
  }
</script>

<div class="stack" style="--direction: row; --align: center;  padding: 1em; padding-left: 2em; width: 100%; ">
    <!-- Text input for keyword -->
    <input 
        type="text" 
        placeholder="Add a Keyword" 
        bind:value={newKeyword.keyword} 
    />

    <!-- Checkbox for evergreen -->
    <input 
        type="checkbox" 
        bind:checked={newKeyword.evergreen} 
    />

    <CountryDropdown
    selectedCountry={$countries.filter(c => c.id === newKeyword.country)[0]}
    on:countrySelected={(e) => handleCountrySelected(e.detail.country)}
    />
    <!-- Numeric input for volume -->
    <input 
    type="number"
    bind:value={newKeyword.volume}
    
    />

    <!-- Numeric input for density -->
    <input 
    type="number"
    bind:value={newKeyword.density}
    />
    <div class="spacer"  />

    <!-- Button to add the keyword -->
    <button class="add-keyword-button" on:click={createKeyword}>Add Keyword</button>
    <UploadKeywords />
</div>

<style>
    .add-keyword-button {
        background-color: var(--blue);
        color: white;
        border: none;
        padding: 0.5em 1em;
        cursor: pointer;
        border-radius: 0.5em;
    }
</style>
