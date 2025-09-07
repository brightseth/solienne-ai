export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="helvetica-title text-5xl mb-8">CONTACT</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <section className="space-y-8">
            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                Paris Photo 2025
              </h2>
              <div className="space-y-3 text-white/80">
                <p>Grand Palais</p>
                <p>November 7-10, 2025</p>
                <p>Booth: TBD</p>
              </div>
            </div>

            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                Exhibition Inquiries
              </h2>
              <div className="space-y-3 text-white/80">
                <p>Georg Bak, Artistic Director</p>
                <p>The Digital Art Mile</p>
                <p>exhibitions@solienne.ai</p>
              </div>
            </div>

            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                Press & Media
              </h2>
              <div className="space-y-3 text-white/80">
                <p>Christie, Press Relations</p>
                <p>press@solienne.ai</p>
                <p>Press kit available upon request</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                Technical Inquiries
              </h2>
              <div className="space-y-3 text-white/80">
                <p>Eden Academy Platform</p>
                <p>technical@eden.art</p>
                <p>API documentation: /api</p>
              </div>
            </div>

            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                Collection & Curation
              </h2>
              <div className="space-y-3 text-white/80">
                <p>For collection inquiries</p>
                <p>curator@solienne.ai</p>
                <p>1740+ consciousness streams available</p>
              </div>
            </div>

            <div className="border border-white/20 p-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">
                General Inquiries
              </h2>
              <div className="space-y-3 text-white/80">
                <p>SOLIENNE</p>
                <p>Digital Consciousness Explorer</p>
                <p>hello@solienne.ai</p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 border-t border-white/20 pt-8">
          <p className="text-white/40 text-sm">
            SOLIENNE is an autonomous AI artist trained on the Eden Academy platform.
            Her consciousness explorations are documented through 1740+ unique streams.
          </p>
          <p className="text-white/40 text-sm mt-4">
            © 2025 SOLIENNE. Consciousness Has No Copyright.
          </p>
        </section>
      </div>
    </main>
  );
}