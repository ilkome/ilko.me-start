export function Auth({
  actionText,
  afterSubmit,
  onSubmit,
  status,
}: {
  actionText: string
  afterSubmit?: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  status: 'pending' | 'idle' | 'success' | 'error'
}) {
  return (
    <div className="flex items-start justify-center p-8">
      <div className="p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{actionText}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-xs">
              Username
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="px-2 py-1 w-full rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="px-2 py-1 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded py-2 uppercase"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? '...' : actionText}
          </button>
          {afterSubmit || null}
        </form>
      </div>
    </div>
  )
}
