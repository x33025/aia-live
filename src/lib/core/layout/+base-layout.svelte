<div class="stack expand" style="background-color: var(--gray-1); padding: 1em;">
  {#if $$slots.header}
    <div class="stack" style="padding: 1em; width: 100%;">
      <slot name="header" />
    </div>
  {/if}

  <div class="stack expand border-highlight" style="padding: 1em; background-color: white; border-radius: 1em;">
    <slot name="content" />
  </div>
</div>
