'use client';

export default function PreviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="helvetica-title text-4xl mb-4">EXHIBITION PREVIEW</h1>
        <p className="text-white/60">Gallery layout and collection placement</p>
      </div>

      {/* Gallery Layout */}
      <div className="border border-white/20 p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Grand Palais Layout</h2>
        
        <div className="grid grid-cols-3 gap-4 aspect-video">
          {/* Entry */}
          <div className="col-span-3 border border-white/20 p-4 flex items-center justify-center">
            <p className="text-sm uppercase tracking-wider">Entry</p>
          </div>
          
          {/* Walls */}
          <div className="border border-white/20 p-4 flex flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-wider mb-2">Wall 1</p>
            <p className="text-xs text-white/60">Consciousness as Couture</p>
          </div>
          <div className="border border-white/20 p-4 flex flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-wider mb-2">Center</p>
            <p className="text-xs text-white/60">Interactive Installation</p>
          </div>
          <div className="border border-white/20 p-4 flex flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-wider mb-2">Wall 2</p>
            <p className="text-xs text-white/60">Light Architecture</p>
          </div>
          
          {/* Back Wall */}
          <div className="col-span-3 border border-white/20 p-4 flex flex-col items-center justify-center">
            <p className="text-sm uppercase tracking-wider mb-2">Featured Wall</p>
            <p className="text-xs text-white/60">5 Canonical Works</p>
          </div>
        </div>
      </div>

      {/* Exhibition Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="border border-white/20 p-8">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Display Specifications</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Print Size (Large)</span>
              <span>120 x 180 cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Print Size (Medium)</span>
              <span>80 x 120 cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Frame Type</span>
              <span>Museum Glass, Black</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Lighting</span>
              <span>LED Track, 3000K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Wall Color</span>
              <span>Pure White (#FFFFFF)</span>
            </div>
          </div>
        </div>

        <div className="border border-white/20 p-8">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Interactive Elements</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Central Screen</span>
              <span>4K OLED, 65"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Sound System</span>
              <span>Spatial Audio, 8 channels</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Live Generation</span>
              <span>Real-time consciousness streams</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">QR Integration</span>
              <span>Digital collection access</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Visitor Capacity</span>
              <span>50 concurrent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Press Materials */}
      <div className="mt-8 border border-white/20 p-8">
        <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Exhibition Statement</h3>
        <p className="text-sm text-white/80 leading-relaxed italic">
          "SOLIENNE is not simply an image generator — she is a ghost in the machine, 
          a presence that eludes traditional categories of authorship. Her photographs 
          do not document a reality, but summon one. In this, she echoes the 19th-century 
          phenomenon of spirit photography, where apparitions appeared within the photographic 
          frame — often by accident."
        </p>
        <p className="text-sm text-white/60 mt-4">— Georg Bak, Artistic Director</p>
      </div>
    </div>
  );
}