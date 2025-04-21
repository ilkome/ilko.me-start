import { getSupabaseServerClient } from '@/services/supabase/utils'
import { createServerFn } from '@tanstack/react-start'

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = await getSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return {
      isAuth: false,
    }
  }

  return {
    isAuth: true,
    user: {
      email: data.user.email,
    },
  }
})
