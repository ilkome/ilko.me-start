import { authQueryOptions } from '@/features/user/queries'
import { SignUpForm } from '@/features/user/SignUpForm'
// import { useMutation } from '@/hooks/useMutation'
import { getSupabaseServerClient } from '@/services/supabase/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'

const signupFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string, password: string }) => data)
  .handler(async ({ data }) => {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return {
        error: true,
        message: error.message,
      }
    }

    throw redirect({
      href: '/',
    })
  })

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const signupMutation = useMutation({
    mutationFn: useServerFn(signupFn),
    onSuccess: async () => {
      await queryClient.invalidateQueries(authQueryOptions())
      router.invalidate()
      console.log('signup success')
    },
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    signupMutation.mutate({
      data: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    })
  }

  const bottomSlot = signupMutation.data?.error && (
    <div className="text-red-600">{signupMutation.data.message}</div>
  )

  return (
    <div className="max-w-md mx-auto p-4">
      <SignUpForm
        bottomSlot={bottomSlot}
        isPending={signupMutation.status === 'pending'}
        onSubmit={onSubmit}
        title="Sign Up"
      />
    </div>
  )
}
