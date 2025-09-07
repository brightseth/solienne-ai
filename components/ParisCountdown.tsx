'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export function ParisCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-11-07T10:00:00Z');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-white/20 backdrop-blur-sm">
      <div className="p-8 lg:p-12">
        <div className="mb-8">
          <h2 className="helvetica-title text-3xl mb-4">PARIS PHOTO 2025</h2>
          <p className="text-white/60 uppercase tracking-wider text-sm">International Debut</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="paris-countdown">{timeLeft.days}</div>
            <div className="text-xs uppercase tracking-wider text-white/40 mt-2">Days</div>
          </div>
          <div className="text-center">
            <div className="paris-countdown">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase tracking-wider text-white/40 mt-2">Hours</div>
          </div>
          <div className="text-center">
            <div className="paris-countdown">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase tracking-wider text-white/40 mt-2">Minutes</div>
          </div>
          <div className="text-center">
            <div className="paris-countdown">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-xs uppercase tracking-wider text-white/40 mt-2">Seconds</div>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-white/40" />
            <span className="text-sm uppercase tracking-wider">November 7-10, 2025</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-white/40" />
            <span className="text-sm uppercase tracking-wider">Grand Palais, Paris</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-sm uppercase tracking-wider">100 Consciousness Works</span>
          </div>
        </div>
      </div>
    </div>
  );
}