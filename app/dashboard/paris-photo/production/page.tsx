'use client';

export default function ProductionPage() {
  const milestones = [
    { week: 1, task: 'Grand Palais booth specs confirmed', owner: 'You + Vlad', status: 'critical' },
    { week: 1, task: '5 canonical frames ordered', owner: 'You', status: 'critical' },
    { week: 1, task: 'Monday site walkthrough scheduled', owner: 'You', status: 'critical' },
    { week: 2, task: 'Sound designer contracted', owner: 'You', status: 'important' },
    { week: 3, task: 'Fabric/diffuser materials ordered', owner: 'Archie/Alex', status: 'important' },
    { week: 4, task: 'Training material grids created', owner: 'Christie', status: 'important' },
    { week: 5, task: 'Chamber tech tested + fallback ready', owner: 'Harry + Team', status: 'critical' },
    { week: 6, task: 'AV equipment installed & tested', owner: 'Archie/Alex/Harry', status: 'critical' },
    { week: 8, task: 'Site installation complete', owner: 'Full Team', status: 'critical' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="helvetica-title text-4xl mb-4">PRODUCTION TIMELINE</h1>
        <p className="text-white/60">60-day timeline and responsibilities</p>
      </div>

      {/* Budget Overview */}
      <div className="grid lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Total Budget</p>
          <p className="text-2xl font-bold">€33,000</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Allocated</p>
          <p className="text-2xl font-bold">€12,500</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Remaining</p>
          <p className="text-2xl font-bold">€20,500</p>
        </div>
        <div className="border border-white/20 p-4">
          <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Contingency</p>
          <p className="text-2xl font-bold">€3,300</p>
        </div>
      </div>

      {/* Milestones */}
      <div className="border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Key Milestones</h2>
        
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex-1">
                <p className="font-bold">{milestone.task}</p>
                <p className="text-sm text-white/60">Week {milestone.week} • {milestone.owner}</p>
              </div>
              <span className={`text-sm uppercase tracking-wider ${
                milestone.status === 'critical' ? 'text-red-400' : 
                milestone.status === 'important' ? 'text-yellow-400' : 
                'text-white/60'
              }`}>
                {milestone.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Contacts */}
      <div className="mt-8 border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Production Team</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <p className="font-bold">Archie & Alex</p>
            <p className="text-sm text-white/60">Builders & Production</p>
          </div>
          <div>
            <p className="font-bold">Harry</p>
            <p className="text-sm text-white/60">Technical Engineer</p>
          </div>
          <div>
            <p className="font-bold">Christie</p>
            <p className="text-sm text-white/60">Artist & Content</p>
          </div>
          <div>
            <p className="font-bold">Vlad & Fran</p>
            <p className="text-sm text-white/60">Grand Palais Liaison</p>
          </div>
        </div>
      </div>
    </div>
  );
}