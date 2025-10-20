'use client'
import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, ChevronRight, Search, Building2, Phone, Mail } from 'lucide-react';

// Mock data for multiple clients
const mockClients = [
  {
    id: 1,
    businessName: 'Elite Martial Arts Academy',
    status: 'active',
    subscription: 'premium',
    totalLeads: 42,
    newLeadsThisWeek: 8,
    activeOpportunities: 12,
    conversionRate: 32.5,
    totalRevenue: 8500,
    lastActivity: new Date('2025-10-17T14:30:00'),
    aiCalls: 156,
    emailsProcessed: 234,
    activeMemberships: 15
  },
  {
    id: 2,
    businessName: 'FitZone Gym',
    status: 'active',
    subscription: 'standard',
    totalLeads: 68,
    newLeadsThisWeek: 12,
    activeOpportunities: 18,
    conversionRate: 28.3,
    totalRevenue: 12300,
    lastActivity: new Date('2025-10-17T16:45:00'),
    aiCalls: 203,
    emailsProcessed: 412,
    activeMemberships: 22
  },
  {
    id: 3,
    businessName: 'Yoga Wellness Center',
    status: 'active',
    subscription: 'premium',
    totalLeads: 35,
    newLeadsThisWeek: 6,
    activeOpportunities: 9,
    conversionRate: 41.2,
    totalRevenue: 6200,
    lastActivity: new Date('2025-10-17T10:20:00'),
    aiCalls: 89,
    emailsProcessed: 145,
    activeMemberships: 11
  },
  {
    id: 4,
    businessName: 'CrossFit Revolution',
    status: 'active',
    subscription: 'standard',
    totalLeads: 54,
    newLeadsThisWeek: 15,
    activeOpportunities: 20,
    conversionRate: 35.8,
    totalRevenue: 15600,
    lastActivity: new Date('2025-10-17T15:10:00'),
    aiCalls: 187,
    emailsProcessed: 298,
    activeMemberships: 19
  },
  {
    id: 5,
    businessName: 'Kids Karate Academy',
    status: 'trial',
    subscription: 'trial',
    totalLeads: 18,
    newLeadsThisWeek: 4,
    activeOpportunities: 7,
    conversionRate: 22.1,
    totalRevenue: 2100,
    lastActivity: new Date('2025-10-17T09:30:00'),
    aiCalls: 45,
    emailsProcessed: 76,
    activeMemberships: 4
  },
  {
    id: 6,
    businessName: 'PowerLift Training',
    status: 'active',
    subscription: 'premium',
    totalLeads: 61,
    newLeadsThisWeek: 10,
    activeOpportunities: 16,
    conversionRate: 38.7,
    totalRevenue: 11400,
    lastActivity: new Date('2025-10-17T13:00:00'),
    aiCalls: 164,
    emailsProcessed: 287,
    activeMemberships: 18
  }
];

const mockSystemStats = {
  totalClients: 6,
  activeClients: 5,
  trialClients: 1,
  totalLeads: 278,
  totalRevenue: 56100,
  avgConversionRate: 33.1,
  totalAICalls: 844,
  totalEmailsProcessed: 1452,
  systemUptime: 99.8
};

const MasterDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);
  const [sortBy, setSortBy] = useState('revenue');

  // Filtered and sorted clients
  const filteredClients = useMemo(() => {
    let filtered = mockClients.filter(client => {
      const matchesSearch = searchQuery === '' || 
        client.businessName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    // Sort clients
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'revenue': return b.totalRevenue - a.totalRevenue;
        case 'leads': return b.totalLeads - a.totalLeads;
        case 'conversion': return b.conversionRate - a.conversionRate;
        case 'name': return a.businessName.localeCompare(b.businessName);
        default: return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterStatus, sortBy]);

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className={`text-sm flex items-center ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );

  const ClientCard = ({ client }) => (
    <div 
      onClick={() => setSelectedClient(client)}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{client.businessName}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                client.status === 'active' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'
              }`}>
                {client.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                client.subscription === 'premium' ? 'bg-blue-900/50 text-blue-300' : 'bg-slate-700 text-slate-300'
              }`}>
                {client.subscription}
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-slate-400 text-xs mb-1">Total Leads</div>
          <div className="text-white font-semibold text-lg">{client.totalLeads}</div>
          <div className="text-emerald-400 text-xs">+{client.newLeadsThisWeek} this week</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Active Opps</div>
          <div className="text-white font-semibold text-lg">{client.activeOpportunities}</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Conversion</div>
          <div className="text-white font-semibold text-lg">{client.conversionRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-400" />
          <span className="text-slate-300 text-sm">{client.aiCalls} calls</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 text-sm">{client.emailsProcessed} emails</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
        <div>
          <div className="text-slate-400 text-xs">Monthly Revenue</div>
          <div className="text-white font-bold text-xl">${client.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-slate-400 text-xs">Last Activity</div>
          <div className="text-slate-300 text-sm">{client.lastActivity.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                BattlePlan Master Dashboard
              </h1>
              <p className="text-slate-400 text-sm">System Overview & Client Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 text-sm">System Status: </span>
              <span className="text-emerald-400 text-sm font-semibold">Online</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">SA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Building2} 
            label="Total Clients" 
            value={mockSystemStats.totalClients} 
            trend={8.3}
            color="bg-blue-900/50" 
          />
          <StatCard 
            icon={Users} 
            label="Total Leads (All Clients)" 
            value={mockSystemStats.totalLeads} 
            trend={12.5}
            color="bg-amber-900/50" 
          />
          <StatCard 
            icon={DollarSign} 
            label="Total Monthly Revenue" 
            value={`$${mockSystemStats.totalRevenue.toLocaleString()}`} 
            trend={15.2}
            color="bg-emerald-900/50" 
          />
          <StatCard 
            icon={TrendingUp} 
            label="Avg Conversion Rate" 
            value={`${mockSystemStats.avgConversionRate}%`} 
            trend={3.7}
            color="bg-blue-900/50" 
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">AI Calls Processed</div>
                <div className="text-white font-bold text-2xl">{mockSystemStats.totalAICalls}</div>
              </div>
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-emerald-400 text-sm">+124 this week</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Emails Processed</div>
                <div className="text-white font-bold text-2xl">{mockSystemStats.totalEmailsProcessed}</div>
              </div>
              <Mail className="w-8 h-8 text-amber-400" />
            </div>
            <div className="text-emerald-400 text-sm">+203 this week</div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">System Uptime</div>
                <div className="text-white font-bold text-2xl">{mockSystemStats.systemUptime}%</div>
              </div>
              <Activity className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-emerald-400 text-sm">Excellent performance</div>
          </div>
        </div>

        {/* Client Management Section */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Client Accounts</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="trial">Trial Only</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="revenue">Sort by Revenue</option>
                <option value="leads">Sort by Leads</option>
                <option value="conversion">Sort by Conversion</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClients.map(client => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </div>

        {/* Client Detail Modal */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedClient(null)}>
            <div className="bg-slate-800 rounded-lg p-6 max-w-4xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-amber-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedClient.businessName}</h2>
                    <p className="text-slate-400">Client Account Details</p>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Subscription Tier</div>
                  <div className="text-white font-semibold text-lg capitalize">{selectedClient.subscription}</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Account Status</div>
                  <div className="text-white font-semibold text-lg capitalize">{selectedClient.status}</div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Active Members</div>
                  <div className="text-white font-semibold text-lg">{selectedClient.activeMemberships}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-4">Lead Generation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Leads</span>
                      <span className="text-white font-semibold">{selectedClient.totalLeads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">New This Week</span>
                      <span className="text-emerald-400 font-semibold">+{selectedClient.newLeadsThisWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Opportunities</span>
                      <span className="text-white font-semibold">{selectedClient.activeOpportunities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Conversion Rate</span>
                      <span className="text-blue-400 font-semibold">{selectedClient.conversionRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-4">AI Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Calls Handled</span>
                      <span className="text-white font-semibold">{selectedClient.aiCalls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Emails Processed</span>
                      <span className="text-white font-semibold">{selectedClient.emailsProcessed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Response Time</span>
                      <span className="text-emerald-400 font-semibold">&lt; 2 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Accuracy</span>
                      <span className="text-emerald-400 font-semibold">98.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                  View Full Dashboard
                </button>
                <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium">
                  Manage Settings
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterDashboard;
