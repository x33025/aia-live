<script lang="ts">
    import type { Note } from '$lib/types';
    import Avatar from '$lib/components/user/+avatar.svelte';


    export let note: Note;

      // Function to sanitize HTML and extract text content
  function sanitizeHTML(html: string): string {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || '';
    }
    return '';
  }
</script>

<div class="stack note-chip caption" style="--direction: row; --align: center;">
    {#if note.expand?.activity?.created_by}
      <Avatar size={1.5} userId={note.expand?.activity?.created_by} />
    {/if}
    <div class="note-content ">
      {sanitizeHTML(note.content)}
    </div>
</div>

<style>
  .note-chip {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.3em;
    padding-right: 0.5em;

    
  }

  .note-content {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-weight: bold;
  }
</style>
