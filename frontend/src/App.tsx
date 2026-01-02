import React, { useState, useEffect } from 'react';
import { ItemList } from './components/ItemList';
import { CreateItemForm } from './components/CreateItemForm';
import { MovementForm } from './components/MovementForm';
import { RecentActivity } from './components/RecentActivity';
import { LayoutDashboard, Bell, Settings, User, Terminal, Package2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-text selection:bg-primary/30 font-sans">
      {/* Sidebar - Desktop Only */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 hidden lg:flex flex-col items-center py-8 border-r border-border bg-surface/20 backdrop-blur-xl z-[60]">
        <div className="bg-gradient-to-tr from-primary to-primary-hover p-2.5 rounded-2xl shadow-lg shadow-primary/20 mb-12">
          <Package2 className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex flex-col gap-8 flex-1">
          <button className="p-3 text-primary bg-primary/10 rounded-xl transition-all"><LayoutDashboard className="w-6 h-6" /></button>
          <button className="p-3 text-muted hover:text-white transition-all"><Terminal className="w-6 h-6" /></button>
          <button className="p-3 text-muted hover:text-white transition-all"><Settings className="w-6 h-6" /></button>
        </div>

        <div className="mt-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/50 to-primary/50 p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
               <User className="w-5 h-5 text-muted" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-20 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-border bg-surface/10 backdrop-blur-lg flex items-center px-8 justify-between sticky top-0 z-50">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Management Dashboard
              <span className="text-[10px] font-mono font-normal bg-secondary/10 text-secondary border border-secondary/20 px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">Live</span>
            </h1>
            <p className="text-xs text-muted font-medium uppercase tracking-tighter">
              {currentTime.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })} • {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-xs font-bold text-white">Main Kitchen Stock</span>
               <span className="text-[10px] text-muted uppercase font-bold tracking-widest text-secondary">Operational</span>
             </div>
             <div className="h-10 w-[1px] bg-border mx-2 hidden md:block" />
             <button className="relative p-2 text-muted hover:text-white transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-[#0b0f1a]" />
             </button>
          </div>
        </header>

        <main className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Stats Header / Overview Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {[
                 { label: "Inventory Health", value: "94%", detail: "↑ 2% since yesterday", color: "primary" },
                 { label: "Active SKUs", value: "128", detail: "4 Pending approval", color: "secondary" },
                 { label: "Stock Outs", value: "03", detail: "Critical attention needed", color: "danger" },
                 { label: "Daily Volume", value: "1.2k", detail: "Movements tracked今天", color: "muted" }
               ].map((stat, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-surface/30 border border-border/50 p-5 rounded-3xl backdrop-blur-sm"
                 >
                   <div className="text-[10px] text-muted uppercase font-extrabold tracking-widest mb-1">{stat.label}</div>
                   <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                   <div className={`text-[10px] font-bold ${stat.color === 'danger' ? 'text-danger' : stat.color === 'secondary' ? 'text-secondary' : 'text-muted opacity-60'}`}>{stat.detail}</div>
                 </motion.div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column - List */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <ItemList key={refreshKey} />
              </div>

              {/* Right Column - Actions */}
              <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
                <div className="flex flex-col gap-8 sticky top-28">
                  <CreateItemForm onItemCreated={handleRefresh} />
                  <MovementForm onMovementCreated={handleRefresh} />
                  <RecentActivity refreshKey={refreshKey} />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="p-8 border-t border-border mt-12 bg-surface/5">
           <div className="flex justify-between items-center text-[10px] text-muted uppercase font-bold tracking-widest">
              <span>© 2026 DineOps Systems v1.2</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Support</a>
                <a href="#" className="hover:text-primary transition-colors">Documentation</a>
              </div>
           </div>
        </footer>
      </div>
    </div>
  )
}

export default App
