<script lang="ts">
    export let size: number = 1;
    export let color: string = '#ffffff';
    export let opacity: number = 0.85;
    export let strokeColor: string = color;
    export let strokeWidth: number = 0.1;
</script>

<div class="icon-container" style="--icon-size: {size}em;">
    <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="{size}em" 
        height="{size}em" 
        viewBox="0 0 20.2832 19.9316"
    >
        <g>
            <rect 
                height="19.9316" 
                width="20.2832" 
                x="0" 
                y="0" 
                opacity="0" 
            />
            <path 
                d="M9.96094 19.9219C15.459 19.9219 19.9219 15.4492 19.9219 9.96094C19.9219 4.46289 15.459 0 9.96094 0C4.47266 0 0 4.46289 0 9.96094C0 15.4492 4.47266 19.9219 9.96094 19.9219Z" 
                fill="{color}" 
                fill-opacity="{opacity}" 
                stroke="{strokeColor}"
                stroke-width="{strokeWidth}"
            />
        </g>
    </svg>
</div>

<style>
    .icon-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        width: var(--icon-size, 1em);
        height: var(--icon-size, 1em);
    }
</style>
