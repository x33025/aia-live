<script lang="ts">
  import Navbar from '$lib/components/+navigation-bar.svelte';
  import TitleView from '../title/+page.svelte';
  import BackButton from './back/+page.svelte';
  import Options from './options/+page.svelte';
</script>

<Navbar>
  <div slot="left" class="nav-left">
    <BackButton />

  </div>
  <div slot="center" class="nav-center">
  
    <TitleView />

  </div>
  <div slot="right" class="nav-right">
    <Options />
  </div>
</Navbar>

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
