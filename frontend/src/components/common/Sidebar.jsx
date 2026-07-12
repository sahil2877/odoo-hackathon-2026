import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Organization', path: '/organization-setup', icon: 'corporate_fare' },
    { name: 'Assets', path: '/asset-directory', icon: 'inventory_2' },
    { name: 'Allocation', path: '/asset-allocation', icon: 'move_up' },
    { name: 'Booking', path: '/resource-booking', icon: 'event_available' },
    { name: 'Maintenance', path: '/maintenance-management', icon: 'build' },
    { name: 'Audits', path: '/asset-audit', icon: 'fact_check' },
    { name: 'Reports', path: '/reports-analytics', icon: 'assessment' },
    { name: 'Notifications', path: '/notifications-log', icon: 'notifications' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest border-r border-outline-variant flex flex-col py-margin px-stack-md z-50" id="SideNavBar">
      <div className="mb-margin px-2">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">AssetFlow</h1>
        <p className="text-on-surface-variant font-body-sm text-body-sm">Enterprise ERP</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-md text-body-md transition-all ${
                isActive
                  ? 'sidebar-active font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant space-y-1">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" href="#">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" href="#">
          <span className="material-symbols-outlined">help</span>
          Support
        </a>
      </div>
    </aside>
  );
}
