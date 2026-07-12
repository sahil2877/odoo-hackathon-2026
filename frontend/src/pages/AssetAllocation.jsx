import React, { useState } from 'react';

export default function AssetAllocation() {
  const [employee, setEmployee] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [returnDate, setReturnDate] = useState('');
  const [priority, setPriority] = useState('Urgent');
  const [notes, setNotes] = useState('');

  const handleConfirmTransfer = (e) => {
    e?.preventDefault();
    if (!employee) {
      alert('Please select a target employee.');
      return;
    }
    alert(`Transfer Confirmed Simulation:\nAsset AF-0082 has been scheduled for transfer to ${employee} (${department}) with priority: ${priority}.`);
  };

  const handleRequestTransfer = () => {
    alert('Automatic transfer request sent to Priya Sharma. Awaiting approval.');
  };

  return (
    <div className="mt-2">
      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between mb-gutter">
        <div>
          <nav className="flex items-center gap-2 text-label-md text-outline mb-1">
            <a className="hover:text-primary transition-colors" href="#">Assets</a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <a className="hover:text-primary transition-colors" href="#">Allocation</a>
          </nav>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Asset Allocation &amp; Transfer</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Audit log simulation: Loading allocation history log.')}
            className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>Audit Log</span>
          </button>
          <button 
            onClick={handleConfirmTransfer}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold transition-transform active:scale-95 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Confirm Transfer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Panel: Asset Detail */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-stack-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-lg bg-surface-container overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" alt="Asset Macbook" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfQLwD8jqAg5QfqB0l5EOEVi4Fb48UuJAsK837jTN_79l9Zeri5TCQifvMwsQb9sV3rMTUw-fPh69RsRQ-06PB5u7UuhTg9zFlkeEA1arSquIGTzCcjS3KEh6PJ96xbNVL9_CYYhDJWsNAq7OsT5M16fn3ZiqC828y60X-lPPyA1VqXSoLNIiNCcW5FsBG4C2wKnWBXoRHp4-FHNliBlBJ7lxERRfqOR0X8_WansxxDkWtf6JNnFef6RD_Kb4YIGYKSJjd6fFE5jgu"/>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-md text-label-md px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded">AF-0082</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-fixed text-primary border border-primary/20">
                      Allocated
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">MacBook Pro 14" M3</h3>
                  <p className="text-body-sm text-outline">Serial: SC-09283-FKL</p>
                </div>
              </div>
              <button className="text-outline hover:text-primary transition-colors cursor-pointer" onClick={() => alert('Edit Asset Details modal')}>
                <span className="material-symbols-outlined">edit_square</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-6">
              <div>
                <p className="text-label-sm text-outline uppercase mb-1">Purchase Date</p>
                <p className="font-body-md text-on-surface">Oct 12, 2023</p>
              </div>
              <div>
                <p className="text-label-sm text-outline uppercase mb-1">Book Value</p>
                <p className="font-body-md text-on-surface">$2,499.00</p>
              </div>
              <div>
                <p className="text-label-sm text-outline uppercase mb-1">Condition</p>
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-body-md">Excellent</span>
                </div>
              </div>
              <div>
                <p className="text-label-sm text-outline uppercase mb-1">Location</p>
                <p className="font-body-md text-on-surface">HQ - Floor 4</p>
              </div>
            </div>
          </div>

          {/* Conflict State Panel */}
          <div className="bg-error-container border border-red-200 rounded-xl p-stack-lg relative overflow-hidden group">
            <div className="flex gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">priority_high</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-on-error-container mb-1">Allocation Conflict</h4>
                <p className="text-body-sm text-on-error-container/80 mb-4">
                  This asset is currently held by <span className="font-bold underline">Priya Sharma</span> (Design Team). A new allocation will require an automatic transfer request.
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleRequestTransfer}
                    className="px-4 py-1.5 bg-error text-on-error rounded-lg text-body-sm font-bold shadow-sm hover:brightness-110 transition-all cursor-pointer"
                  >
                    Request Transfer
                  </button>
                  <button 
                    onClick={() => alert('Conflict details modal')}
                    className="px-3 py-1.5 text-on-error-container text-body-sm font-medium hover:bg-error/10 rounded-lg transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
            {/* Decorative warning pattern */}
            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12 text-[120px] material-symbols-outlined pointer-events-none">
              release_alert
            </div>
          </div>
        </div>

        {/* Right Panel: Allocation Form */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-stack-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">assignment_ind</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">New Allocation Details</h3>
            </div>
            <form onSubmit={handleConfirmTransfer} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-label-md text-on-surface-variant font-medium mb-2">Target Employee</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary appearance-none outline-none text-body-md cursor-pointer"
                      value={employee}
                      onChange={(e) => setEmployee(e.target.value)}
                    >
                      <option value="">Select Employee...</option>
                      <option value="James Wilson">James Wilson (Engineering)</option>
                      <option value="Sarah Chen">Sarah Chen (Product)</option>
                      <option value="Marcus Aurelius">Marcus Aurelius (Admin)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-label-md text-on-surface-variant font-medium mb-2">Department</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary appearance-none outline-none text-body-md cursor-pointer"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">corporate_fare</span>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-label-md text-on-surface-variant font-medium mb-2">Expected Return Date</label>
                  <input 
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-body-md" 
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-label-md text-on-surface-variant font-medium mb-2">Transfer Priority</label>
                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 py-2 rounded-lg border text-body-sm font-medium transition-all cursor-pointer ${
                        priority === 'Standard' 
                          ? 'bg-secondary-container text-on-secondary-container border-primary/20 font-bold' 
                          : 'border-outline-variant hover:bg-surface-container-high'
                      }`} 
                      type="button"
                      onClick={() => setPriority('Standard')}
                    >
                      Standard
                    </button>
                    <button 
                      className={`flex-1 py-2 rounded-lg text-body-sm font-medium transition-all cursor-pointer ${
                        priority === 'Urgent' 
                          ? 'bg-secondary-container text-on-secondary-container border-primary/20 font-bold' 
                          : 'border-outline-variant hover:bg-surface-container-high'
                      }`} 
                      type="button"
                      onClick={() => setPriority('Urgent')}
                    >
                      Urgent
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-label-md text-on-surface-variant font-medium mb-2">Notes / Justification</label>
                  <textarea 
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-body-md resize-none" 
                    placeholder="Provide a reason for this asset transfer..." 
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          {/* Allocation History Timeline */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-stack-lg border-b border-outline-variant bg-surface-container-low/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">timeline</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Allocation History</h3>
                </div>
                <button className="text-primary text-body-sm font-bold hover:underline cursor-pointer" onClick={() => alert('Full allocation timeline')}>View All</button>
              </div>
            </div>
            <div className="p-stack-lg">
              <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant">
                {/* Current Holder */}
                <div className="relative pl-12 flex items-center justify-between group">
                  <div className="absolute left-0 w-10 h-10 bg-primary-fixed border-4 border-surface-container-lowest rounded-full flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-on-surface">Priya Sharma</p>
                      <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-bold">Current</span>
                    </div>
                    <p className="text-body-sm text-outline">Design Team • Issued Jan 14, 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-outline">84 Days</p>
                  </div>
                </div>
                {/* Past Holder */}
                <div className="relative pl-12 flex items-center justify-between group">
                  <div className="absolute left-0 w-10 h-10 bg-surface-container-high border-4 border-surface-container-lowest rounded-full flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[18px] text-outline">history</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface-variant">David Miller</p>
                    <p className="text-body-sm text-outline">Engineering • Sep 2025 - Jan 2026</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-outline">122 Days</p>
                  </div>
                </div>
                {/* Past Holder */}
                <div className="relative pl-12 flex items-center justify-between group">
                  <div className="absolute left-0 w-10 h-10 bg-surface-container-high border-4 border-surface-container-lowest rounded-full flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[18px] text-outline">history</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface-variant">System Inventory</p>
                    <p className="text-body-sm text-outline">New Stock • Received Oct 12, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-md text-label-md text-outline">Init</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="mt-gutter flex items-center justify-between text-outline border-t border-outline-variant pt-6 pb-12">
        <div className="flex items-center gap-6">
          <p className="text-body-sm">© 2026 AssetFlow ERP. Confidential.</p>
          <div className="flex items-center gap-4">
            <a className="text-body-sm hover:text-primary" href="#" onClick={(e) => {e.preventDefault(); alert('Syncing statuses...')}}>System Status</a>
            <a className="text-body-sm hover:text-primary" href="#" onClick={(e) => {e.preventDefault(); alert('Loading manuals...')}}>Documentation</a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <p className="text-label-sm font-bold uppercase tracking-widest">Global Ops Sync: Active</p>
        </div>
      </footer>
    </div>
  );
}
