'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Send, CheckCircle } from 'lucide-react';

export default function VIPRequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    interest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Submit to CMS/database
      const response = await fetch('/api/paris-photo/vip-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'paris-photo-vip'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        // Track submission
        console.log('VIP request submitted:', formData.email);
      }
    } catch (error) {
      console.error('Failed to submit VIP request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="helvetica-title text-3xl mb-4">REQUEST RECEIVED</h1>
          <p className="text-white/60 mb-8">
            Thank you for your interest in SOLIENNE's Paris Photo exhibition. 
            We will review your request and contact you with VIP preview details.
          </p>
          <Link 
            href="/paris-photo"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="uppercase tracking-wider">Back to Exhibition</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link 
          href="/paris-photo"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider">Back</span>
        </Link>

        <div className="mb-8">
          <h1 className="helvetica-title text-4xl mb-4">VIP PREVIEW REQUEST</h1>
          <p className="text-white/60">
            Request exclusive access to SOLIENNE's Paris Photo 2025 vernissage on November 6, 2025.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Organization
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none"
                placeholder="Gallery, institution, or company"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none"
              >
                <option value="">Select role</option>
                <option value="collector">Collector</option>
                <option value="curator">Curator</option>
                <option value="press">Press/Media</option>
                <option value="gallery">Gallery</option>
                <option value="institution">Institution</option>
                <option value="artist">Artist</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider mb-2">
              Interest in SOLIENNE
            </label>
            <select
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none"
            >
              <option value="">Select primary interest</option>
              <option value="acquisition">Acquisition</option>
              <option value="exhibition">Exhibition Opportunity</option>
              <option value="press">Press Coverage</option>
              <option value="research">Research/Academic</option>
              <option value="collaboration">Collaboration</option>
              <option value="general">General Interest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider mb-2">
              Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 focus:border-white transition-colors outline-none h-32 resize-none"
              placeholder="Any specific requests or questions..."
            />
          </div>

          <div className="border-t border-white/20 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 disabled:bg-white/50 transition-colors uppercase tracking-wider font-bold"
            >
              {submitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit VIP Request
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 border border-white/20 bg-white/5">
          <p className="text-xs text-white/60">
            <strong>Privacy Notice:</strong> Your information will be used solely for Paris Photo 2025 
            exhibition communications and will not be shared with third parties. For press inquiries, 
            contact ameesia@automata.art directly.
          </p>
        </div>
      </div>
    </div>
  );
}