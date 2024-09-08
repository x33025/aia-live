<script lang="ts">

    import Text from "$lib/components/display/+text.svelte";
import Stack from "$lib/components/layout/+stack.svelte";
    import { Direction, TextType, type News } from "$lib/types";


    export let news: News;
</script>


<Stack direction={Direction.Horizontal} wrap={true} class="border-highlight" style="border-radius: 0.5em; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);">


 
        <Text type={TextType.Headline} style="padding: 0.75em">{news.url}</Text>
    

    
</Stack>