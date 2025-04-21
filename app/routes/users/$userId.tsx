import { Hello } from '@/routes/users/-/Hello'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

export const Route = createFileRoute('/users/$userId')({
  component: RouteComponent,
})

const myServerFn = createServerFn()
  .validator(z.object({
    userId: z.string(),
  }))
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 4000))
    return data
  })

function User() {
  const { data, isLoading } = useQuery({
    queryFn: () => myServerFn({
      data: {
        userId: '123',
      },
    }),
    queryKey: ['user'],
  })

  return <div>{isLoading ? 'Loading...' : data?.userId}</div>
}

function RouteComponent() {
  const { userId } = Route.useParams()
  return (
    <>
      <Hello />
      <div>
        Hello "/users/
        {userId}
        "!

        <User />
      </div>
    </>
  )
}
