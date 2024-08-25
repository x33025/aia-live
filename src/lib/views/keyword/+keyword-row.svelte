<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import { TextType, type Country, type Keyword } from '$lib/types';
 
  export let keyword: Keyword;
  export let countries: Country[] = [];
  export let updateKeyword: (id: string, updatedFields: object) => void;
  export let className: string = '';
 
  $: selectedCountry = keyword.country ? countries.find(c => c.id === keyword.country) : null;
 
  function selectCountry(country: Country) {
    updateKeyword(keyword.id, { country: country.id });
  }
 
  function handleKeywordEnter(event: CustomEvent) {
    const newValue = event.detail.value;
    updateKeyword(keyword.id, { keyword: newValue });
  }
 
  function handleVolumeChange(event: CustomEvent) {
    const newVolume = event.detail.value;
    updateKeyword(keyword.id, { volume: newVolume });
  }
 
  function handleDensityChange(event: CustomEvent) {
    const newDensity = event.detail.value;
    updateKeyword(keyword.id, { density: newDensity });
  }
 
  function handleEvergreenToggle() {
    const newEvergreenState = !keyword.evergreen;
    updateKeyword(keyword.id, { evergreen: newEvergreenState });
  }
 </script>
 
 <tr>
   <td>
     <Input
       value={keyword.keyword}
       placeholder="Enter keyword"
       on:enter={handleKeywordEnter}
     />
   </td>
   <td>
     <input
       type="checkbox"
       checked={keyword.evergreen}
       on:change={handleEvergreenToggle}
     />
   </td>
   <td>
     <DropdownMenu 
       id={`country-dropdown-${keyword.id}`}
       selectedOption={selectedCountry?.id}
     >
       <span class="label" slot="button">
         {selectedCountry ? selectedCountry.name : 'Select a country'}
       </span>
       <svelte:fragment slot="default" let:selectOption>
         {#each countries as country}
           <p class="menu-item" on:click={() => { selectOption(country.id); selectCountry(country); }}>
             {country.name}
           </p>
         {/each}
       </svelte:fragment>
     </DropdownMenu>
   </td>
   <td>
     <NumericInput
       value={keyword.volume}
       on:update={handleVolumeChange}
     />
   </td>
   <td>
     <NumericInput
       value={keyword.density}
       on:update={handleDensityChange}
     />
   </td>
 </tr>
 
 <style>



   :global(.keyword-input) {
     background-color: var(--gray-1);
     border-radius: 0.5em;
     padding: 0.5em;
   }
   td {
     padding: 0.3em;
     text-align: left;
     border-bottom: 1px solid #ddd;
   }
   .menu-item {
     padding: 0.5em;
     cursor: pointer;
     border-radius: 0.3em;
   }
   .menu-item:hover {
     background-color: var(--gray-1);
   }
 </style>