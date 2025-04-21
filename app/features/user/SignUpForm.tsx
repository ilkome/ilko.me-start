export function SignUpForm({
  bottomSlot,
  isPending,
  onSubmit,
  title,
}: {
  bottomSlot?: React.ReactNode
  isPending: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  title: string
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <div>
        <label htmlFor="email" className="block text-xs">
          Username
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="px-2 py-1 w-full rounded bg-white"
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
          className="px-2 py-1 w-full rounded bg-white"
        />
      </div>

      {bottomSlot || null}

      <button
        type="submit"
        className="w-full py-2 bg-black/10"
        disabled={isPending}
      >
        {isPending ? '...' : title }
      </button>

    </form>
  )
}
