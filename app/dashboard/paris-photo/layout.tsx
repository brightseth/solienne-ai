'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ParisPhotoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamMember, setTeamMember] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Skip auth for login page
  const isLoginPage = pathname === '/dashboard/paris-photo/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Check authentication on client side only
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('paris_photo_token');
        const member = localStorage.getItem('paris_photo_member');
        
        if (!token || !member) {
          router.push('/dashboard/paris-photo/login');
        } else {
          setIsAuthenticated(true);
          setTeamMember(member);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/dashboard/paris-photo/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, isLoginPage]);

  // For login page, just render children without auth wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading state instead of null
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="helvetica-title text-2xl mb-4">SOLIENNE</div>
          <div className="text-white/60">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dashboard Header */}
      <header className="border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="helvetica-title text-2xl">
                SOLIENNE
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-sm uppercase tracking-wider text-white/60">
                Paris Photo Dashboard
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm text-white/60">
                {teamMember}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('paris_photo_token');
                  localStorage.removeItem('paris_photo_member');
                  router.push('/dashboard/paris-photo/login');
                }}
                className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Navigation */}
      <nav className="border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 py-4">
            <Link
              href="/dashboard/paris-photo"
              className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/paris-photo/curation"
              className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
            >
              Curation
            </Link>
            <Link
              href="/dashboard/paris-photo/production"
              className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
            >
              Production
            </Link>
            <Link
              href="/dashboard/paris-photo/preview"
              className="text-sm uppercase tracking-wider hover:text-white/60 transition-colors"
            >
              Preview
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}