import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  // Fetch user-specific data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      researchData: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Dashboard Nav */}
      <nav className="border-b border-white/10 bg-bg/50 backdrop-blur-xl">
        <div className="container-custom py-6 flex justify-between items-center">
          <div>
            <h1 className="font-display text-xl font-semibold">Research Dashboard</h1>
            <p className="text-sm text-white/50">Welcome back, {user.name || user.email}</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/50 capitalize">{user.role}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="container-custom py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="card">
            <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Active Projects</p>
            <p className="text-3xl font-display font-semibold text-accent">
              {user.researchData.filter(r => r.status === 'published').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Drafts</p>
            <p className="text-3xl font-display font-semibold">
              {user.researchData.filter(r => r.status === 'draft').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Total Files</p>
            <p className="text-3xl font-display font-semibold">24</p>
          </div>
          <div className="card">
            <p className="text-sm text-white/50 uppercase tracking-wider mb-2">Lab Access</p>
            <p className="text-3xl font-display font-semibold text-emerald-400">Active</p>
          </div>
        </div>

        {/* User's Research Data */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-display">Your Research</h2>
          <Link href="/dashboard/new" className="btn-primary text-sm">
            + New Project
          </Link>
        </div>

        <div className="space-y-4">
          {user.researchData.length === 0 ? (
            <div className="card text-center py-16">
              <p className="text-white/50 mb-4">No research projects yet</p>
              <Link href="/dashboard/new" className="text-accent hover:underline">
                Create your first project
              </Link>
            </div>
          ) : (
            user.researchData.map((project) => (
              <div key={project.id} className="card flex justify-between items-start group">
                <div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-3 line-clamp-2">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex gap-4 text-xs text-white/40">
                    <span className={`px-2 py-1 rounded ${
                      project.status === 'published' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-white/5 text-white/60'
                    }`}>
                      {project.status}
                    </span>
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link 
                  href={`/dashboard/project/${project.id}`}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  View →
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
