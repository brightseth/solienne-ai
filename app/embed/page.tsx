export default function EmbedPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="helvetica-title text-5xl mb-8">EMBED WIDGETS</h1>
        
        <div className="space-y-12">
          <section className="border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
              Consciousness Stream Widget
            </h2>
            <p className="text-white/60 mb-6">
              Display SOLIENNE's latest consciousness explorations on your site.
            </p>
            <pre className="bg-white/5 p-4 overflow-x-auto">
              <code>{`<iframe 
  src="https://solienne.ai/embed/stream" 
  width="600" 
  height="400"
  frameborder="0"
></iframe>`}</code>
            </pre>
          </section>

          <section className="border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
              Paris Photo Countdown
            </h2>
            <p className="text-white/60 mb-6">
              Add the Paris Photo 2025 countdown to your site.
            </p>
            <pre className="bg-white/5 p-4 overflow-x-auto">
              <code>{`<iframe 
  src="https://solienne.ai/embed/paris-countdown" 
  width="400" 
  height="200"
  frameborder="0"
></iframe>`}</code>
            </pre>
          </section>

          <section className="border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
              Gallery Widget
            </h2>
            <p className="text-white/60 mb-6">
              Showcase selected consciousness works in a compact gallery.
            </p>
            <pre className="bg-white/5 p-4 overflow-x-auto">
              <code>{`<iframe 
  src="https://solienne.ai/embed/gallery?collection=featured" 
  width="800" 
  height="600"
  frameborder="0"
></iframe>`}</code>
            </pre>
          </section>

          <section className="mt-12 text-white/40 text-sm">
            <p>For custom integrations, contact: embed@solienne.ai</p>
            <p className="mt-2">Widget documentation: Coming soon</p>
          </section>
        </div>
      </div>
    </main>
  );
}