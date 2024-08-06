<script lang="ts">
  import Group from './+group.svelte';

  export let className: string = '';
</script>

<Group className={`z-stack ${className}`}>
  <slot></slot>
</Group>
