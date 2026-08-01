import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  const project = await prisma.researchData.findFirst({
    where: {
      id: params.id,
      user: {
        email: session.user.email
      }
    }
  })

  if (!project) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="container-custom py-12">
        <Link href="/dashboard" className="text-white/50 hover:text-white mb-8 inline-block">
          ← Back to Dashboard
        </Link>
        
        <div className="card max-w-4xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-display font-medium mb-2">{project.title}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                project.status === 'published' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-white/5 text-white/60 border border-white/10'
              }`}>
                {project.status}
              </span>
            </div>
          </div>
          
          <p className="text-white/70 leading-relaxed mb-8">
            {project.description || 'No description available.'}
          </p>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
              Project Files
            </h3>
            {project.files.length === 0 ? (
              <p className="text-white/40 text-sm">No files uploaded yet</p>
            ) : (
              <div className="space-y-2">
                {project.files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-white/70 hover:text-white cursor-pointer">
                    <span>📄</span>
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
