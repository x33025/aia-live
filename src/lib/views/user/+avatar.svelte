<script lang="ts">
    import ImageComponent from '$lib/components/display/+image.svelte';
    export let avatarUrl: string;
</script>

<div class="avatar-wrapper border-highlight">
    <ImageComponent image_url={avatarUrl} alt_text="User Avatar" width="2.25em" height="2.25em" style="border-radius: 50%;" />
</div>

<style>
  .avatar-wrapper {
    display: inline-block;
    width: 44px;
    height: 44px;
    padding: 2px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
