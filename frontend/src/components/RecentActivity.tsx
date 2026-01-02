import React, { useEffect, useState } from 'react';
import { getItems } from '../api/client';
import { Item, InventoryMovement } from '../types/inventory'; // Assuming movement type exists in types
import { Clock, History, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

// Helper to format date using date-fns
const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), 'MMM d, yyyy HH:mm');
  } catch {
    return dateStr;
  }
};

export const RecentActivity: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [stats, setStats] = useState({ lowStock: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const items = await getItems();
        const lowStock = items.filter(i => (i.stock || 0) <= 10).length;
        setStats({
          lowStock,
          totalItems: items.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [refreshKey]);

  return (
    <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <History className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-white">Live Metrics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background/40 p-4 rounded-xl border border-border/50">
          <div className="text-muted text-[10px] uppercase font-bold tracking-tighter mb-1">Low Stock Alerts</div>
          <div className="text-2xl font-bold text-danger">
            {loading ? '--' : stats.lowStock.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="bg-background/40 p-4 rounded-xl border border-border/50">
          <div className="text-muted text-[10px] uppercase font-bold tracking-tighter mb-1">Total SKUs</div>
          <div className="text-2xl font-bold text-secondary">
            {loading ? '--' : stats.totalItems.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-muted mt-4 text-center italic">
        Real-time metrics synchronized with backend ledger.
      </p>
    </div>
  );
};
