<script lang="ts">
    import { page } from '$app/stores';
    import type { User } from '@prisma/client';

    let user: User;

    $: {
        const pageData = $page.data as { user: User };
        user = pageData.user;
    }
</script>


<main>
    <h1>Welcome, {user.name}!</h1>
    <nav>
        <ul>
            <li><a href="/protected/keywords">Keywords</a></li>
            <li><a href="/protected/articles">Articles</a></li>
        </ul>
    </nav>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
    }

    nav ul {
        list-style: none;
        padding: 0;
    }

    nav ul li {
        margin: 10px 0;
    }

    nav ul li a {
        text-decoration: none;
        color: #0070f3;
        font-size: 1.2em;
    }

    nav ul li a:hover {
        text-decoration: underline;
    }
</style>
