<script lang="ts">
    import Spacer from "$lib/components/layout/+spacer.svelte";

    // You can add any additional logic here if needed

    import Stack from "$lib/components/layout/+stack.svelte";
    import { Direction } from "$lib/types";
    import SearchBar from "$lib/views/search/+search-bar.svelte";

  </script>
  

    
    <!-- Stack component with some text inside -->
    <Stack direction={Direction.Horizontal}>
        <Spacer />
        <Stack direction={Direction.Vertical}>
            <SearchBar/>
        </Stack>
  
     <Spacer />
    </Stack>

  