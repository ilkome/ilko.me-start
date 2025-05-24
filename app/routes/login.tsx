import { authQueryOptions } from '@/features/user/queries'
import { SignUpForm } from '@/features/user/SignUpForm'
// import { getUser } from '@/features/user/utils'
// import { useMutation } from '@/hooks/useMutation'
import { getSupabaseServerClient } from '@/services/supabase/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'

const loginFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string, password: string }) => data)
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast('Login failed:')
      return {
        error: true,
        message: error.message,
      }
    }

    // toast('Login success 2')
    throw redirect({
      href: '/',
    })
  })

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        href: '/',
      })
    }
  },
  component: LoginComp,
})

function LoginComp() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: useServerFn(loginFn),
    mutationKey: ['auth'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(authQueryOptions())
      router.invalidate()
      console.log('login success')
      toast('Login success 1')
    },
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    loginMutation.mutate({
      data: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    })
  }

  const bottomSlot = loginMutation.data?.error && (
    <div className="text-red-600">{loginMutation.data.message}</div>
  )

  return (
    <div className="max-w-md mx-auto p-4">
      <SignUpForm
        bottomSlot={bottomSlot}
        isPending={loginMutation.status === 'pending'}
        onSubmit={onSubmit}
        title="Login"
      />
    </div>
  )
}
