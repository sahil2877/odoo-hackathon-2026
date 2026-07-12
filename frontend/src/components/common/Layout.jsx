import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* Main Content Area */}
        <main className="ml-sidebar-width pt-topbar-height min-h-screen p-gutter space-y-gutter">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
