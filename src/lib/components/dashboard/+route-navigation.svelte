<script lang="ts">

    import RouteButton from "./+route-button.svelte";

</script>


<div class="stack" style="--direction: row; --justify: flex-start; --gap: 1em;" >
 
    <RouteButton route="/articles" emojis={["📰", "📄", "🖋️"]} text="Articles"  />
    <RouteButton route="/keywords" emojis={["🔑", "📊", "🏷️"]} text="Keywords"  />
    <RouteButton route="/images" emojis={["📸", "🌉", "📹"]} text="Images" />

    <!-- <RouteButton route="/protected/stream" emojis={["📡", "📺", "🎥"]} text="Stream"  underConstruction={true} /> -->
    <!-- <RouteButton route="/protected" emojis={["🤖", "🧠", "🔍", "🚧"]} text={"Coming Soon"} /> -->
   

  </div>