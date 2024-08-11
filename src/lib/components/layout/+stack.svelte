<script lang="ts">
    export let direction: Direction = Direction.Column;
    export let alignment: Alignment = Alignment.Start;
    export let spacing: string | number = 1;
    export let className: string = '';
    export let style: string = '';

    const getDirectionClass = (direction: Direction) => `direction-${direction}`;
    const getAlignmentClass = (alignment: Alignment) => `align-${alignment}`;
</script>

<style>
  .stack {
    display: flex;
    width: 100%;
    height: 100%;
    flex: 1;
  }
</style>

<div class={`${className} stack ${getDirectionClass(direction)} ${getAlignmentClass(alignment)}`} style={`gap: ${spacing}em; ${style}`}>
    <slot></slot>
</div>
