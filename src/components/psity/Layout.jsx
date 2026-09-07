import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StickyCTA from './StickyCTA';

export default function Layout() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}