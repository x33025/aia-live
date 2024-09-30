<div class="stack expand" style="background-color: var(--gray-1); --gap: 0.5em; padding: 1em;">
  {#if $$slots.header}
    <div class="stack" style="width: 100%;">
      <slot name="header" />
    </div>
  {/if}
  <div class="stack expand border-highlight" style="background-color: white; border-radius: 1em; padding: 1em; ">
    <slot name="content" />
  </div>
</div>