import React, { useState } from 'react';

export default function AssetAudit() {
  const [checklist, setChecklist] = useState([
    {
      id: '#SRV-90210-A',
      name: 'Dell PowerEdge R750',
      location: 'Rack A-12',
      status: null, // 'verified', 'missing', 'damaged'
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh9UNlw0u3ngcw5Q0nb9HSi5F4w3XHQ0t9ocQ26EDzCn4N7Hp3YCl2VeinGirGESB3alqjIL0m4L51zTG8VKkby7ORFX3vlrgY_Kz9B2PMd2aSQJenqs5v9JpCaL1AmCU7D8h1SNibh3sEWbHil0hVCTsFo_wBHW3j_-wXyeSmcePYz5FATZjm0ToQT5EihG50p1_NSO54GqeMKan93Qohln0gHOoXqvg7OZxEWcITka-uQx63lqyjvCqAmvqOsrG7EHRCnqtnwfKu'
    },
    {
      id: '#PWR-442-XB',
      name: 'APC Smart-UPS 3000',
      location: 'Rack C-02',
      status: 'verified',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbMckk8MN_fnCIiCLab4ZdMe_X8NfwqDxghA0LTDnk5--XwNMkVdjI4uTvzhYGcQriIM2P9yuR6i6SIRM2yfMr7-CwsD6W-kAgCPwr1xaLvfZMiSbZhhYPakqfXV5EyMBmjg2s6pz4WHi4pPV73ulPlxSNENlvN__mPFXTcX8UDu97eYV09qr2FMkFe7FlH0AN3lkn0WKkb8qzMKISLaBCSdgi8V4LQBkm9aTcz0-c9fqTwdPkoqd4r-8rnrXG8U6gznbNENi76i6Q'
    },
    {
      id: '#NET-551-SW',
      name: 'Cisco Catalyst 9300',
      location: 'Rack A-01',
      status: 'damaged',
      note: 'Front bezel latch broken. Fan unit 3 making excessive noise. Requires immediate maintenance ticket.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLuMJxAhTR43U0DiJAswlQJbQ-jbIDcLW8GZQS2F6oLVeBPgRpbhZURyxSfsruh-Q8bLGGqXVaR57KcX6vqolk7ryM_yf0qMh9om1GJvQLg2vTyv-cLF7jXh04FHSacKyIDhe8-sSfmDUN3S9HroJMt7I3hQZ3OxP_o6k3LCEqlH6MRUMVAQaRRzSkeheTj9X-LQHYGR47mxNGvAX6oyITw76ebf9l7AOwHrkpVBaXW_eYJhk4e5kcbHsy7IrdFc9fsn_oo7jDlG_l'
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
  };

  // Calculate stats dynamically
  const totalVerified = checklist.filter(item => item.status === 'verified').length;
  const totalMissing = checklist.filter(item => item.status === 'missing').length;
  const totalDamaged = checklist.filter(item => item.status === 'damaged').length;

  return (
    <div className="mt-2">
      {/* Header Banner Section */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <nav className="flex items-center gap-2 text-label-md font-label-md text-outline mb-2">
            <span>Audits</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">Current Cycle</span>
          </nav>
          <h2 className="font-display text-display text-on-surface">Annual Q3 Infrastructure Audit</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Scope: Data Center & Logistics Hub • Start: July 01, 2026</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('PDF export simulated successfully.')}
            className="px-4 py-2 border border-outline-variant bg-surface-container-lowest text-on-surface rounded-lg font-body-md text-body-md hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Export PDF
          </button>
          <button 
            onClick={() => alert('Q3 Infrastructure Audit Cycle closed.')}
            className="px-6 py-2 bg-error text-on-error rounded-lg font-body-md text-body-md font-bold hover:bg-error/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            Close Audit Cycle
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Audit Cycles List (Left - col-span-3) */}
        <div className="col-span-12 lg:col-span-3 space-y-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-stack-lg">
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-4">Audit History</h3>
            <div className="space-y-3">
              {/* Ongoing Item */}
              <div className="p-3 bg-secondary-fixed/30 border border-primary/20 rounded-lg cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-body-md text-body-md font-bold text-primary">Q3 Infra Audit</span>
                  <span className="px-2 py-0.5 bg-primary-fixed text-primary text-[10px] font-bold rounded uppercase">Ongoing</span>
                </div>
                <p className="text-label-md font-label-md text-outline">Jul 01 - Jul 31</p>
                <div className="mt-3 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[68%]"></div>
                </div>
                <p className="text-[10px] font-label-sm text-on-surface-variant mt-1">68% Complete</p>
              </div>
              {/* Closed Items */}
              <div className="p-3 hover:bg-surface-container transition-colors rounded-lg cursor-pointer border border-transparent">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-body-md text-body-md font-medium text-on-surface">Q2 Fleet Review</span>
                  <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase">Closed</span>
                </div>
                <p className="text-label-md font-label-md text-outline">Apr 01 - Apr 15</p>
              </div>
              <div className="p-3 hover:bg-surface-container transition-colors rounded-lg cursor-pointer border border-transparent">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-body-md text-body-md font-medium text-on-surface">Q1 Security Audit</span>
                  <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase">Closed</span>
                </div>
                <p className="text-label-md font-label-md text-outline">Jan 10 - Jan 25</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 text-primary font-body-md text-body-md border border-dashed border-primary/50 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
              + View Full Archive
            </button>
          </div>

          {/* Mini Map Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden h-48 relative">
            <div className="absolute inset-0 z-0 bg-surface-container-highest flex items-center justify-center overflow-hidden">
              <div 
                className="w-full h-full grayscale opacity-60 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfRCAfK9rcTUJHkRZEnO3xkIsii1bK0asv7W_IJhWo6pTYR1ARpcX45Xsl1QaqQsJ_bTq1M0BLVnXs81cA4wkADrq7sU8JZnjQfcJwo0620sQP-Ujb1TPuJ1EknVS415r0efbT-hErTEnfgLyn3ZlC7hiGTtLG0wiGE01YPhthehw7Hy3GcY1pwz8HS3q4zLffWvN_8XI2qki7EEJ1xKAWBT_sMhpM-Jb3HQJsxRayIBVLQ3xCQKfh1WHj63a0ZCIXC_rp1JwN9Yw2')" }}
              ></div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent z-10">
              <p className="text-white text-body-sm font-body-sm">Active Zone: Chicago Sector B</p>
            </div>
          </div>
        </div>

        {/* Asset Checklist (Center - col-span-6) */}
        <div className="col-span-12 lg:col-span-6 space-y-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-stack-lg border-b border-outline-variant flex justify-between items-center bg-surface-bright">
              <h3 className="font-headline-md text-headline-md text-on-surface">Asset Checklist</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-surface-container-highest rounded-full text-label-md font-label-md text-on-surface-variant">
                  {totalVerified + totalMissing + totalDamaged} of {checklist.length} Verified
                </span>
                <button 
                  onClick={() => alert('Filter checklist options')}
                  className="material-symbols-outlined text-outline hover:text-primary cursor-pointer"
                >
                  filter_list
                </button>
              </div>
            </div>
            <div className="divide-y divide-outline-variant max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {checklist.map(item => (
                <div key={item.id} className="p-gutter hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary overflow-hidden">
                      <img className="w-full h-full object-cover" alt={item.name} src={item.image}/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-body-lg text-body-lg font-bold text-on-surface">{item.name}</h4>
                          <p className="font-label-md text-label-md text-outline uppercase">ASSET-ID: {item.id}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-tertiary text-[16px]">location_on</span>
                          <span className="text-label-md font-label-md text-tertiary">{item.location}</span>
                        </div>
                      </div>

                      {/* Verification Radio Group */}
                      <div className="mt-4 flex gap-4">
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${
                          item.status === 'verified' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-outline-variant hover:border-primary text-on-surface-variant'
                        }`}>
                          <input 
                            className="w-4 h-4 text-primary focus:ring-primary focus:ring-offset-0" 
                            name={`asset-${item.id}`} 
                            type="radio"
                            checked={item.status === 'verified'}
                            onChange={() => handleStatusChange(item.id, 'verified')}
                          />
                          <span className="font-body-md text-body-md">Verified</span>
                        </label>
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${
                          item.status === 'missing' ? 'border-error bg-error-container/20 text-error font-bold' : 'border-outline-variant hover:border-error text-on-surface-variant'
                        }`}>
                          <input 
                            className="w-4 h-4 text-error focus:ring-error focus:ring-offset-0" 
                            name={`asset-${item.id}`} 
                            type="radio"
                            checked={item.status === 'missing'}
                            onChange={() => handleStatusChange(item.id, 'missing')}
                          />
                          <span className="font-body-md text-body-md">Missing</span>
                        </label>
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${
                          item.status === 'damaged' ? 'border-tertiary bg-tertiary-fixed text-tertiary font-bold' : 'border-outline-variant hover:border-tertiary text-on-surface-variant'
                        }`}>
                          <input 
                            className="w-4 h-4 text-tertiary focus:ring-tertiary focus:ring-offset-0" 
                            name={`asset-${item.id}`} 
                            type="radio"
                            checked={item.status === 'damaged'}
                            onChange={() => handleStatusChange(item.id, 'damaged')}
                          />
                          <span className="font-body-md text-body-md">Damaged</span>
                        </label>
                      </div>

                      {item.status === 'damaged' && (
                        <div className="mt-3 p-3 bg-surface-container-low rounded-lg border border-dashed border-error/20">
                          <p className="text-body-sm font-body-sm text-on-error-container">
                            <span className="font-bold">Audit Note:</span> {item.note || 'Marked as damaged. Maintenance request required.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Discrepancy Report (Right - col-span-3) */}
        <div className="col-span-12 lg:col-span-3 space-y-gutter">
          {/* Analytics Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-stack-lg">
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-widest mb-6">Discrepancy Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">report_problem</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-outline">Active Discrepancies</p>
                    <p className="font-headline-md text-headline-md font-bold text-on-surface">
                      {totalMissing + totalDamaged} Issues
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-error font-bold text-body-sm">+22%</span>
                  <p className="text-[10px] text-outline">vs Q2</p>
                </div>
              </div>
              <div className="space-y-4 pt-4 border-t border-outline-variant">
                <div>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="text-on-surface-variant">Missing Assets</span>
                    <span className="font-bold text-error">{totalMissing + 4}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full">
                    <div className="bg-error h-full rounded-full" style={{ width: `${(totalMissing + 4) * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="text-on-surface-variant">Damaged Hardware</span>
                    <span className="font-bold text-tertiary">{totalDamaged + 8}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: `${(totalDamaged + 8) * 10}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span className="text-on-surface-variant">Location Mismatch</span>
                    <span className="font-bold text-primary">02</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="font-label-sm text-label-sm text-outline uppercase mb-3">Critical Alerts</h4>
                <div className="bg-error-container/20 border-l-4 border-error p-3 rounded-r-lg">
                  <p className="text-body-sm text-on-error-container font-medium">Unaccounted: Core Switch C-04</p>
                  <p className="text-[10px] text-on-error-container/70">Last seen: 12 days ago in Logistics</p>
                </div>
              </div>
              <button 
                onClick={() => alert('Generating full audit report...')}
                className="w-full py-2 bg-on-surface text-surface rounded-lg font-body-md text-body-md hover:bg-on-surface/90 transition-all cursor-pointer"
              >
                Generate Full Report
              </button>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-primary-container p-stack-lg rounded-xl shadow-lg relative overflow-hidden text-on-primary-container">
            {/* Glow effect */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <h3 className="font-label-sm text-label-sm text-white/70 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Smart Insight
            </h3>
            <p className="font-body-md text-body-md font-medium leading-relaxed">
              "Current trends suggest a 12% increase in damage reports for Rack A hardware. Recommend environmental cooling check in Sector B."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
