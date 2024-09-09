<script lang="ts">

    import Text from "$lib/components/display/+text.svelte";
import Stack from "$lib/components/layout/+stack.svelte";
    import { Direction, TextType, type News } from "$lib/types";


    export let news: News;
</script>


<Stack direction={Direction.Horizontal} wrap={true} style="border-radius: 0.8em; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1); border: 1px solid var(--gray-2);">


 
        <Text type={TextType.Headline} style="padding: 0.75em">{news.title}</Text>
    

    
</Stack>