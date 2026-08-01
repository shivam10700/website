import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <main className="min-h-screen bg-bg text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full py-8 bg-bg/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="container-custom flex justify-between items-center">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            Research Portal
          </Link>
          <div className="flex items-center gap-8">
            <Link href="#about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
            <Link href="#research" className="text-sm text-white/60 hover:text-white transition-colors">Research</Link>
            {session ? (
              <Link href="/dashboard" className="btn-primary text-sm">Dashboard</Link>
            ) : (
              <Link href="/login" className="btn-secondary text-sm">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-32 pb-20">
        <div className="container-custom">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-6">
            Nanorobotics Research
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-light leading-tight mb-8">
            Advancing the frontier of <br />
            <span className="text-white/40">micro-scale robotics</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
            Bridging microelectronics and biological systems through autonomous nanorobotic systems. 
            Focused on targeted drug delivery and precision medical interventions.
          </p>
          <div className="flex gap-4">
            <Link href="/login" className="btn-primary">
              Access Research Portal
            </Link>
            <Link href="#contact" className="btn-secondary">
              Contact Lab
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of your portfolio sections... */}
      <section id="about" className="py-32 border-t border-white/5">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display mb-8">About</h2>
              <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                <p>
                  PhD candidate at <strong className="text-white">IIT Delhi</strong> specializing in Nanorobotics. 
                  Research investigates the design, control, and fabrication of nanoscale robotic systems.
                </p>
                <p>
                  Academic foundation combines B.Tech from JKIAPT with M.Tech in Microelectronics from IIIT Allahabad.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-white/5 rounded-lg border border-white/10" />
          </div>
        </div>
      </section>
    </main>
  )
}
