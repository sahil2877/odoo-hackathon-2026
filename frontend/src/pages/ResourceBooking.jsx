import React, { useState } from 'react';

export default function ResourceBooking() {
  const [resource, setResource] = useState('Room B2 - Conference Wing');
  const [bookingDate, setBookingDate] = useState('2026-10-25');
  const [startTime, setStartTime] = useState('09:15');
  const [endTime, setEndTime] = useState('10:30');
  const [purpose, setPurpose] = useState('');

  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Simulation:\nRoom: ${resource}\nDate: ${bookingDate}\nTime: ${startTime} - ${endTime}\nConflict resolved automatically.`);
  };

  return (
    <div className="mt-2 flex gap-gutter">
      {/* Inject Style for Grid layout */}
      <style>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: 80px repeat(7, 1fr);
          grid-template-rows: auto repeat(12, 60px);
        }
      `}</style>

      {/* Calendar Section */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-lg text-headline-lg text-primary">Resource: Room B2</h2>
            <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded border border-outline-variant">
              <span className="material-symbols-outlined text-sm text-on-surface-variant">group</span>
              <span className="text-xs font-label-sm text-on-surface-variant">12 CAPACITY</span>
            </div>
          </div>
          <div className="flex items-center bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm overflow-hidden">
            <button className="p-2 hover:bg-surface-container transition-colors cursor-pointer" onClick={() => alert('Previous week')}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="px-4 font-bold border-x border-outline-variant text-body-md">Oct 23 - Oct 29, 2026</span>
            <button className="p-2 hover:bg-surface-container transition-colors cursor-pointer" onClick={() => alert('Next week')}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Calendar Content Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden relative">
          <div className="calendar-grid relative">
            {/* Headers */}
            <div className="h-12 border-b border-r border-outline-variant bg-surface-container-low"></div>
            {[
              { day: 'Mon', date: 23 },
              { day: 'Tue', date: 24 },
              { day: 'Wed', date: 25, active: true },
              { day: 'Thu', date: 26 },
              { day: 'Fri', date: 27 },
              { day: 'Sat', date: 28 },
              { day: 'Sun', date: 29 }
            ].map((d) => (
              <div 
                key={d.date} 
                className="h-12 border-b border-r last:border-r-0 border-outline-variant bg-surface-container-low flex flex-col items-center justify-center"
              >
                <span className="text-[10px] font-label-sm uppercase text-on-surface-variant">{d.day}</span>
                <span className={`font-bold text-body-lg ${d.active ? 'text-primary' : ''}`}>{d.date}</span>
              </div>
            ))}

            {/* Time Slots & Grid cells */}
            {hours.map((h) => (
              <React.Fragment key={h}>
                <div className="border-b border-r border-outline-variant px-2 py-4 text-right">
                  <span className="text-[10px] font-label-sm text-on-surface-variant">{h}</span>
                </div>
                {Array.from({ length: 7 }).map((_, j) => {
                  const isLast = j === 6 ? "" : "border-r";
                  return (
                    <div 
                      key={j} 
                      onClick={() => {
                        setStartTime(h);
                        const parts = h.split(':');
                        const nextHour = String(Number(parts[0]) + 1).padStart(2, '0');
                        setEndTime(`${nextHour}:00`);
                      }}
                      className={`border-b ${isLast} border-outline-variant relative group hover:bg-surface-container transition-colors cursor-pointer`}
                    ></div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* Absolute Booked Blocks */}
            {/* Monday: Completed (08:00 - 10:00) */}
            <div 
              className="absolute m-1 rounded-lg bg-tertiary-fixed-dim/45 border-l-4 border-tertiary px-3 py-2 shadow-sm z-10 flex flex-col cursor-pointer"
              style={{
                left: '80px',
                top: '48px', // Row 1 starts below header (h-12 = 48px)
                width: 'calc((100% - 80px)/7 - 8px)',
                height: '112px', // 2 hours = 120px minus padding/margin
              }}
              onClick={() => alert('Quarterly Review: Completed')}
            >
              <span className="text-[10px] font-label-sm font-bold text-tertiary uppercase mb-1">Completed</span>
              <p className="font-bold text-xs truncate">Quarterly Review</p>
              <span className="text-[10px] text-on-surface-variant">08:00 - 10:00</span>
            </div>

            {/* Wednesday: Ongoing (09:00 - 10:00) */}
            <div 
              className="absolute m-1 rounded-lg bg-primary-fixed/60 border-l-4 border-primary px-3 py-2 shadow-sm z-10 animate-pulse cursor-pointer"
              style={{
                left: 'calc(80px + ((100% - 80px)/7)*2)',
                top: '108px', // Row 2 starts at 48 + 60 = 108px
                width: 'calc((100% - 80px)/7 - 8px)',
                height: '52px',
              }}
              onClick={() => alert('Strategy Sync: Ongoing')}
            >
              <span className="text-[10px] font-label-sm font-bold text-primary uppercase mb-1">Ongoing</span>
              <p className="font-bold text-xs truncate">Strategy Sync</p>
              <span className="text-[10px] text-on-surface-variant">09:00 - 10:00</span>
            </div>

            {/* Friday: Upcoming (11:00 - 14:00) */}
            <div 
              className="absolute m-1 rounded-lg bg-secondary-fixed/50 border-l-4 border-secondary px-3 py-2 shadow-sm z-10 cursor-pointer"
              style={{
                left: 'calc(80px + ((100% - 80px)/7)*4)',
                top: '228px', // Row 4 starts at 48 + 60*3 = 228px
                width: 'calc((100% - 80px)/7 - 8px)',
                height: '172px', // 3 hours = 180px minus margin
              }}
              onClick={() => alert('Client Workshop: Upcoming')}
            >
              <span className="text-[10px] font-label-sm font-bold text-secondary uppercase mb-1">Upcoming</span>
              <p className="font-bold text-xs truncate">Client Workshop</p>
              <span className="text-[10px] text-on-surface-variant">11:00 - 14:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Booking Sidebar Panel */}
      <div className="w-[380px] space-y-gutter">
        {/* Status Reference Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <h3 className="text-xs font-label-sm uppercase text-on-surface-variant mb-4 tracking-widest">Global Status Key</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-secondary-fixed/40 rounded border border-secondary/20">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-xs font-medium">Upcoming</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 bg-primary-fixed/40 rounded border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-xs font-medium">Ongoing</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 bg-tertiary-fixed/40 rounded border border-tertiary/20">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-xs font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 bg-error-container/40 rounded border border-error/20">
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span className="text-xs font-medium">Cancelled</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-md text-headline-md">New Booking</h3>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" onClick={() => alert('Booking guidelines & info')}>
              info
            </span>
          </div>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Resource</label>
              <div className="relative">
                <select 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 appearance-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer text-body-md"
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                >
                  <option>Room B2 - Conference Wing</option>
                  <option>Room A1 - Executive</option>
                  <option>Creative Lab - L4</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Date</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary text-body-md" 
                  type="date" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-on-surface-variant">calendar_today</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Start Time</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary border-error ring-1 ring-error text-body-md" 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">End Time</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary border-error ring-1 ring-error text-body-md" 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Rejected Overlap Error */}
            <div className="flex items-start gap-2 p-3 bg-error-container text-on-error-container rounded-lg border border-error/20">
              <span className="material-symbols-outlined text-error text-xl shrink-0">error</span>
              <div className="text-xs leading-relaxed">
                <p className="font-bold">Booking Conflict</p>
                <p>This slot overlaps with an existing booking (09:00–10:00) held by Sarah Jenkins for "Strategy Sync".</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Purpose</label>
              <textarea 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary text-body-md" 
                placeholder="e.g., Weekly Team Sprint Planning" 
                rows="3"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              ></textarea>
            </div>
            <div className="pt-4 space-y-3">
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                Confirm Reservation
              </button>
              <button 
                type="button"
                onClick={() => alert('Booking saved as draft')}
                className="w-full bg-transparent text-on-surface-variant font-medium py-2 rounded-lg hover:bg-surface-container transition-all cursor-pointer"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>

        {/* Capacity Alert Card */}
        <div className="bg-surface-container/30 border border-outline-variant border-dashed rounded-xl p-stack-lg relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
              <span className="text-xs font-bold text-secondary uppercase">Asset Insight</span>
            </div>
            <p className="text-xs text-on-surface-variant">Room B2 is typically at 90% utilization on Wednesdays. Consider Room C4 for recurring morning sessions.</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-8xl">analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
