<script lang="ts">
    // You can import the path like this if it's in the `/static/` folder
    export let svgPath: string;
    export let alt: string;
  </script>
  
  <img src={svgPath} alt={alt} />
  