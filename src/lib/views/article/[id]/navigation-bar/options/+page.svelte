<!-- <script>
    import EllipsisCircle from '$lib/icons/+ellipsis-circle.svelte';

    let open = false;

    function toggleDropdown() {
        open = !open;
    }

    function closeDropdown() {
        open = false;
    }

    function clickOutside(node, callback) {
        const handleClick = (event) => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

<style>
    .dropdown {
        position: relative;
        display: inline-block;
        margin-left: auto;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        right: 0; /* Make the dropdown appear to the right */
        background-color: white;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 0.5em; /* Add rounded corners */
        padding: 0.5em;
    }
    .dropdown-content a {
        color: black;
        padding: 0.5em;
        text-decoration: none;
        display: block;
        border-radius: 0.25em; /* Add rounded corners to links */
    }
    .dropdown-content a:hover {
        background-color: var(--gray-1);
    }
    .dropdown-content.open {
        display: block;
    }

    button {
        background: none;
        border: none;
        margin: 1em;
        cursor: pointer;
    }
</style>

<div class="dropdown" use:clickOutside={closeDropdown}>
    <button on:click={toggleDropdown} aria-haspopup="true" aria-expanded={open}>
        <EllipsisCircle color="var(--gray-6)"/>
    </button>
    <div class:open={open} class="dropdown-content" role="menu">
        <a href="#" role="menuitem">Link 1</a>
        <a href="#" role="menuitem">Link 2</a>
        <a href="#" role="menuitem">Link 3</a>
    </div>
</div> -->
