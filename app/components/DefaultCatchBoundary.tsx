import type { ErrorComponentProps } from '@tanstack/react-router'

import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    select: state => state.id === rootRouteId,
    strict: false,
  })

  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="">
      <ErrorComponent error={error} />
      <div className="">
        <button
          onClick={() => {
            router.invalidate()
          }}
          className=""
        >
          Try Again
        </button>
        {isRoot
          ? (
              <Link
                to="/"
                className=""
              >
                Home
              </Link>
            )
          : (
              <Link
                to="/"
                className=""
                onClick={(e) => {
                  e.preventDefault()
                  window.history.back()
                }}
              >
                Go Back
              </Link>
            )}
      </div>
    </div>
  )
}
