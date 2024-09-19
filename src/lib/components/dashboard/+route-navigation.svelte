<script lang="ts">

    import RouteButton from "./+route-button.svelte";
    import Stack from "$lib/core/layout/+stack.svelte";
    import { Direction } from "$lib/types";
</script>


<Stack direction={Direction.Horizontal}  spacing={1} wrap={true} >
 
    <RouteButton route="/protected/articles" emojis={["📰", "📄", "🖋️"]} text="Articles" />
    <RouteButton route="/protected/keywords" emojis={["🔑", "📊", "🏷️"]} text="Keywords" />
    <RouteButton route="/protected/images" emojis={["📸", "🌉", "📹"]} text="Images" />
    <RouteButton route="/protected/stream" emojis={["📡", "📺", "🎥"]} text="Stream" />
    <RouteButton route="/protected" emojis={["🤖", "🧠", "🔍", "🚧"]} text={"Coming Soon"} />
   
  </Stack>