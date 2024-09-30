<script lang="ts">

    import Text from "$lib/core/display/+text.svelte";
    import { Direction, TextType, type News } from "$lib/types";


    export let news: News;
</script>


<div class="stack" style="border-radius: 0.8em; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1); border: 1px solid var(--gray-2); padding: 0.75em;" >
  
 
        <Text type={TextType.Headline}>{news.title}</Text>
        <Text type={TextType.Callout} style="color: var(--gray); font-weight: semibold;">{news.description}</Text>
    

</div>