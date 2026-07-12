import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed top-0 right-0 h-topbar_height w-[calc(100%-var(--spacing-sidebar-width))] bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-gutter z-40" id="TopNavBar">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-lg pl-10 py-2 font-body-md text-body-md focus:ring-0" placeholder="Search assets, users, or tickets..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer">
          <img className="w-full h-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy4oUSBnNxgMY_7gUMX_eSIO1YJdwW7_1bXUlD7CBwSvE7-_eKLzr3AXAGLC8Jbd-sV9Z7mU3HbKM0ZhtCRmUpjN7fadxd58ojkSCaKN2hokc-_IiaYaSBmqaPYRCfWYt-ghFR5649qNqZM8MFHlRbO2964kE3htRoORWA25OCKr_LPXmEm8sISkHsUF_8QSYwYY2q_BxR8NUWAnsSojHrT9YJDpvcltN6SWkXxBvaycvixFu4BrNQJTYHzQ_yypgYdaWiLd3l-72A"/>
        </div>
      </div>
    </header>
  );
}
