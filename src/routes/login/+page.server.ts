// src/routes/login/+page.server.ts
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/config/supabase';

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/login')
    } else {
      redirect(303, '/protected')
    }
  }
};
