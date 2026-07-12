import React, { useState } from 'react';

export default function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState('Employee Directory');
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const employees = [
    { name: 'Sarah Jenkins', email: 's.jenkins@assetflow.corp', dept: 'Logistics', role: 'Asset Specialist', status: 'Active', initials: 'SJ', bg: 'bg-secondary-container text-on-secondary-container' },
    { name: 'Michael Kross', email: 'm.kross@assetflow.corp', dept: 'IT Infrastructure', role: 'System Auditor', status: 'Active', initials: 'MK', bg: 'bg-surface-container-highest text-primary' },
    { name: 'David Rivera', email: 'd.rivera@assetflow.corp', dept: 'Finance', role: 'Procurement Associate', status: 'On Leave', initials: 'DR', bg: 'bg-secondary-fixed text-on-secondary-fixed' },
    { name: 'Elena Vance', email: 'e.vance@assetflow.corp', dept: 'Operations', role: 'Compliance Lead', status: 'Active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXc1ZlDz8-w5Uc8vCcAXnTWGlN0-NO2HepIVQuS8yJjRaNnwV7KTgkw5TgNFYgzBhQ1lJUcbAlF05EEkzQpYqvrV4CyZBCvQRkHpK6_gFypI1tD-S-AXmx7Jv4qkxivPVJ5IfVooRwwmgfWiO1jR8KDfqdVepHy0SWKZ1hiBMbpZD929mLw1c9FkAlG7QTlasicXpbtPCMMLub6m7pq8oMoyu-YUf5faCvr4nwZ6Jkik7qMX_N3bXJNUrJy3sG3JzOsG37ENosM7Z-' }
  ];

  const handlePromote = (name) => {
    alert(`Promotion action simulated for ${name}.`);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesFilterText = 
      emp.name.toLowerCase().includes(filterText.toLowerCase()) ||
      emp.dept.toLowerCase().includes(filterText.toLowerCase()) ||
      emp.role.toLowerCase().includes(filterText.toLowerCase()) ||
      emp.email.toLowerCase().includes(filterText.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All Status' || 
      emp.status === statusFilter;

    return matchesFilterText && matchesStatus;
  });

  return (
    <div className="mt-2 flex-1 flex flex-col gap-6">
      {/* Page Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-display text-on-surface">Organization Setup</h2>
          <p className="text-on-surface-variant mt-1 font-body-md text-body-md">Manage institutional hierarchy, asset classifications, and personnel access levels.</p>
        </div>
        <button 
          onClick={() => alert('Add Employee modal simulation')}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-body-md text-body-md font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add Employee
        </button>
      </div>

      {/* Contextual Tabs */}
      <div className="border-b border-outline-variant flex items-center gap-8">
        {['Department Management', 'Asset Category Management', 'Employee Directory'].map(tab => (
          <button 
            key={tab}
            className={`px-1 py-4 font-body-md text-body-md transition-colors relative cursor-pointer ${
              activeTab === tab ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab ? (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            ) : (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent hover:bg-outline-variant"></div>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'Employee Directory' ? (
        <>
          {/* Filter & Search Bar */}
          <div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl elevation-1 border border-outline-variant">
            <div className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">filter_list</span>
              <input 
                className="w-full border border-outline-variant rounded-lg pl-10 py-2 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                placeholder="Filter by name, department, or role..." 
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <select 
                className="border border-outline-variant rounded-lg py-2 pl-3 pr-10 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary bg-surface-bright"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Inactive</option>
              </select>
              <button 
                onClick={() => alert('Download report simulation started')}
                className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-surface-container-lowest rounded-xl elevation-1 border border-outline-variant flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-label-sm text-label-sm text-outline border-b border-outline-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredEmployees.map((emp, index) => (
                    <tr key={index} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {emp.avatar ? (
                            <img className="w-9 h-9 rounded-full object-cover border border-outline-variant" alt="Avatar" src={emp.avatar}/>
                          ) : (
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-label-md ${emp.bg}`}>
                              {emp.initials}
                            </div>
                          )}
                          <div className="font-body-md text-body-md font-semibold text-on-surface">{emp.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{emp.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-surface-container-high px-2 py-1 rounded text-body-sm font-medium">{emp.dept}</span>
                      </td>
                      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{emp.role}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          emp.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-surface-container-highest text-secondary-container'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-body-sm">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handlePromote(emp.name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary text-primary font-body-sm text-body-sm hover:bg-primary hover:text-on-primary transition-all cursor-pointer" 
                            title="Promote to Manager"
                          >
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            Promote
                          </button>
                          <button 
                            onClick={() => alert('Options menu clicked')}
                            className="p-1.5 hover:bg-outline-variant/20 rounded-lg text-outline cursor-pointer"
                          >
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-on-surface-variant font-body-md">
                        No employees found matching the filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Footer */}
            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant flex items-center justify-between">
              <p className="font-body-sm text-body-sm text-outline">Showing 1 to {filteredEmployees.length} of {filteredEmployees.length} employees</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-sm text-label-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant elevation-1 text-center font-body-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] text-primary mb-2">construction</span>
          <p>{activeTab} is currently being initialized. Dynamic mock data setup is active.</p>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">groups</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Headcount</p>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">1,248</h4>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined">domain</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Departments</p>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">14</h4>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant elevation-1 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined">shield_person</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Unassigned Assets</p>
            <h4 className="font-headline-md text-headline-md font-bold text-on-surface">32</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
