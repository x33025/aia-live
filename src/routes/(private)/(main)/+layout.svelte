<script lang="ts">
  import { page } from '$app/stores';
  import MainPage from '$lib/core/layout/+main-page.svelte';
  import Users from '$lib/components/user/+users.svelte';
  import ProfileMenu from '$lib/components/user/+profile-menu.svelte';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';

  import SelectionTray from '$lib/components/interaction/+selection-tray.svelte';

</script>

<MainPage>
  <div class="stack" slot="navigation-leading" style="--gap: 1em;">
    {#if $page.url.pathname !== '/dashboard'}
      <div class="stack" style="margin-left: 0.75em;">
        <GoBackButton />
      </div>
    {/if}
    <PageTitle />
  </div>

  <div class="stack" slot="navigation-trailing">
    <SelectionTray />
    <Users />
    <ProfileMenu />
  </div>

  <!-- Render the main content -->
  <slot />
</MainPage>
