<script lang="ts">
    import { TimeFrame, Direction, TextType } from '$lib/types';
    import Stack from '$lib/core/layout/+stack.svelte';
    import ChevronUpDown from '$lib/core/ui/icons/+chevron-up-down.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
    import { createEventDispatcher } from 'svelte';
  
    let currentFrame: TimeFrame = TimeFrame.TODAY; // Initialize with a default value
  
    const dispatch = createEventDispatcher();
  
    // Define the type for the custom event
    type TimeFrameChangeEvent = CustomEvent<{ selectedOption: TimeFrame }>;
  
    function handleTimeFrameChange(event: TimeFrameChangeEvent) {
      const selectedOption: TimeFrame = event.detail.selectedOption; // Ensure you get the TimeFrame enum value
      currentFrame = selectedOption; // Update the current frame
    }
  
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleTimeFrameChange(event as unknown as TimeFrameChangeEvent); // Ensure it's cast to the correct event type
      }
    }
  </script>
  


    <div class="stack" style="--direction: row; --align: center;  --gap: 0.5em">
        <Text type={TextType.Subheadline}>
      Articles 
         </Text>
      <DropdownMenu id="time-frame-selector" selectedOption={currentFrame} on:optionSelected={handleTimeFrameChange}>
        <svelte:fragment slot="button">
            <Stack direction={Direction.Horizontal} wrap={true}>
          <Text style="color: var(--blue); font-weight: 600;">{currentFrame.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Text> <!-- Bind the current frame value -->
          <ChevronUpDown size={0.75} color="var(--blue)" strokeWidth={0.5} />
        </Stack>
        </svelte:fragment>

      <svelte:fragment >
        {#each Object.values(TimeFrame) as frame}
        <Text type={TextType.Body} style="padding: 0.4em;">{frame.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</Text>
        {/each}
    </svelte:fragment>


      </DropdownMenu>
    </div>
 
  
