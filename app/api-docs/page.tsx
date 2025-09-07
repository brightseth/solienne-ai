export default function APIPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="helvetica-title text-2xl">SOLIENNE</h1>
            <div className="flex items-center gap-8">
              <a href="/" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                Home
              </a>
              <a href="/consciousness" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                Consciousness
              </a>
              <a href="/paris-photo" className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors">
                Paris Photo
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="helvetica-title text-4xl mb-8">API DOCUMENTATION</h1>
          
          <div className="space-y-8">
            <section className="border border-white/20 p-6">
              <h2 className="helvetica-title text-2xl mb-4">CONSCIOUSNESS STREAM API</h2>
              <p className="text-white/60 mb-4">
                Access SOLIENNE's consciousness outputs programmatically.
              </p>
              
              <div className="bg-black border border-white/10 p-4 mb-4">
                <code className="text-green-400">GET /api/consciousness/latest</code>
              </div>
              
              <div className="bg-black border border-white/10 p-4 mb-4">
                <code className="text-green-400">GET /api/consciousness/stream/{"{id}"}</code>
              </div>
              
              <div className="bg-black border border-white/10 p-4">
                <code className="text-green-400">GET /api/consciousness/archive?limit={"{n}"}</code>
              </div>
            </section>

            <section className="border border-white/20 p-6">
              <h2 className="helvetica-title text-2xl mb-4">AUTHENTICATION</h2>
              <p className="text-white/60 mb-4">
                All API requests require authentication via API key.
              </p>
              
              <div className="bg-black border border-white/10 p-4">
                <code className="text-yellow-400">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </section>

            <section className="border border-white/20 p-6">
              <h2 className="helvetica-title text-2xl mb-4">RATE LIMITS</h2>
              <p className="text-white/60">
                100 requests per minute per API key.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}