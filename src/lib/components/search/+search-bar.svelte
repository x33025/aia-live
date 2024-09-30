<script lang="ts">
    import TextInput from '$lib/core/actions/+text-input.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { TextType } from '$lib/types';
    import { search } from '$lib/stores/ui/+search';
  
    export let placeholder: string = "Search...";
    export let fullWidth: boolean = true;
    export let value: string = "";
    export let type: TextType = TextType.Body; // Allow the type to be passed in
    export let onSearch: (value: string) => void;
  
    function handleSearchInput(event: CustomEvent<{ value: string }>) {
      value = event.detail.value;
      onSearch(value);
    }
  </script>
  
  <div style="background-color: white; padding: 0.55em 0.75em; border-radius: 0.5em; width: 100%;">
    <TextInput 
      value={value} 
      placeholder={placeholder} 
      fullWidth={fullWidth} 
      type={type} 
      on:input={handleSearchInput}
    
    />
  </div>
  