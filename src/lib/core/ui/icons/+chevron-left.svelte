<script lang="ts">
    export let size: number = 1; // Size in em
    export let color: string = 'var(--gray-4)'; // Default color from your SVG
    export let opacity: number = 0.85; // Default opacity from your SVG
    export let strokeWidth: number = 0.1; // Default stroke width
    export let strokeColor: string = color; // Default stroke color
</script>

<div class="icon-container" style="--icon-size: {size}em;">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="18.3398" height="17.998"
      viewBox="0 0 18.3398 17.998"
    >
        <g>
            <rect height="17.998" opacity="0" width="18.3398" x="0" y="0"/>
            <path 
            d="M17.9785 3.04688L17.9785 14.9707C17.9785 16.9824 16.9629 17.998 14.9121 17.998L3.06641 17.998C1.02539 17.998 0 16.9922 0 14.9707L0 3.04688C0 1.02539 1.02539 0.0195312 3.06641 0.0195312L14.9121 0.0195312C16.9629 0.0195312 17.9785 1.03516 17.9785 3.04688ZM9.89258 4.20898L5.83008 8.04688C5.27344 8.55469 5.27344 9.45312 5.83008 9.96094L9.89258 13.7988C10.166 14.0527 10.6738 14.0723 10.9277 13.8281C11.2305 13.5254 11.2207 13.0566 10.9375 12.7832L6.92383 8.99414L10.9375 5.22461C11.2305 4.95117 11.2207 4.46289 10.918 4.17969C10.6445 3.91602 10.1953 3.92578 9.89258 4.20898Z"
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
        width: var(--icon-size);
        height: var(--icon-size);
    }
</style>
