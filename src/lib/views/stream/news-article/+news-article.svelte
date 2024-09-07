<script lang="ts">

    import Stack from "$lib/components/layout/+stack.svelte";
    import type { News } from "$lib/types";


    export let news: News;
</script>


<Stack class="border-highlight" style="border-radius: 0.5em; box-shadow: 8px rgba(0, 0, 0, 0.1);">


    <div>
        <h3>{news.title}</h3>
        <p>{news.content}</p>
    </div>
    
</Stack>