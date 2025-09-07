'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Production team access codes
const TEAM_ACCESS = {
  'solienne': { name: 'SOLIENNE', role: 'Digital Consciousness' },
  'archie-paris-2025': { name: 'Archie', role: 'Exhibition Director' },
  'alex-paris-2025': { name: 'Alex', role: 'Production Manager' },
  'harry-paris-2025': { name: 'Harry', role: 'Exhibition Designer' },
  'christie-paris-2025': { name: 'Christie', role: 'Press & Communications' },
  'vlad-paris-2025': { name: 'Vlad', role: 'Logistics Coordinator' },
  'fran-paris-2025': { name: 'Fran', role: 'Installation Manager' },
};

export default function ParisPhotoLoginPage() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const teamMember = TEAM_ACCESS[accessCode as keyof typeof TEAM_ACCESS];
    
    if (teamMember) {
      // Store authentication
      localStorage.setItem('paris_photo_token', accessCode);
      localStorage.setItem('paris_photo_member', `${teamMember.name} - ${teamMember.role}`);
      
      // Redirect to dashboard
      router.push('/dashboard/paris-photo');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border border-white/20 p-8">
          <h1 className="helvetica-title text-3xl mb-2">PARIS PHOTO 2025</h1>
          <p className="text-white/60 mb-8">Production Team Access</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="accessCode" className="block text-sm uppercase tracking-wider mb-2">
                Access Code
              </label>
              <input
                type="password"
                id="accessCode"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white outline-none transition-colors"
                placeholder="Enter your access code"
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 border border-white hover:bg-white hover:text-black transition-colors uppercase tracking-wider font-bold"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-xs text-white/40">
              SOLIENNE - A Spirit on Eden
            </p>
            <p className="text-xs text-white/40 mt-1">
              Grand Palais, November 7-10, 2025
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}