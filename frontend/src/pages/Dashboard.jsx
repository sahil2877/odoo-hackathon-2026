import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const overdueReturns = [
    {
      id: 'LAP-09842',
      holder: 'Sarah Jenkins',
      dueDate: 'Oct 12, 2026',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUBzE1oCFZDnzbTGdWDIrKcQTNnlDM4WKcin1aTj9jNsVa_9zJUY1rqHGk2ysfNsF6fgFxGN1GnU1H7AGMVPl6F48g_xPaD1y5yntAFvMWcUDT0o-CcsdHuouSMSeoWp1TfBw8lV1hgJsgHODpYI34hg3FVZKsimnldfaMvl24Fywee54GFCRQKbjPOhPW5cAYiIPLkrsV6w2ukRgiFExBMTkkKnN2k1-zWAb6f8g4YzkFcR1wSi6W-IqxcdL81ejy6kaoz2CZgbJI'
    },
    {
      id: 'MON-44211',
      holder: 'Michael Chen',
      dueDate: 'Oct 14, 2026',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc8gWWynVka8_PCfLq8QpsNVIMtDL6ks8gjKGoJBj5qXOKwHrkTbKY-5ggMtLoqq0tvzUnzZi5M2xuelEIiymG-UHaqLOlHthcx2UBS3eUM10felHj6LaUNq38lgKcRUmXcNfC7M_W3Ip0hgEItaCupPdslb5PGX3BFn0xwtJNGJpnUTp_Y7ybPExv8QVk6r6FxCpGKwN6WknOsBFKT5Izx7W_9JUbAcGYHSRU5c6b97ciagtnbs4O_rFUjJDBEIT22z-BOQ_bx5nV'
    },
    {
      id: 'ACC-22900',
      holder: 'Emily Rodriguez',
      dueDate: 'Oct 15, 2026',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQBpsQIMgk8NUM_0y-55H9-HSUq1Ll8zueDElgjgWvP3dAX3Qv2HnWcqGV_bTckDMDECNxWMWjozz6RxhKHhmkxyL5AJ09J4at8F9xll_Ptt-9IqL9-6PDZ7ZjsknRprwuvkvU6_-vi1AEHlKDDklBrK86DvDhd1jrh-sKKJCW6GMLb5IRCzIFgpWrYps_ILjUbctmkKONPhBFH5Yhuqx55Q9Ooz1cMryDMQJYdztwoUsGVaiprOF8DrJUUcIvjHJDfb7z4lSn6Y59'
    }
  ];

  const upcomingReturns = [
    { id: 'DSLR-331', holder: 'Kevin Vane', dueTime: 'Today, 4:00 PM', status: 'CONFIRMED' },
    { id: 'PROJ-992', holder: 'Lisa Ray', dueTime: 'Today, 5:30 PM', status: 'PENDING' },
    { id: 'VEH-042', holder: 'Transport Dept.', dueTime: 'Tomorrow, 9:00 AM', status: 'CONFIRMED' }
  ];

  const handleNotify = (id) => {
    alert(`Notification alert simulation: Return reminder sent for asset ${id}`);
  };

  return (
    <>
      {/* Header & Quick Actions */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-display text-on-surface">Operational Overview</h2>
          <p className="text-on-surface-variant font-body-lg text-body-lg mt-1">Monitor real-time resource distribution and maintenance schedules.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/asset-directory" className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg font-body-md text-body-md text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">add_business</span>
            Register Asset
          </Link>
          <Link to="/resource-booking" className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg font-body-md text-body-md text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Book Resource
          </Link>
          <Link to="/maintenance-management" className="bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg font-body-md text-body-md text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">engineering</span>
            Raise Maintenance
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-stack-lg">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">+2.4%</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Assets Available</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">1,284</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-secondary-container text-secondary rounded-lg">
              <span className="material-symbols-outlined">group_work</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-full">Stable</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Assets Allocated</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">842</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <span className="material-symbols-outlined">build_circle</span>
            </div>
            <span className="font-label-sm text-label-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">High</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Maintenance Today</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">12</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="material-symbols-outlined">book_online</span>
            </div>
            <span className="font-label-sm text-label-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+14%</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Active Bookings</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">45</h3>
        </div>

        {/* Card 5 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <span className="material-symbols-outlined">transfer_within_a_station</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-full">3 Queue</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Pending Transfers</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">8</h3>
        </div>

        {/* Card 6 */}
        <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow group hover:border-primary transition-colors cursor-default">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <span className="material-symbols-outlined">keyboard_return</span>
            </div>
            <span className="font-label-sm text-label-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">On Schedule</span>
          </div>
          <p className="text-on-surface-variant font-body-sm text-body-sm uppercase tracking-wider font-semibold">Upcoming Returns</p>
          <h3 className="font-display text-[28px] text-on-surface mt-1">29</h3>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Overdue Returns */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow flex flex-col">
          <div className="px-stack-lg py-4 border-b border-outline-variant flex items-center justify-between bg-error-container/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Overdue Returns</h3>
            </div>
            <span className="bg-error text-on-error font-label-md text-label-md px-2 py-0.5 rounded">6 CRITICAL</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                <tr>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Asset ID</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Holder</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Due Date</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {overdueReturns.map((asset) => (
                  <tr key={asset.id} className="hover:bg-error-container/5 transition-colors group">
                    <td className="px-stack-lg py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-surface-container-high rounded flex items-center justify-center overflow-hidden">
                          <img className="w-full h-full object-cover" alt="Asset" src={asset.image}/>
                        </div>
                        <span className="font-label-md">{asset.id}</span>
                      </div>
                    </td>
                    <td className="px-stack-lg py-4">{asset.holder}</td>
                    <td className="px-stack-lg py-4 text-error font-medium">{asset.dueDate}</td>
                    <td className="px-stack-lg py-4 text-right">
                      <button 
                        onClick={() => handleNotify(asset.id)}
                        className="text-primary hover:underline font-medium cursor-pointer"
                      >
                        Notify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 mt-auto border-t border-outline-variant text-center">
            <a className="text-primary font-medium hover:underline text-body-sm" href="#">View all 14 overdue items</a>
          </div>
        </section>

        {/* Upcoming Returns */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow flex flex-col">
          <div className="px-stack-lg py-4 border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Returns</h3>
            </div>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Next 48 Hours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md">
              <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                <tr>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Asset ID</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Holder</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider">Due Time</th>
                  <th className="px-stack-lg py-3 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {upcomingReturns.map((asset) => (
                  <tr key={asset.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-stack-lg py-4">
                      <span className="font-label-md">{asset.id}</span>
                    </td>
                    <td className="px-stack-lg py-4">{asset.holder}</td>
                    <td className="px-stack-lg py-4">{asset.dueTime}</td>
                    <td className="px-stack-lg py-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                        asset.status === 'CONFIRMED' 
                          ? 'bg-secondary-container text-on-secondary-container' 
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 mt-auto border-t border-outline-variant text-center">
            <a className="text-primary font-medium hover:underline text-body-sm" href="#">View full return schedule</a>
          </div>
        </section>
      </div>

      {/* Decorative Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="md:col-span-2 bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant card-shadow h-[300px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h4 class="font-headline-md text-headline-md text-on-surface">Asset Utilization Trend</h4>
              <p className="text-on-surface-variant font-body-sm text-body-sm">Resource efficiency over the last 30 days.</p>
            </div>
            <select className="bg-surface-container-low border border-outline-variant text-body-sm rounded-lg py-1 px-3">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          {/* Simulated Chart Background with CSS */}
          <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-between px-6 pb-4 gap-2 opacity-40 group hover:opacity-70 transition-opacity">
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '40%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '55%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '45%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '70%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '60%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '85%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '75%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '90%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '80%' }}></div>
            <div className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/40" style={{ height: '95%' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-outline/20 font-display text-[64px] font-black select-none">DATA FLOW</span>
          </div>
        </div>

        <div className="bg-primary p-stack-lg rounded-xl card-shadow relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full">
            <h4 class="font-headline-md text-headline-md text-on-primary">Need Help?</h4>
            <p className="text-on-primary-container font-body-md text-body-md mt-2">Our 24/7 support team is here to assist with enterprise-level troubleshooting.</p>
            <button 
              onClick={() => alert('Support ticket simulation: Connecting to support agent...')}
              className="mt-auto bg-on-primary text-primary font-bold py-2 px-4 rounded-lg self-start active:scale-95 transition-transform cursor-pointer"
            >
              Launch Support Chat
            </button>
          </div>
          {/* Abstract BG pattern for card */}
          <div className="absolute -right-12 -bottom-12 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
            <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'wght' 700" }}>
              support_agent
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
