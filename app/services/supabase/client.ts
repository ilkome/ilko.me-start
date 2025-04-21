import { createBrowserClient } from '@supabase/ssr'
import process from 'node:process'

export function createClient() {
  return createBrowserClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  )
}
