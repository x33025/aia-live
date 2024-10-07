<div class="stack expand" style="background-color: var(--gray-1); --gap: 0.5em; padding: 1em; height: 100vh;">
  {#if $$slots.header}
    <div class="stack" style="width: 100%;">
      <slot name="header" />
    </div>
  {/if}
  <div class="stack expand border-highlight" style=" --align: center; --justify: center; background-color: white; border-radius: 1em; flex-grow: 1; overflow: auto;">
    <slot name="content" />
  </div>
</div>