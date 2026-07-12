import React, { useState } from 'react';

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // Heatmap intensity options
  const intensities = [
    'bg-surface-container', 
    'bg-secondary-fixed', 
    'bg-secondary', 
    'bg-on-secondary-fixed-variant'
  ];

  // Stable random colors for heatmap so they don't re-shuffle on every render
  const [heatmapCells] = useState(() => 
    Array.from({ length: 144 }).map(() => 
      intensities[Math.floor(Math.random() * intensities.length)]
    )
  );

  const performingAssets = [
    { id: '#AS-9921', name: 'CNC Router V5', icon: 'precision_manufacturing', performance: 94, uptime: '99.8%', roi: '+12.4', status: 'Optimal' },
    { id: '#AS-4410', name: 'Freight Hauler XT', icon: 'local_shipping', performance: 82, uptime: '94.2%', roi: '+8.1', status: 'Optimal' },
    { id: '#AS-0112', name: 'Main Server Rack 02', icon: 'dns', performance: 45, uptime: '100.0%', roi: '-2.2', status: 'Underutilized' }
  ];

  return (
    <div className="mt-2 flex-1">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-stack-md mb-margin">
        <div>
          <h2 className="font-display text-display text-on-surface">Reports &amp; Analytics</h2>
          <p className="text-body-md text-on-surface-variant">System-wide operational metrics and financial transparency dashboard.</p>
        </div>
        <div className="flex items-center gap-stack-sm">
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-outline mr-2">calendar_today</span>
            <select 
              className="bg-transparent border-none focus:ring-0 text-body-md text-on-surface-variant cursor-pointer p-0 outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>
          <button 
            onClick={() => alert(`Exporting report for period: ${timeRange}`)}
            className="flex items-center gap-2 bg-on-surface text-surface px-4 py-2 rounded-lg font-body-md hover:bg-primary-container hover:text-white transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Chart: Asset Utilization Trend (Line Chart - Primary) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <div className="flex items-center justify-between mb-stack-lg">
            <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Asset Utilization Trend
            </h3>
            <div className="flex items-center gap-stack-md">
              <span className="flex items-center gap-1.5 text-label-md font-label-md text-primary">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span> Enterprise
              </span>
              <span className="flex items-center gap-1.5 text-label-md font-label-md text-secondary">
                <span className="w-3 h-3 rounded-full bg-secondary"></span> Logistics
              </span>
            </div>
          </div>
          <div className="h-64 w-full chart-container relative flex items-end justify-between px-4 pb-4">
            {/* Simulated Line Chart with SVG */}
            <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
              <path 
                d="M 0 180 Q 50 140, 100 160 T 200 100 T 300 120 T 400 80 T 500 90 T 600 40 T 700 60 T 800 20" 
                fill="none" 
                stroke="#004ac6" 
                strokeLinecap="round" 
                strokeWidth="3"
              ></path>
              <path 
                d="M 0 200 Q 50 180, 100 190 T 200 160 T 300 170 T 400 150 T 500 140 T 600 120 T 700 110 T 800 100" 
                fill="none" 
                stroke="#515f74" 
                strokeDasharray="4" 
                strokeLinecap="round" 
                strokeWidth="2"
              ></path>
            </svg>
            <div className="flex justify-between w-full absolute bottom-0 left-0 px-8 transform translate-y-6 text-label-sm text-outline">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span><span>Week 5</span><span>Week 6</span>
            </div>
          </div>
        </div>

        {/* KPI Cards Side Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-primary text-on-primary rounded-xl p-stack-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-label-sm font-label-sm uppercase tracking-widest opacity-80">Total Active Assets</p>
              <h4 className="text-display font-display">1,482</h4>
              <p className="text-body-sm flex items-center gap-1 mt-2 text-white">
                <span className="material-symbols-outlined text-sm">north_east</span>
                12.5% vs last month
              </p>
            </div>
            <span className="material-symbols-outlined text-[48px] opacity-20">inventory_2</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm flex items-center justify-between">
            <div>
              <p className="text-label-sm font-label-sm uppercase tracking-widest text-outline">Operational Uptime</p>
              <h4 className="text-display font-display text-on-surface">98.2%</h4>
              <p className="text-body-sm text-primary flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-sm">verified</span>
                Target: 95.0%
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Chart: Most-Used vs Idle Assets (Bar Chart) */}
        <div className="col-span-12 md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md mb-stack-lg flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-tertiary">query_stats</span>
            Utilization: Used vs Idle
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm text-on-surface">
                <span className="font-bold">Heavy Machinery</span>
                <span className="text-outline">88% Utilized</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm text-on-surface">
                <span className="font-bold">IT Infrastructure</span>
                <span className="text-outline">62% Utilized</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm text-on-surface">
                <span className="font-bold">Fleet Vehicles</span>
                <span className="text-outline">45% Utilized</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm text-on-surface">
                <span className="font-bold">Facility Equipment</span>
                <span className="text-outline">18% Utilized</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-error/60" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart: Maintenance Frequency (Bar Chart) */}
        <div className="col-span-12 md:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md mb-stack-lg flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-on-primary-fixed-variant">build_circle</span>
            Maintenance Frequency
          </h3>
          <div className="flex items-end justify-between h-48 pt-4 gap-2">
            {[
              { month: 'Jan', h: '40%' },
              { month: 'Feb', h: '65%' },
              { month: 'Mar', h: '85%', active: true },
              { month: 'Apr', h: '55%' },
              { month: 'May', h: '45%' },
              { month: 'Jun', h: '70%' }
            ].map(m => (
              <div key={m.month} className="flex flex-col items-center flex-1 gap-2">
                <div 
                  className={`w-full rounded-t-md cursor-pointer transition-colors ${m.active ? 'bg-primary' : 'bg-surface-container-highest hover:bg-primary'}`} 
                  style={{ height: m.h }}
                ></div>
                <span className={`text-label-sm text-outline ${m.active ? 'font-bold' : ''}`}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart: Booking Heatmap (Grid Visualization) */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <div className="flex items-center justify-between mb-stack-lg">
            <h3 className="font-headline-md text-headline-md flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-secondary">calendar_view_month</span>
              Booking Heatmap
            </h3>
            <div className="flex items-center gap-2 text-label-sm text-outline">
              <span>Low</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-surface-container rounded-sm"></div>
                <div className="w-3 h-3 bg-secondary-fixed rounded-sm"></div>
                <div className="w-3 h-3 bg-secondary rounded-sm"></div>
                <div className="w-3 h-3 bg-on-secondary-fixed-variant rounded-sm"></div>
              </div>
              <span>High</span>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-1.5">
            {heatmapCells.map((intensityClass, idx) => (
              <div 
                key={idx} 
                className={`aspect-square ${intensityClass} rounded-[2px] hover:ring-2 ring-primary transition-all cursor-crosshair`}
                title="Booking Activity"
                onClick={() => alert(`Slot detail verification: Checked cell ${idx + 1}`)}
              ></div>
            ))}
          </div>
        </div>

        {/* Chart: Department-wise Allocation (Donut Chart) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md mb-stack-lg flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary">pie_chart</span>
            Department Allocation
          </h3>
          <div className="flex items-center justify-center h-64 relative">
            <svg className="w-48 h-48 -rotate-90">
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#eaedff" strokeWidth="24"></circle>
              {/* Operations: 42% -> 502 * 0.42 = 210 */}
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#004ac6" strokeDasharray="502" strokeDashoffset="150" strokeLinecap="round" strokeWidth="24"></circle>
              {/* Logistics: 28% -> 502 * 0.28 = 140 */}
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#515f74" strokeDasharray="502" strokeDashoffset="360" strokeLinecap="round" strokeWidth="24"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-headline-lg font-bold text-on-surface">100%</span>
              <span className="text-label-sm text-outline">Allocated</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-on-surface">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-body-sm font-bold">Operations</span>
              <span className="ml-auto text-body-sm text-outline">42%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-body-sm font-bold">Logistics</span>
              <span className="ml-auto text-body-sm text-outline">28%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
              <span className="text-body-sm font-bold">R&amp;D</span>
              <span className="ml-auto text-body-sm text-outline">15%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
              <span className="text-body-sm font-bold">Others</span>
              <span className="ml-auto text-body-sm text-outline">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Table Preview */}
      <div className="mt-gutter bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-stack-lg border-b border-outline-variant flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md text-on-surface">Top Performing Assets</h3>
          <button 
            onClick={() => alert('Opening detailed operational logs...')}
            className="text-primary font-body-md hover:underline flex items-center gap-1 cursor-pointer font-bold"
          >
            View Detailed Log
            <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant text-on-surface">
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">Asset ID</th>
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">Product Name</th>
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">Performance</th>
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">Uptime</th>
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">ROI Index</th>
                <th className="px-gutter py-3 text-label-sm font-label-sm text-outline uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-on-surface">
              {performingAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-surface-container transition-colors cursor-pointer group">
                  <td className="px-gutter py-4 font-label-md text-label-md">{asset.id}</td>
                  <td className="px-gutter py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-primary">{asset.icon}</span>
                      </div>
                      <span className="font-bold">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-gutter py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${asset.performance}%` }}></div>
                      </div>
                      <span className="text-body-sm font-bold">{asset.performance}%</span>
                    </div>
                  </td>
                  <td className="px-gutter py-4 text-body-sm">{asset.uptime}</td>
                  <td className={`px-gutter py-4 text-body-sm font-bold ${asset.roi.startsWith('+') ? 'text-primary' : 'text-error'}`}>
                    {asset.roi}
                  </td>
                  <td className="px-gutter py-4">
                    <span className={`px-2 py-1 rounded-full text-label-sm font-label-sm ${
                      asset.status === 'Optimal' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Credits */}
      <footer className="mt-gutter p-gutter text-center border-t border-outline-variant bg-surface-container-low text-outline">
        <p className="text-label-sm">AssetFlow ERP v2.4.0 • Built for Enterprise Efficiency</p>
      </footer>
    </div>
  );
}
