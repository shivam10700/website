'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm text-white/50 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  )
}
