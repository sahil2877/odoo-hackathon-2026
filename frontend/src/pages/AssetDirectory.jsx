import React, { useState } from 'react';

export default function AssetDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  const assets = [
    { tag: 'AF-0001', name: 'MacBook Pro 16" (M3 Max)', category: 'IT Hardware', status: 'Allocated', location: 'New York HQ', assignee: 'Jane Doe', initials: 'JD', type: 'avatar' },
    { tag: 'AF-0012', name: 'CNC Lathe G-Series', category: 'Production Machinery', status: 'Available', location: 'Texas Factory A', assignee: 'Unassigned', type: 'text' },
    { tag: 'AF-0432', name: 'Dell UltraSharp 32" 4K', category: 'IT Hardware', status: 'Under Maintenance', location: 'California Hub', assignee: 'Mike Kelly', initials: 'MK', type: 'avatar' },
    { tag: 'AF-1105', name: 'Industrial Laser Cutter', category: 'Production Machinery', status: 'Lost', location: 'In Transit', assignee: 'Last: S. Patel', type: 'text' },
    { tag: 'AF-0982', name: 'Ergonomic Desk V3', category: 'Office Furniture', status: 'Retired', location: 'Warehouse B', assignee: 'Disposed', type: 'text' }
  ];

  const handleReset = () => {
    setCategoryFilter('All Categories');
    setStatusFilter('All Statuses');
    setDeptFilter('All Departments');
    setLocationFilter('All Locations');
    setSearchQuery('');
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.assignee.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All Categories' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Statuses' || asset.status === statusFilter;
    const matchesLocation = locationFilter === 'All Locations' || asset.location === locationFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Allocated':
        return 'bg-blue-100 text-blue-700';
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Under Maintenance':
        return 'bg-amber-100 text-amber-700';
      case 'Lost':
        return 'bg-red-100 text-red-700';
      case 'Retired':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="mt-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter mb-8">
        <div>
          <h2 className="font-display text-display text-on-surface">Asset Directory</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage and track your global enterprise inventory.</p>
        </div>
        <button 
          onClick={() => alert('Register New Asset simulation clicked')}
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-primary/95 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Register New Asset
        </button>
      </div>

      {/* Dashboard Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md font-label-md text-outline uppercase tracking-wider">Total Assets</span>
            <span className="material-symbols-outlined text-primary">inventory_2</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface">12,842</div>
          <div className="text-label-sm font-label-sm text-green-600 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.2% from last month
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md font-label-md text-outline uppercase tracking-wider">Allocated</span>
            <span className="material-symbols-outlined text-primary">person_check</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface">8,914</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">69.4% Utilization</div>
        </div>
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md font-label-md text-outline uppercase tracking-wider">In Maintenance</span>
            <span className="material-symbols-outlined text-tertiary">build</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface">142</div>
          <div className="text-label-sm font-label-sm text-error mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">warning</span> 12 overdue items
          </div>
        </div>
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md font-label-md text-outline uppercase tracking-wider">Asset Value</span>
            <span className="material-symbols-outlined text-primary">payments</span>
          </div>
          <div className="text-headline-lg font-headline-lg text-on-surface">$2.4M</div>
          <div className="text-label-sm font-label-sm text-on-surface-variant mt-1">Book Value Estimate</div>
        </div>
      </div>

      {/* Search Input added for functional improvement */}
      <div className="relative mb-4 group max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
        <input 
          className="w-full border border-outline-variant rounded-lg pl-10 py-2 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-surface-container-lowest" 
          placeholder="Search by tag, name or holder..." 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm mb-6 p-stack-md flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-sm font-label-sm text-outline mb-1 px-1">Category</label>
          <select 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>IT Hardware</option>
            <option>Production Machinery</option>
            <option>Vehicles</option>
            <option>Office Furniture</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-sm font-label-sm text-outline mb-1 px-1">Status</label>
          <select 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Available</option>
            <option>Allocated</option>
            <option>Under Maintenance</option>
            <option>Lost</option>
            <option>Retired</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-sm font-label-sm text-outline mb-1 px-1">Department</label>
          <select 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:outline-none"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Operations</option>
            <option>Finance</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-label-sm font-label-sm text-outline mb-1 px-1">Location</label>
          <select 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary focus:outline-none"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option>All Locations</option>
            <option>Headquarters (NY)</option>
            <option>Texas Factory A</option>
            <option>California Hub</option>
            <option>Warehouse B</option>
            <option>In Transit</option>
          </select>
        </div>
        <div className="flex items-end h-full pt-5">
          <button 
            onClick={handleReset}
            className="bg-surface-container-high text-on-surface-variant hover:text-primary border border-outline-variant px-4 py-2 rounded-lg font-body-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">filter_alt_off</span>
            Reset
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Asset Tag</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-4 text-label-sm font-label-sm text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredAssets.map((asset) => (
                <tr key={asset.tag} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 font-label-md text-label-md text-primary font-bold">{asset.tag}</td>
                  <td className="px-6 py-4 font-body-md text-body-md text-on-surface">{asset.name}</td>
                  <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{asset.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm ${getStatusClass(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{asset.location}</td>
                  <td className="px-6 py-4">
                    {asset.type === 'avatar' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed-dim flex items-center justify-center text-[10px] font-bold text-primary">
                          {asset.initials}
                        </div>
                        <span className="text-body-sm font-body-sm">{asset.assignee}</span>
                      </div>
                    ) : (
                      <span className={`text-body-sm ${asset.assignee === 'Unassigned' ? 'text-outline-variant italic' : 'font-body-sm text-on-surface-variant'}`}>
                        {asset.assignee}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => alert(`Edit asset ${asset.tag}`)}
                      className="p-1 hover:text-primary transition-colors cursor-pointer mr-2"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={() => alert('Options menu clicked')}
                      className="p-1 hover:text-primary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAssets.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-on-surface-variant font-body-md">
                    No assets found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="bg-surface-container-low px-6 py-4 border-t border-outline-variant flex items-center justify-between">
          <p className="text-body-sm text-on-surface-variant">Showing <span className="font-bold">1-{filteredAssets.length}</span> of <span className="font-bold">{filteredAssets.length}</span> assets</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-highest disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary text-body-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-highest disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
