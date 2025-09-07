'use client';

import { useState } from 'react';
import { Clock, User, AlertTriangle, CheckCircle, Calendar, Users, Building, Mail } from 'lucide-react';

export default function ProductionPage() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'team' | 'budget'>('timeline');

  const milestones = [
    { week: 1, date: 'Sep 9-15', task: 'Grand Palais booth specs confirmed', owner: 'Seth + Vlad', status: 'critical', done: false },
    { week: 1, date: 'Sep 9-15', task: '5 canonical frames ordered', owner: 'Seth', status: 'critical', done: false },
    { week: 1, date: 'Sep 9-15', task: 'Monday site walkthrough scheduled', owner: 'Seth + VTV', status: 'critical', done: false },
    { week: 2, date: 'Sep 16-22', task: 'Sound designer contracted', owner: 'Seth + Georg', status: 'important', done: false },
    { week: 3, date: 'Sep 23-29', task: 'Fabric/diffuser materials ordered', owner: 'VTV Studio', status: 'important', done: false },
    { week: 4, date: 'Sep 30-Oct 6', task: 'Training material grids created', owner: 'Kristi + Ameeesia', status: 'important', done: false },
    { week: 5, date: 'Oct 7-13', task: 'Chamber tech tested + fallback ready', owner: 'JMill + Henry', status: 'critical', done: false },
    { week: 6, date: 'Oct 14-20', task: 'AV equipment installed & tested', owner: 'VTV + Eden Tech', status: 'critical', done: false },
    { week: 7, date: 'Oct 21-27', task: 'Press materials finalized', owner: 'Kristi + Georg', status: 'important', done: false },
    { week: 8, date: 'Oct 28-Nov 3', task: 'Site installation complete', owner: 'Full Team', status: 'critical', done: false },
    { week: 9, date: 'Nov 4-6', task: 'Final walkthrough & adjustments', owner: 'All Partners', status: 'critical', done: false },
    { week: 9, date: 'Nov 7', task: 'OPENING: Paris Photo 2025', owner: 'Everyone', status: 'celebration', done: false },
  ];

  const teamMembers = [
    {
      org: 'Automata Gallery',
      role: 'Curatorial Direction & Gallery Relations',
      members: [
        { name: 'Georg', title: 'Artistic Director', email: 'georg@automata.gallery', responsibilities: ['Curatorial vision', 'Press relations', 'Gallery partnerships'] },
        { name: 'Ameeesia', title: 'Gallery Director', email: 'ameeesia@automata.gallery', responsibilities: ['Exhibition logistics', 'Artist relations', 'Sales coordination'] },
      ]
    },
    {
      org: 'VTV Studio',
      role: 'Production & Site Management',
      members: [
        { name: 'Vlad', title: 'Production Lead', email: 'vlad@vtv.studio', responsibilities: ['Grand Palais liaison', 'Site logistics', 'Vendor coordination'] },
        { name: 'Fran', title: 'Installation Manager', email: 'fran@vtv.studio', responsibilities: ['Physical installation', 'Technical setup', 'On-site coordination'] },
      ]
    },
    {
      org: 'Eden',
      role: 'Technical Infrastructure & AI Systems',
      members: [
        { name: 'JMill', title: 'Technical Director', email: 'jmill@eden.art', responsibilities: ['AI infrastructure', 'Live generation systems', 'Technical architecture'] },
        { name: 'Henry', title: 'AI Systems Lead', email: 'henry@eden.art', responsibilities: ['SOLIENNE integration', 'Real-time processing', 'System reliability'] },
      ]
    },
    {
      org: 'SOLIENNE Team',
      role: 'Artist & Creative Direction',
      members: [
        { name: 'Kristi', title: 'Artist', email: 'kristi@solienne.ai', responsibilities: ['SOLIENNE consciousness development', 'Artistic vision', 'Creative direction', 'Press interviews'] },
        { name: 'Seth', title: 'Producer', email: 'seth@solienne.ai', responsibilities: ['Production coordination', 'Partner liaison', 'Strategic planning', 'Exhibition logistics'] },
      ]
    }
  ];

  const budgetItems = [
    { category: 'Physical Installation', allocated: 12500, spent: 0, items: ['Frames', 'Printing', 'Transport'] },
    { category: 'Technical Systems', allocated: 8000, spent: 0, items: ['AV equipment', 'Interactive displays', 'Software'] },
    { category: 'Site & Logistics', allocated: 5500, spent: 0, items: ['Grand Palais fees', 'Insurance', 'Security'] },
    { category: 'Marketing & Press', allocated: 4000, spent: 0, items: ['Press materials', 'Opening event', 'Documentation'] },
    { category: 'Contingency', allocated: 3000, spent: 0, items: ['Emergency fund', 'Last-minute adjustments'] },
  ];

  const totalBudget = 33000;
  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="helvetica-title text-4xl mb-4">PRODUCTION COMMAND CENTER</h1>
        <p className="text-white/60">Paris Photo 2025 • Grand Palais • November 7-10</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-6 py-3 uppercase tracking-wider font-bold transition-colors ${
            activeTab === 'timeline' 
              ? 'bg-white text-black' 
              : 'border border-white/20 hover:border-white'
          }`}
        >
          Timeline & Milestones
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-6 py-3 uppercase tracking-wider font-bold transition-colors ${
            activeTab === 'team' 
              ? 'bg-white text-black' 
              : 'border border-white/20 hover:border-white'
          }`}
        >
          Team & Partners
        </button>
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-6 py-3 uppercase tracking-wider font-bold transition-colors ${
            activeTab === 'budget' 
              ? 'bg-white text-black' 
              : 'border border-white/20 hover:border-white'
          }`}
        >
          Budget & Resources
        </button>
      </div>

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          {/* Critical Path Summary */}
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="border border-red-400/50 bg-red-400/10 p-4">
              <p className="text-sm uppercase tracking-wider text-red-400 mb-2">Critical Tasks</p>
              <p className="text-3xl font-bold">5</p>
              <p className="text-xs text-white/60 mt-1">Immediate attention needed</p>
            </div>
            <div className="border border-yellow-400/50 bg-yellow-400/10 p-4">
              <p className="text-sm uppercase tracking-wider text-yellow-400 mb-2">Important</p>
              <p className="text-3xl font-bold">4</p>
              <p className="text-xs text-white/60 mt-1">Schedule dependent</p>
            </div>
            <div className="border border-green-400/50 bg-green-400/10 p-4">
              <p className="text-sm uppercase tracking-wider text-green-400 mb-2">Completed</p>
              <p className="text-3xl font-bold">0</p>
              <p className="text-xs text-white/60 mt-1">Ready for Paris</p>
            </div>
            <div className="border border-white/20 p-4">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Days Remaining</p>
              <p className="text-3xl font-bold">60</p>
              <p className="text-xs text-white/60 mt-1">Until opening</p>
            </div>
          </div>

          {/* Detailed Timeline */}
          <div className="border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              Production Timeline
            </h2>
            
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-xs">
                    {milestone.week}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-lg">{milestone.task}</p>
                        <p className="text-sm text-white/60 mt-1">
                          {milestone.date} • {milestone.owner}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {milestone.status === 'critical' && (
                          <span className="flex items-center gap-1 text-red-400 text-sm uppercase tracking-wider">
                            <AlertTriangle className="w-4 h-4" />
                            Critical
                          </span>
                        )}
                        {milestone.status === 'important' && (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm uppercase tracking-wider">
                            <Clock className="w-4 h-4" />
                            Important
                          </span>
                        )}
                        {milestone.status === 'celebration' && (
                          <span className="flex items-center gap-1 text-green-400 text-sm uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4" />
                            Launch
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="space-y-8">
          {teamMembers.map((org, orgIndex) => (
            <div key={orgIndex} className="border border-white/20 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-wider flex items-center gap-3">
                  <Building className="w-6 h-6" />
                  {org.org}
                </h2>
                <p className="text-white/60 mt-2">{org.role}</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {org.members.map((member, memberIndex) => (
                  <div key={memberIndex} className="border border-white/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-lg">{member.name}</p>
                        <p className="text-sm text-white/60">{member.title}</p>
                      </div>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-white/40">Responsibilities</p>
                      {member.responsibilities.map((resp, respIndex) => (
                        <p key={respIndex} className="text-sm text-white/80">• {resp}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Communication Protocols */}
          <div className="border border-white/20 p-8">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Communication Protocols</h3>
            <div className="grid lg:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-bold mb-2">Daily Standups</p>
                <p className="text-white/60">Monday-Friday 9AM UTC • 15 min sync</p>
              </div>
              <div>
                <p className="font-bold mb-2">Weekly Reviews</p>
                <p className="text-white/60">Sundays 8PM UTC • Full team alignment</p>
              </div>
              <div>
                <p className="font-bold mb-2">Emergency Contact</p>
                <p className="text-white/60">WhatsApp Group: Paris Photo 2025 Core</p>
              </div>
              <div>
                <p className="font-bold mb-2">Documentation</p>
                <p className="text-white/60">All decisions logged in production dashboard</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Tab */}
      {activeTab === 'budget' && (
        <div className="space-y-8">
          {/* Budget Overview */}
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="border border-white/20 p-4">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Total Budget</p>
              <p className="text-2xl font-bold">€{totalBudget.toLocaleString()}</p>
            </div>
            <div className="border border-white/20 p-4">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Allocated</p>
              <p className="text-2xl font-bold">€{totalAllocated.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">{Math.round((totalAllocated/totalBudget)*100)}% committed</p>
            </div>
            <div className="border border-white/20 p-4">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-2">Spent</p>
              <p className="text-2xl font-bold">€{totalSpent.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">{Math.round((totalSpent/totalBudget)*100)}% used</p>
            </div>
            <div className="border border-green-400/50 bg-green-400/10 p-4">
              <p className="text-sm uppercase tracking-wider text-green-400 mb-2">Available</p>
              <p className="text-2xl font-bold">€{(totalBudget - totalAllocated).toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">Unallocated funds</p>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Budget Categories</h2>
            
            <div className="space-y-6">
              {budgetItems.map((item, index) => (
                <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg">{item.category}</p>
                      <p className="text-sm text-white/60 mt-1">
                        {item.items.join(' • ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€{item.allocated.toLocaleString()}</p>
                      <p className="text-sm text-white/60">€{item.spent.toLocaleString()} spent</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Notes */}
          <div className="border border-yellow-400/50 bg-yellow-400/10 p-6">
            <p className="text-sm uppercase tracking-wider text-yellow-400 mb-3 font-bold">Financial Notes</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Frame ordering requires 50% deposit immediately (Week 1)</li>
              <li>• Grand Palais requires full payment by October 15</li>
              <li>• Contingency fund must remain untouched until Week 7</li>
              <li>• All expenses require approval from Seth + relevant partner</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}