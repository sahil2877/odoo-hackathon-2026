import React, { useState } from 'react';

export default function MaintenanceManagement() {
  const [showModal, setShowModal] = useState(false);
  const [assetName, setAssetName] = useState('Server Rack 4A');
  const [description, setDescription] = useState('');
  const [modalPriority, setModalPriority] = useState('MED');

  const [cards, setCards] = useState({
    pending: [
      {
        id: '#REQ-8921',
        title: 'Server Rack 4A',
        desc: 'Cooling unit failure reported in main data center. Temperature rising rapidly.',
        priority: 'High',
        time: '2h ago',
        initials: 'JD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdGfJhoovITkfRhEQeCMOt_kkOoq7ds8SJj7dvkNYKlYgVXHWKtwfGzjb1nhXdVhcmw9bnuW3qVARz1i3S9L8CAHsjWoaQ3TJu0oMHfnFw70xDJcmt2ZZPHvG5XUQfn-WkAZ5X_FzbHEchWptv8BJZHgGuxTpUF6WY-LrNgVuieNVbumUOvITIKC4ru-6aVd9iaHtUbwWmeROGGqPNk0pXVUD0fw1Kolgp4n5ikTykzKEXECdiVjO0qZFPzEDPAOP13C0hlSt5obkH'
      },
      {
        id: '#REQ-8925',
        title: 'Executive Desk C4',
        desc: 'Ergonomic adjustment lever broken on Herman Miller chair.',
        priority: 'Low',
        time: '5h ago',
        initials: 'MK'
      }
    ],
    approved: [
      {
        id: '#REQ-8890',
        title: 'Konica Minolta Bizhub',
        desc: 'Paper jam in finisher unit. Requires replacement roller kit.',
        priority: 'Medium',
        time: 'Yesterday',
        action: 'Assign Tech',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMjoep6JqjBmnSapspnePsKdl0N2qT1eAGLSBPZKz0MwtVTrIeKfnZxV4h90_a1aYDCb1WZwiGk_FPFQKI-oZ5sjQOyCknv7LyScCLq42rKjQHA_GwUzBtqV7hlupr_lDIBCGSdPwvIBxZK3rAvadzXkLELpoau-qqKqEblRhrWxZ1oilhgFLrfXGqBYvP0VniP3VPmZHaklx8GMlIN-ViYDPgKFhH4Ol0kObAO8nwSL9IUoKQfU-Tp9OWdNx6CBTL18-aXjcnNK8e'
      }
    ],
    assigned: [
      {
        id: '#REQ-8762',
        title: 'Forklift Model-X',
        desc: 'Hydraulic leak detected near main lift cylinder. Safety lockout initiated.',
        priority: 'High',
        time: 'ETA: 1h',
        techName: 'Alex Rivera',
        techAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgiIVGTizJqIxEIcmgz5ZU56utuIvJXyKN-ki3f7lyMfgbXqd-jafM6lKlTvQQZc8EAAcKkT2ykKkjIGy0euJWaKFtAAb-z86efn9aBmBSUBzOXVqoj3NQYl3GQFW59JvwbRL5ZoaYyEG2s2tndkNRbSAKWNlXApRyB9GhlqerM6HQlvG1lDChaxCjjnID0qSwfwSlMjKVkdfL1pYtKFJYqRz6EMbi6gg32MrI0ZrJBbSyl3mpl6m1SzwR6ImBLy_ner-hWb_dkJaN'
      }
    ],
    inProgress: [
      {
        id: '#REQ-8700',
        title: 'Conference AV System',
        desc: 'Firmware update failing on Room 201 Controller.',
        priority: 'Medium',
        progress: '65%',
        techName: 'Sarah Chen',
        techAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0-GWJUVGTuHq2VJNbRD04QjF0Dq7eAppRe17H2xP6Y4JrgrSuGKsI0AWDtEz9nCPCaVrW8qsg_bfqOEOcquq6dRE70Z1tbKkegg01SNKv-OSNSybCdE5a-AnF6cgJ-p8OkSYKve4UJ7OzCR6qQIqxzuQbJ1-qEKx5C-KQxfbyQc3vM3PLSvkJd5CEYlG6DPIAvLRMSz8d8vjkzhjl4-ga5NPppBFMuvj9NGYPoXkMUbqoSXgF16HQPq5rrpBpBzvb4FLdLBkvVe3N'
      }
    ],
    resolved: [
      {
        id: '#REQ-8610',
        title: 'Lighting - Zone B',
        desc: 'LED panel flickering in hallway. Driver replaced.',
        priority: 'Low',
        time: '2 days ago',
        status: 'Done'
      }
    ]
  });

  const getPriorityStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error bg-error-container/20';
      case 'medium':
        return 'text-primary bg-secondary-fixed';
      case 'low':
        return 'text-tertiary bg-tertiary-fixed';
      default:
        return 'text-outline bg-surface-container';
    }
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const newCard = {
      id: `#REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: assetName,
      desc: description || 'No description provided.',
      priority: modalPriority === 'LOW' ? 'Low' : modalPriority === 'MED' ? 'Medium' : 'High',
      time: 'Just now',
      initials: 'JD'
    };

    setCards(prev => ({
      ...prev,
      pending: [newCard, ...prev.pending]
    }));

    setShowModal(false);
    setDescription('');
    alert(`Maintenance request ${newCard.id} successfully created!`);
  };

  return (
    <div className="mt-2 flex-1 flex flex-col h-[calc(100vh-var(--spacing-topbar-height)-var(--spacing-gutter)*2)]">
      <style>{`
        .kanban-column {
          min-width: 290px;
          max-width: 320px;
          width: 320px;
        }
      `}</style>

      {/* Page header controls are handled locally */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h2 className="font-display text-display text-on-surface">Maintenance Board</h2>
          <p className="text-on-surface-variant font-body-sm text-body-sm mt-1">Manage infrastructure upkeep requests, approvals, and technician dispatches.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md font-semibold flex items-center gap-2 hover:bg-primary/95 transition-colors active:scale-95 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Raise Request
        </button>
      </div>

      <div className="flex-1 flex gap-gutter pb-4 overflow-x-auto">
        {/* Column: Pending */}
        <div className="kanban-column flex flex-col h-full bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              Pending
              <span className="text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                {cards.pending.length}
              </span>
            </h3>
            <button className="text-outline hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cards.pending.map(card => (
              <div key={card.id} className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-label-sm uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityStyle(card.priority)}`}>
                    {card.priority}
                  </span>
                  <span className="text-label-sm font-label-md text-outline">{card.id}</span>
                </div>
                <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors">{card.title}</h4>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">{card.desc}</p>
                {card.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                    <img className="w-full h-full object-cover" alt="issue visual" src={card.image}/>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-surface-container-lowest bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-primary">
                      {card.initials}
                    </div>
                  </div>
                  <span className="text-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {card.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Approved */}
        <div className="kanban-column flex flex-col h-full bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              Approved
              <span className="text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                {cards.approved.length}
              </span>
            </h3>
            <button className="text-outline hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cards.approved.map(card => (
              <div key={card.id} className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-label-sm uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityStyle(card.priority)}`}>
                    {card.priority}
                  </span>
                  <span className="text-label-sm font-label-md text-outline">{card.id}</span>
                </div>
                <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors">{card.title}</h4>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">{card.desc}</p>
                {card.image && (
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                    <img className="w-full h-full object-cover" alt="issue visual" src={card.image}/>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span 
                    onClick={() => alert(`Assigning technician for ${card.id}`)}
                    className="text-body-sm text-primary font-medium flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {card.action}
                  </span>
                  <span className="text-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {card.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Technician Assigned */}
        <div className="kanban-column flex flex-col h-full bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              Assigned
              <span className="text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                {cards.assigned.length}
              </span>
            </h3>
            <button className="text-outline hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cards.assigned.map(card => (
              <div key={card.id} className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-primary">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-label-sm uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityStyle(card.priority)}`}>
                    {card.priority}
                  </span>
                  <span className="text-label-sm font-label-md text-outline">{card.id}</span>
                </div>
                <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors">{card.title}</h4>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">{card.desc}</p>
                {card.techName && (
                  <div className="flex items-center gap-2 p-2 bg-surface-container rounded-lg mb-3">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-outline-variant">
                      <img className="w-full h-full object-cover" alt="technician" src={card.techAvatar}/>
                    </div>
                    <span className="text-body-sm font-medium">{card.techName}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    {card.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: In Progress */}
        <div className="kanban-column flex flex-col h-full bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/40">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              In Progress
              <span className="text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                {cards.inProgress.length}
              </span>
            </h3>
            <button className="text-outline hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cards.inProgress.map(card => (
              <div key={card.id} className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-label-sm uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityStyle(card.priority)}`}>
                    {card.priority}
                  </span>
                  <span className="text-label-sm font-label-md text-outline">{card.id}</span>
                </div>
                <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors">{card.title}</h4>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">{card.desc}</p>
                {card.progress && (
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-3">
                    <div className="w-2/3 h-full bg-primary rounded-full transition-all duration-1000"></div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  {card.techName && (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-outline-variant">
                        <img className="w-full h-full object-cover" alt="technician" src={card.techAvatar}/>
                      </div>
                      <span className="text-body-sm font-medium">{card.techName}</span>
                    </div>
                  )}
                  <span className="text-body-sm text-primary font-medium">{card.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column: Resolved */}
        <div className="kanban-column flex flex-col h-full bg-surface-container-low/40 p-3 rounded-xl border border-outline-variant/40 opacity-70">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              Resolved
              <span className="text-label-md bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
                {cards.resolved.length}
              </span>
            </h3>
            <button className="text-outline hover:text-primary transition-colors cursor-pointer"><span className="material-symbols-outlined">more_horiz</span></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cards.resolved.map(card => (
              <div key={card.id} className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all cursor-pointer group grayscale">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-label-sm uppercase tracking-wider font-bold px-2 py-1 rounded ${getPriorityStyle(card.priority)}`}>
                    {card.priority}
                  </span>
                  <span className="text-label-sm font-label-md text-outline">{card.id}</span>
                </div>
                <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors">{card.title}</h4>
                <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">{card.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Done
                  </span>
                  <span className="text-body-sm text-outline">{card.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Raise Request */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-surface-container-lowest w-full max-w-lg mx-4 rounded-xl shadow-2xl relative z-10 overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
              <h2 className="font-headline-md text-on-surface">Raise Maintenance Request</h2>
              <button 
                className="p-1 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer" 
                onClick={() => setShowModal(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateRequest} className="p-6 space-y-5">
              <div className="space-y-1">
                <label className="text-body-sm font-semibold text-on-surface-variant ml-1">Asset Selector</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                  >
                    <option value="Server Rack 4A">Server Rack 4A</option>
                    <option value="Herman Miller Desk Chair">Herman Miller Desk Chair</option>
                    <option value="Konica Printer 02">Konica Printer 02</option>
                    <option value="Cisco Switch A-11">Cisco Switch A-11</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-body-sm font-semibold text-on-surface-variant ml-1">Issue Description</label>
                <textarea 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none" 
                  placeholder="Describe the problem in detail..." 
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-body-sm font-semibold text-on-surface-variant ml-1">Priority</label>
                  <div className="flex gap-2">
                    {['LOW', 'MED', 'HIGH'].map(p => (
                      <button 
                        key={p}
                        className={`flex-1 py-2 text-label-sm border rounded-lg text-center font-bold cursor-pointer transition-all ${
                          modalPriority === p 
                            ? 'border-primary bg-primary-fixed text-primary' 
                            : 'border-outline-variant hover:bg-surface-container-high'
                        }`} 
                        type="button"
                        onClick={() => setModalPriority(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-body-sm font-semibold text-on-surface-variant ml-1">Upload Photo (Optional)</label>
                  <label className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-dashed border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-outline">add_a_photo</span>
                    <span className="text-body-sm text-outline">Add Image</span>
                    <input className="hidden" type="file" onChange={() => alert('Photo upload simulated.')}/>
                  </label>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  className="flex-1 py-2.5 border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer" 
                  onClick={() => setShowModal(false)} 
                  type="button"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary/95 transition-colors shadow-sm cursor-pointer" 
                  type="submit"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
