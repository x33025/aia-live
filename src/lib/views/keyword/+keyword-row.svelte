<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
  import TextInput from '$lib/components/actions/+text-input.svelte';
  import { TextType, type Country, type Keyword } from '$lib/types';
  import { openSidebar } from '$lib/stores/ui/+sidebar';
  import NotesSidebar from '../notes/+notes-sidebar.svelte';
 
  export let keyword: Keyword;
  export let countries: Country[] = [];
  export let updateKeyword: (id: string, updatedFields: object) => void;
 
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

  function openNotesSidebar() {
    const notes = keyword.expand?.notes || []; // Fallback to an empty array if notes are undefined
    openSidebar(NotesSidebar, { notes });
  }

 </script>
 
 <tr>
   <td>
     <TextInput
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
   <td>
    <button on:click={openNotesSidebar}>Open Notes</button> <!-- "Open Notes" Button -->
  </td>
 </tr>
 
 <style>



   :global(.keyword-input) {
     background-color: var(--gray-1);
     border-radius: 0.5em;
     padding: var(--default-padding);
   }
   td {
     padding: 0.3em;
     text-align: left;
     border-bottom: 1px solid #ddd;
   }
   .menu-item {
    padding: var(--default-padding);
     cursor: pointer;
     border-radius: 0.3em;
   }
   .menu-item:hover {
     background-color: var(--gray-1);
   }
 </style>