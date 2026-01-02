import React, { useEffect, useState } from 'react';
import { getItems } from '../api/client';
import { Item } from '../types/inventory';
import { Package, Search, AlertCircle, Filter, ChevronRight, LayoutList, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  useEffect(() => {
    loadItems();
    const interval = setInterval(loadItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to load items", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.sku.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-96 text-muted space-y-4">
      <div className="relative">
        <Package className="w-12 h-12 animate-bounce opacity-20" />
        <div className="absolute inset-0 w-12 h-12 border-t-2 border-primary rounded-full animate-spin" />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.2em]">Synchronizing Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/20 p-4 rounded-3xl border border-border/50">
        <div className="flex items-center gap-2 px-2">
           <LayoutList className="text-primary w-5 h-5" />
           <span className="text-sm font-extrabold text-white uppercase tracking-widest">Inventory Ledger</span>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              placeholder="Search by Name or SKU..." 
              className="w-full bg-background/50 border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-white placeholder:text-muted/40"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="p-3 bg-surface/40 border border-border rounded-2xl text-muted hover:text-white transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-surface/30 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/50 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-surface/40 text-muted uppercase tracking-tighter text-[10px] font-black border-b border-border/50">
              <tr>
                <th className="px-8 py-5">Product Identity</th>
                <th className="px-8 py-5">System SKU</th>
                <th className="px-8 py-5 text-center">Availability</th>
                <th className="px-8 py-5">Unit Type</th>
                <th className="px-8 py-5 text-right w-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.tr 
                    key={item.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-primary/5 transition-all group cursor-default"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Package className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</div>
                            <div className="text-[10px] text-muted/60 font-semibold uppercase tracking-widest mt-0.5">Category: General</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-muted font-mono text-xs font-bold bg-background/20">
                      {item.sku}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-2">
                           <div className={cn(
                             "w-2 h-2 rounded-full",
                             (item.stock || 0) <= 10 ? "bg-danger animate-pulse" : "bg-secondary"
                           )} />
                           <span className={cn(
                             "text-base font-black tracking-tighter",
                             (item.stock || 0) <= 10 ? "text-danger" : "text-white"
                           )}>
                             {item.stock}
                           </span>
                        </div>
                        <div className="w-full bg-border/20 h-1 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${Math.min(((item.stock || 0) / 100) * 100, 100)}%` }}
                             className={cn(
                               "h-full rounded-full",
                               (item.stock || 0) <= 10 ? "bg-danger" : "bg-secondary"
                             )}
                           />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-muted font-bold italic lowercase group-hover:text-muted/80">
                      /{item.unit}
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 text-muted/40 hover:text-white hover:bg-surface rounded-xl transition-all">
                          <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              
              {filteredItems.length === 0 && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30 group">
                      <Search className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-sm font-black uppercase tracking-widest">Spectral Scan Finished: Zero Items Detected</p>
                      <button 
                        onClick={() => setSearch('')}
                        className="mt-4 text-xs text-primary underline underline-offset-4 hover:text-primary-hover font-bold"
                      >
                        Reset Application Filter
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Summary */}
        <div className="px-8 py-4 bg-background/20 border-t border-border/50 flex justify-between items-center text-[10px] text-muted font-bold uppercase tracking-widest leading-none">
           <div className="flex items-center gap-4">
              <span>Displaying {filteredItems.length} Entities</span>
              <div className="w-[1px] h-3 bg-border" />
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-danger" /> 3 Depleted</span>
           </div>
           <div>Refreshed Every 5.0s</div>
        </div>
      </div>
    </div>
  );
};
