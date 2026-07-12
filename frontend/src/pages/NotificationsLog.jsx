import React, { useState } from 'react';

export default function NotificationsLog() {
  const [filterTab, setFilterTab] = useState('All Activity');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      tag: 'Asset Assigned',
      time: '2m ago',
      title: 'Laptop XPS-15-2023 assigned',
      desc: 'Allocated to Sarah Jenkins for the Tokyo Marketing campaign.',
      read: false,
      border: 'border-l-primary',
      icon: 'assignment_ind',
      bg: 'bg-primary-fixed text-primary'
    },
    {
      id: 2,
      tag: 'Maintenance Approved',
      time: '45m ago',
      title: 'Generator Unit #4 Service',
      desc: 'Preventive maintenance scheduled for Friday has been greenlit by Fleet Dept.',
      read: false,
      border: 'border-l-secondary-container',
      icon: 'verified',
      bg: 'bg-secondary-fixed text-on-secondary-fixed-variant'
    },
    {
      id: 3,
      tag: 'Overdue Alert',
      time: '2h ago',
      title: 'Contract Renewal Missed',
      desc: 'Lease for Office A-24 in Singapore expired 48 hours ago. Critical action required.',
      read: false,
      border: 'border-l-error',
      icon: 'warning',
      bg: 'bg-error-container text-error'
    },
    {
      id: 4,
      tag: 'Audit Discrepancy',
      time: '5h ago',
      title: 'Inventory Mismatch',
      desc: 'Audit #AUD-992 found 3 missing handheld scanners in Warehouse North.',
      read: false,
      border: 'border-l-tertiary',
      icon: 'report_problem',
      bg: 'bg-tertiary-fixed text-tertiary'
    },
    {
      id: 5,
      tag: 'Stock Update',
      time: '1d ago',
      title: 'Bulk Import Successful',
      desc: '500 new IT assets successfully added to the central repository.',
      read: true,
      border: 'border-l-primary/30',
      icon: 'inventory',
      bg: 'bg-surface-container text-on-surface-variant'
    }
  ]);

  const activities = [
    { user: 'John Doe', initials: 'JD', role: 'Admin', action: 'Modified Asset #AST-552', module: 'Inventory', time: 'Oct 24, 14:22:10', type: 'user', color: 'bg-primary', initialsColor: 'bg-primary-fixed-dim text-on-primary-fixed' },
    { user: 'Rita Lopez', initials: 'RL', role: 'Finance', action: 'Approved Procurement #PRQ-001', module: 'Finance', time: 'Oct 24, 13:58:34', type: 'user', color: 'bg-tertiary', initialsColor: 'bg-secondary-fixed text-on-secondary-fixed' },
    { user: 'Internal Engine', initials: 'System', role: 'Daemon', action: 'Login Attempt Failed (IP: 192.168.1.12)', module: 'Security', time: 'Oct 24, 12:44:02', type: 'system', color: 'bg-error animate-pulse', initialsColor: 'bg-error-container text-error' },
    { user: 'Marcus Thorne', initials: 'MT', role: 'Manager', action: 'Generated Monthly Audit Report', module: 'Audits', time: 'Oct 24, 11:12:15', type: 'user', color: 'bg-primary', initialsColor: 'bg-tertiary-fixed text-on-tertiary-fixed' },
    { user: 'Steve Turing', initials: 'ST', role: 'Engineer', action: 'Asset Maintenance Completed #AST-022', module: 'Maintenance', time: 'Oct 24, 09:30:00', type: 'user', color: 'bg-primary', initialsColor: 'bg-primary-fixed text-on-primary-fixed' },
    { user: 'John Doe', initials: 'JD', role: 'Admin', action: "Created New Asset Category: 'Renewables'", module: 'Configuration', time: 'Oct 23, 22:45:11', type: 'user', color: 'bg-primary', initialsColor: 'bg-secondary-fixed text-on-secondary-fixed' }
  ];

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const handleAlertClick = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const filteredActivities = activities.filter(act => {
    if (filterTab === 'Errors Only') {
      return act.module === 'Security';
    }
    if (filterTab === 'Users') {
      return act.type === 'user';
    }
    return true;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="mt-2 flex-1 flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-display text-on-surface">System Activity</h2>
          <p className="text-on-surface-variant mt-1">Real-time operational alerts and cross-module audit trails.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Exporting log data...')}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-all font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Log
          </button>
          <button 
            onClick={() => alert('Clearing filters...')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:shadow-lg hover:bg-primary-container transition-all font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Clear All
          </button>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-12 gap-gutter flex-1">
        {/* Left Panel: Notification Feed (Column 1-4) */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
              Recent Alerts 
              {unreadCount > 0 && (
                <span className="text-[12px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
            </h3>
            <button 
              onClick={handleMarkAllRead}
              className="text-primary text-xs font-bold hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          </div>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                onClick={() => handleAlertClick(alert.id)}
                className={`p-stack-lg rounded-xl flex gap-4 hover:shadow-md transition-all cursor-pointer bg-surface-container-lowest border border-outline-variant ${
                  alert.read ? 'border-l-4 border-l-outline-variant/30 opacity-60' : `border-l-4 ${alert.border}`
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${alert.bg}`}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {alert.icon}
                  </span>
                </div>
                <div className="flex-1 text-on-surface">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-label-sm uppercase font-bold text-xs ${alert.read ? 'text-outline' : ''}`}>
                      {alert.tag}
                    </span>
                    <span className="text-[10px] text-outline font-mono">{alert.time}</span>
                  </div>
                  <h4 className="font-bold text-on-surface">{alert.title}</h4>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">{alert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Panel: Activity Log Table (Column 5-12) */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-headline-md text-headline-md text-on-surface">Activity Log</h3>
            <div className="flex items-center gap-2">
              <div className="flex p-1 bg-surface-container rounded-lg">
                {['All Activity', 'Errors Only', 'Users'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      filterTab === tab 
                        ? 'bg-surface-container-lowest shadow-sm text-primary' 
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface">
                    <th className="px-6 py-4 text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">User</th>
                    <th className="px-6 py-4 text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">Action</th>
                    <th className="px-6 py-4 text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">Module</th>
                    <th className="px-6 py-4 text-label-sm uppercase text-on-surface-variant font-bold tracking-widest text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50 text-on-surface">
                  {filteredActivities.map((act, index) => (
                    <tr key={index} className="hover:bg-surface-container-high transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${act.initialsColor}`}>
                            {act.initials}
                          </div>
                          <div>
                            <p className="text-body-md font-bold">{act.user}</p>
                            <p className="text-[10px] text-outline font-mono">{act.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${act.color}`}></span>
                          <p className="text-body-md">{act.action}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant text-[11px] font-bold">
                          {act.module}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-body-sm font-mono text-outline">{act.time}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Footer */}
            <div className="mt-auto px-6 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between text-on-surface">
              <span className="text-body-sm text-on-surface-variant">Showing 1-{filteredActivities.length} of {filteredActivities.length} results</span>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="px-3 py-1 rounded bg-primary text-on-primary text-xs font-bold">1</button>
                <button className="p-2 rounded hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Filter FAB */}
      <button 
        onClick={() => alert(`Active filter view configured: ${filterTab}`)}
        className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group cursor-pointer"
      >
        <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">filter_alt</span>
        <div className="absolute right-full mr-4 bg-on-surface text-surface px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Quick Filter
        </div>
      </button>
    </div>
  );
}
