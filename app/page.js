'use client'
import React, { useState, useMemo } from 'react';
import { BarChart3, Mail, Phone, Users, TrendingUp, Calendar, Bell, Search, Filter, Plus, ChevronRight, MessageSquare, CheckCircle2, Clock, AlertCircle, ChevronLeft } from 'lucide-react';

// Mock Data
const mockCommunications = [
  {
    id: 1,
    type: 'email',
    senderName: 'Sarah Thompson',
    senderEmail: 'sarah.thompson@email.com',
    phone: '555-0123',
    intent: 'Kids Program Inquiry',
    summary: 'Interested in trial class for child next week',
    messageText: "Hi, I'm interested in trying a class for my son. Do you have openings next week?",
    status: 'new',
    timestamp: new Date('2025-10-16T14:30:00'),
    clientId: 1
  },
  {
    id: 2,
    type: 'call',
    senderName: 'Mike Rodriguez',
    senderEmail: 'mike.r@email.com',
    phone: '555-0456',
    intent: 'Membership Inquiry',
    summary: 'Asked about adult BJJ classes and pricing',
    messageText: 'Called to inquire about Brazilian Jiu-Jitsu classes for beginners. Interested in monthly membership.',
    status: 'contacted',
    timestamp: new Date('2025-10-16T10:15:00'),
    clientId: 1
  },
  {
    id: 3,
    type: 'email',
    senderName: 'Jennifer Lee',
    senderEmail: 'jlee@business.com',
    phone: '555-0789',
    intent: 'Trial Booking',
    summary: 'Wants to schedule trial for Saturday morning',
    messageText: 'I would like to book a trial class for this Saturday morning if possible. What times do you have available?',
    status: 'scheduled',
    timestamp: new Date('2025-10-15T16:45:00'),
    clientId: 1
  },
  {
    id: 4,
    type: 'call',
    senderName: 'David Chen',
    senderEmail: 'dchen@email.com',
    phone: '555-0321',
    intent: 'Follow-up',
    summary: 'Previous member asking about returning',
    messageText: 'Former member calling to ask about rejoining. Had to take break due to work schedule.',
    status: 'new',
    timestamp: new Date('2025-10-17T09:20:00'),
    clientId: 1
  }
];

const mockOpportunities = [
  {
    id: 1,
    leadName: 'Sarah Thompson',
    contactInfo: 'sarah.thompson@email.com | 555-0123',
    source: 'email',
    stage: 'new',
    intent: 'Kids Program Inquiry',
    notes: 'Interested in trial class for child',
    assignedTo: 'Staff Member',
    createdAt: new Date('2025-10-16T14:30:00'),
    value: 150
  },
  {
    id: 2,
    leadName: 'Mike Rodriguez',
    contactInfo: 'mike.r@email.com | 555-0456',
    source: 'call',
    stage: 'trial',
    intent: 'Membership Inquiry',
    notes: 'Trial scheduled for Oct 18th',
    assignedTo: 'Staff Member',
    createdAt: new Date('2025-10-16T10:15:00'),
    value: 200
  },
  {
    id: 3,
    leadName: 'Jennifer Lee',
    contactInfo: 'jlee@business.com | 555-0789',
    source: 'email',
    stage: 'pending',
    intent: 'Trial Booking',
    notes: 'Completed trial, waiting for decision',
    assignedTo: 'Manager',
    createdAt: new Date('2025-10-15T16:45:00'),
    value: 180
  },
  {
    id: 4,
    leadName: 'David Chen',
    contactInfo: 'dchen@email.com | 555-0321',
    source: 'call',
    stage: 'active',
    intent: 'Returning Member',
    notes: 'Signed up for 3-month membership',
    assignedTo: 'Manager',
    createdAt: new Date('2025-10-17T09:20:00'),
    value: 300
  }
];

const mockTasks = [
  {
    id: 1,
    title: 'Call Sarah Thompson',
    description: 'Confirm trial class schedule for her son',
    dueDate: new Date('2025-10-18T10:00:00'),
    status: 'pending',
    linkedOpportunityId: 1,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Send membership info to Mike',
    description: 'Email pricing and class schedule details',
    dueDate: new Date('2025-10-17T15:00:00'),
    status: 'pending',
    linkedOpportunityId: 2,
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Follow up with Jennifer',
    description: 'Check if ready to commit to membership',
    dueDate: new Date('2025-10-17T14:00:00'),
    status: 'completed',
    linkedOpportunityId: 3,
    priority: 'high'
  }
];

