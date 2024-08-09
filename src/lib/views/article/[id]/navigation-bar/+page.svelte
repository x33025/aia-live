<script lang="ts">
 
  import TitleView from '../title/+page.svelte';
  import BackButton from './back/+page.svelte';
  import Options from './options/+page.svelte';
</script>


  <div class="nav-left">
    <BackButton />

  </div>
  <div  class="nav-center">
  
    <TitleView />

  </div>
  <div  class="nav-right">
    <Options />
  </div>


<style>
  .nav-left, .nav-right {
    display: flex;
    align-items: center;
    justify-items: center;
    flex: 1;
  }

  .nav-center {
    display: flex;
    justify-content: flex-start; /* Center align the children */
    width: 40%; /* Match the width of the center column */
  }


</style>
