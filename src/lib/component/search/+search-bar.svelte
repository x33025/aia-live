<script lang="ts">
    import TextInput from '$lib/components/actions/+text-input.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import { TextType } from '$lib/types';
  
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
  
  <Stack spacing={1} wrap={true}   style="background-color: white; padding: 0.55em 0.75em; border-radius: 0.5em;">
    <TextInput 
      value={value} 
      placeholder={placeholder} 
      fullWidth={fullWidth} 
      type={type} 
      on:input={handleSearchInput}
    
    />
  </Stack>
  