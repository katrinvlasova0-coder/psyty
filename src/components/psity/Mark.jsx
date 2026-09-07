import React from 'react';

export default function Mark({ className = 'w-7 h-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="20" cy="15" r="6" />
      <line x1="6" y1="28" x2="34" y2="28" />
    </svg>
  );
}