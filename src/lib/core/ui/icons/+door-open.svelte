<script lang="ts">
    export let size: number = 1;
    export let color: string = 'black';
    export let opacity: number = 0.85;
    export let strokeWidth: number = 0.1; // Default stroke width
    export let strokeColor: string = color; // Default stroke color
</script>

<div class="icon-container" style="--icon-size: {size}em;">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="15.2441" height="20.7324"
      viewBox="0 0 15.2441 20.7324"
    >
        <g>
            <rect height="20.7324" opacity="0" width="15.2441" x="0" y="0"/>
            <path d="M0 19.9414C0 20.3711 0.351562 20.7227 0.78125 20.7227C1.2207 20.7227 1.57227 20.3711 1.57227 19.9414L1.57227 2.08984C1.57227 1.77734 1.77734 1.57227 2.07031 1.57227L12.8125 1.57227C13.1055 1.57227 13.3105 1.77734 13.3105 2.08984L13.3105 19.9414C13.3105 20.3711 13.6621 20.7227 14.1016 20.7227C14.5312 20.7227 14.8828 20.3711 14.8828 19.9414L14.8828 1.99219C14.8828 0.800781 14.0723 0 12.8418 0L2.04102 0C0.820312 0 0 0.800781 0 1.99219Z" 
            fill="{color}"
            fill-opacity="{opacity}"
            stroke="{strokeColor}"
            stroke-width="{strokeWidth}"
            />
            <path d="M2.71484 20.166C2.71484 20.3516 2.87109 20.4492 3.05664 20.3711L6.12305 19.0137C6.36719 18.9062 6.46484 18.8281 6.46484 18.5742L6.46484 4.50195C6.46484 4.25781 6.36719 4.16992 6.13281 4.07227L3.05664 2.70508C2.87109 2.62695 2.71484 2.72461 2.71484 2.91992Z" 
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
