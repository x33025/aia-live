<script lang="ts">

    import { type News } from "$lib/types";


    export let news: News;
</script>


<div class="stack" style="border-radius: 0.8em; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1); border: 1px solid var(--gray-2); padding: 0.75em;" >
  
 
        <p class="headline">{news.title}</p>
        <p class="callout" style="color: var(--gray); font-weight: semibold;">{news.description}</p>
    

</div>