const mockCalendarEvents = [
  {
    id: 1,
    title: 'Sarah Thompson - Trial Class',
    type: 'booking',
    leadId: 1,
    date: new Date('2025-10-18T10:00:00'),
    duration: 60,
    description: 'Kids program trial class'
  },
  {
    id: 2,
    title: 'Mike Rodriguez - Trial Session',
    type: 'booking',
    leadId: 2,
    date: new Date('2025-10-18T14:00:00'),
    duration: 60,
    description: 'Adult BJJ trial'
  },
  {
    id: 3,
    title: 'Follow up call - Jennifer Lee',
    type: 'task',
    leadId: 3,
    date: new Date('2025-10-17T14:00:00'),
    duration: 30,
    description: 'Check membership decision'
  },
  {
    id: 4,
    title: 'New inquiry call',
    type: 'call',
    date: new Date('2025-10-17T11:00:00'),
    duration: 15,
    description: 'Initial contact with prospect'
  },
  {
    id: 5,
    title: 'David Chen - Consultation',
    type: 'booking',
    leadId: 4,
    date: new Date('2025-10-19T16:00:00'),
    duration: 45,
    description: 'Discuss membership options'
  },
  {
    id: 6,
    title: 'Team Meeting',
    type: 'task',
    date: new Date('2025-10-20T09:00:00'),
    duration: 60,
    description: 'Weekly team sync'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedComm, setSelectedComm] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 17)); // Oct 17, 2025
  const [calendarView, setCalendarView] = useState('month'); // 'month' or 'week'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  // Stats calculations
  const stats = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const newLeads = mockCommunications.filter(c => c.timestamp > weekAgo).length;
    const emailCount = mockCommunications.filter(c => c.type === 'email').length;
    const callCount = mockCommunications.filter(c => c.type === 'call').length;
    const activeOpps = mockOpportunities.filter(o => o.stage !== 'active').length;
    const conversionRate = ((mockOpportunities.filter(o => o.stage === 'active').length / mockOpportunities.length) * 100).toFixed(1);
    const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;

    return { newLeads, emailCount, callCount, activeOpps, conversionRate, pendingTasks };
  }, []);

  // Filtered communications
  const filteredComms = useMemo(() => {
    return mockCommunications.filter(comm => {
      const matchesType = filterType === 'all' || comm.type === filterType;
      const matchesSearch = searchQuery === '' || 
        comm.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.intent.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [filterType, searchQuery]);

  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date) => {
    return mockCalendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getWeekDays = (date) => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-emerald-400 text-sm flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );

  const CommunicationCard = ({ comm }) => (
    <div 
      className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
      onClick={() => setSelectedComm(comm)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${comm.type === 'email' ? 'bg-blue-900/50' : 'bg-emerald-900/50'}`}>
            {comm.type === 'email' ? <Mail className="w-4 h-4 text-blue-400" /> : <Phone className="w-4 h-4 text-emerald-400" />}
          </div>
          <div>
            <h3 className="text-white font-semibold">{comm.senderName}</h3>
            <p className="text-slate-400 text-sm">{comm.senderEmail}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          comm.status === 'new' ? 'bg-amber-900/50 text-amber-300' :
          comm.status === 'contacted' ? 'bg-blue-900/50 text-blue-300' :
          'bg-emerald-900/50 text-emerald-300'
        }`}>
          {comm.status}
        </span>
      </div>
      <div className="mb-3">
        <span className="text-amber-400 text-sm font-medium">{comm.intent}</span>
        <p className="text-slate-300 text-sm mt-1">{comm.summary}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{comm.timestamp.toLocaleString()}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );

  const OpportunityColumn = ({ stage, title, opportunities }) => {
    const stageOpps = opportunities.filter(o => o.stage === stage);
    return (
      <div className="flex-1 min-w-[280px]">
        <div className="bg-slate-800 rounded-lg p-4 mb-3 border border-slate-700">
          <h3 className="text-white font-semibold flex items-center justify-between">
            {title}
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{stageOpps.length}</span>
          </h3>
        </div>
        <div className="space-y-3">
          {stageOpps.map(opp => (
            <div key={opp.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold">{opp.leadName}</h4>
                <span className={`p-1 rounded ${opp.source === 'email' ? 'bg-blue-900/50' : 'bg-emerald-900/50'}`}>
                  {opp.source === 'email' ? <Mail className="w-3 h-3 text-blue-400" /> : <Phone className="w-3 h-3 text-emerald-400" />}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-2">{opp.contactInfo}</p>
              <p className="text-amber-400 text-xs font-medium mb-2">{opp.intent}</p>
              <p className="text-slate-300 text-xs mb-3">{opp.notes}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">${opp.value}</span>
                <span className="text-slate-500">{opp.assignedTo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CalendarMonthView = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-slate-800/50 border border-slate-700/50" />);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const events = getEventsForDate(date);
      const isToday = date.toDateString() === new Date(2025, 9, 17).toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`min-h-[120px] bg-slate-800 border border-slate-700 p-2 hover:border-blue-500 transition-all ${isToday ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-blue-400' : 'text-slate-300'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 3).map(event => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`text-xs p-1 rounded cursor-pointer truncate ${
                  event.type === 'booking' ? 'bg-blue-900/50 text-blue-300 hover:bg-blue-900' :
                  event.type === 'call' ? 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900' :
                  'bg-amber-900/50 text-amber-300 hover:bg-amber-900'
                }`}
              >
                {new Date(event.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} {event.title}
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-slate-500 pl-1">+{events.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-px bg-slate-700">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-slate-800 p-3 text-center text-sm font-semibold text-slate-300 border border-slate-700">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const CalendarWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex border border-slate-700 rounded-lg overflow-hidden">
        <div className="w-20 bg-slate-800 border-r border-slate-700">
          <div className="h-16 border-b border-slate-700" />
          {hours.map(hour => (
            <div key={hour} className="h-16 border-b border-slate-700 flex items-start justify-end pr-2 text-xs text-slate-500">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((day, idx) => {
            const isToday = day.toDateString() === new Date(2025, 9, 17).toDateString();
            return (
              <div key={idx} className="border-r border-slate-700 last:border-r-0">
                <div className={`h-16 border-b border-slate-700 p-2 text-center ${isToday ? 'bg-blue-900/30' : 'bg-slate-800'}`}>
                  <div className="text-xs text-slate-400">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className={`text-lg font-semibold ${isToday ? 'text-blue-400' : 'text-white'}`}>
                    {day.getDate()}
                  </div>
                </div>
                <div className="relative">
                  {hours.map(hour => (
                    <div key={hour} className="h-16 border-b border-slate-700 bg-slate-800" />
                  ))}
                  {getEventsForDate(day).map(event => {
                    const eventHour = new Date(event.date).getHours();
                    const eventMinute = new Date(event.date).getMinutes();
                    const topPosition = (eventHour * 64) + (eventMinute / 60 * 64);
                    const height = (event.duration / 60) * 64;
                    
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        style={{ top: `${topPosition}px`, height: `${height}px` }}
                        className={`absolute left-1 right-1 rounded p-1 text-xs cursor-pointer overflow-hidden ${
                          event.type === 'booking' ? 'bg-blue-600 text-white' :
                          event.type === 'call' ? 'bg-emerald-600 text-white' :
                          'bg-amber-600 text-white'
                        }`}
                      >
                        <div className="font-semibold truncate">{event.title}</div>
                        <div className="text-xs opacity-90">{event.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard icon={Users} label="New Leads This Week" value={stats.newLeads} color="bg-blue-900/50" trend="+12%" />
              <StatCard icon={Mail} label="Emails Received" value={stats.emailCount} color="bg-blue-900/50" trend="+8%" />
              <StatCard icon={Phone} label="AI Calls Logged" value={stats.callCount} color="bg-emerald-900/50" trend="+15%" />
              <StatCard icon={TrendingUp} label="Active Opportunities" value={stats.activeOpps} color="bg-amber-900/50" />
              <StatCard icon={CheckCircle2} label="Conversion Rate" value={`${stats.conversionRate}%`} color="bg-emerald-900/50" trend="+5%" />
              <StatCard icon={Clock} label="Pending Follow-Ups" value={stats.pendingTasks} color="bg-amber-900/50" />
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Recent Communications</h2>
              <div className="space-y-3">
                {mockCommunications.slice(0, 3).map(comm => (
                  <CommunicationCard key={comm.id} comm={comm} />
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Upcoming Tasks</h2>
              <div className="space-y-3">
                {mockTasks.filter(t => t.status === 'pending').map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      <div>
                        <h4 className="text-white font-medium">{task.title}</h4>
                        <p className="text-slate-400 text-sm">{task.description}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">{task.dueDate.toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'communications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Communications</h1>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email Only</option>
                  <option value="call">Calls Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredComms.map(comm => (
                <CommunicationCard key={comm.id} comm={comm} />
              ))}
            </div>

            {selectedComm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedComm(null)}>
                <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full border border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Communication Details</h2>
                    <button onClick={() => setSelectedComm(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-400 text-sm">Name</label>
                      <p className="text-white">{selectedComm.senderName}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Contact</label>
                      <p className="text-white">{selectedComm.senderEmail} | {selectedComm.phone}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Intent</label>
                      <p className="text-amber-400">{selectedComm.intent}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Full Message</label>
                      <p className="text-slate-300 bg-slate-900 p-4 rounded-lg">{selectedComm.messageText}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'opportunities':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Opportunities Pipeline</h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Opportunity
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              <OpportunityColumn stage="new" title="New Inquiry" opportunities={mockOpportunities} />
              <OpportunityColumn stage="trial" title="Trial Scheduled" opportunities={mockOpportunities} />
              <OpportunityColumn stage="pending" title="Pending Decision" opportunities={mockOpportunities} />
              <OpportunityColumn stage="active" title="Active Member" opportunities={mockOpportunities} />
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">Calendar</h1>
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
                  <button
                    onClick={() => setCalendarView('month')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      calendarView === 'month' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setCalendarView('week')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                      calendarView === 'week' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Week
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-800 rounded-lg border border-slate-700">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      if (calendarView === 'month') {
                        newDate.setMonth(newDate.getMonth() - 1);
                      } else {
                        newDate.setDate(newDate.getDate() - 7);
                      }
                      setCurrentDate(newDate);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 text-white font-semibold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      if (calendarView === 'month') {
                        newDate.setMonth(newDate.getMonth() + 1);
                      } else {
                        newDate.setDate(newDate.getDate() + 7);
                      }
                      setCurrentDate(newDate);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => setCurrentDate(new Date(2025, 9, 17))}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700"
                >
                  Today
                </button>
                <button
                  onClick={() => setShowNewEventModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Event
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-slate-300 text-sm">Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                <span className="text-slate-300 text-sm">Calls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-600 rounded"></div>
                <span className="text-slate-300 text-sm">Tasks</span>
              </div>
            </div>

            {/* Calendar View */}
            {calendarView === 'month' ? <CalendarMonthView /> : <CalendarWeekView />}

            {/* Event Details Modal */}
            {selectedEvent && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
                <div className="bg-slate-800 rounded-lg p-6 max-w-lg w-full border border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Event Details</h2>
                    <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-400 text-sm">Title</label>
                      <p className="text-white font-semibold">{selectedEvent.title}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Type</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                        selectedEvent.type === 'booking' ? 'bg-blue-900/50 text-blue-300' :
                        selectedEvent.type === 'call' ? 'bg-emerald-900/50 text-emerald-300' :
                        'bg-amber-900/50 text-amber-300'
                      }`}>
                        {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Date & Time</label>
                      <p className="text-white">{new Date(selectedEvent.date).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Duration</label>
                      <p className="text-white">{selectedEvent.duration} minutes</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Description</label>
                      <p className="text-slate-300">{selectedEvent.description}</p>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Edit Event
                      </button>
                      <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
                        Delete Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* New Event Modal */}
            {showNewEventModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowNewEventModal(false)}>
                <div className="bg-slate-800 rounded-lg p-6 max-w-lg w-full border border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Create New Event</h2>
                    <button onClick={() => setShowNewEventModal(false)} className="text-slate-400 hover:text-white text-2xl">×</button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Event Title</label>
                      <input
                        type="text"
                        placeholder="Enter event title"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Event Type</label>
                      <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                        <option value="booking">Booking</option>
                        <option value="call">Call</option>
                        <option value="task">Task</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-400 text-sm block mb-2">Date</label>
                        <input
                          type="date"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 text-sm block mb-2">Time</label>
                        <input
                          type="time"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Duration (minutes)</label>
                      <input
                        type="number"
                        placeholder="60"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Lead (Optional)</label>
                      <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                        <option value="">Select a lead</option>
                        {mockOpportunities.map(opp => (
                          <option key={opp.id} value={opp.id}>{opp.leadName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm block mb-2">Description</label>
                      <textarea
                        placeholder="Event description"
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Create Event
                      </button>
                      <button
                        onClick={() => setShowNewEventModal(false)}
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Tasks & Follow-Ups</h1>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Task
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-lg font-semibold text-white mb-4">Pending Tasks</h2>
                <div className="space-y-3">
                  {mockTasks.filter(t => t.status === 'pending').map(task => (
                    <div key={task.id} className="bg-slate-900 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium">{task.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          task.priority === 'high' ? 'bg-amber-900/50 text-amber-300' : 'bg-blue-900/50 text-blue-300'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{task.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {task.dueDate.toLocaleDateString()}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300">Mark Complete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h2 className="text-lg font-semibold text-white mb-4">Completed Tasks</h2>
                <div className="space-y-3">
                  {mockTasks.filter(t => t.status === 'completed').map(task => (
                    <div key={task.id} className="bg-slate-900 rounded-lg p-4 opacity-60">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium line-through">{task.title}</h3>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-slate-400 text-sm">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">BattlePlan</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-700 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">A</span>
              </div>
              <span className="text-sm">Admin User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'communications', icon: MessageSquare, label: 'Communications' },
              { id: 'opportunities', icon: Users, label: 'Opportunities' },
              { id: 'calendar', icon: Calendar, label: 'Calendar' },
              { id: 'tasks', icon: CheckCircle2, label: 'Tasks' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
