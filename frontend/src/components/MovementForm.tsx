import React, { useEffect, useState, useMemo } from 'react';
import { createMovement, getItems } from '../api/client';
import { Item, MovementType } from '../types/inventory';
import { ArrowRightLeft, ArrowUpCircle, ArrowDownCircle, Loader2, RotateCcw, Search, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const MovementForm: React.FC<{onMovementCreated: () => void}> = ({ onMovementCreated }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemId, setItemId] = useState('');
  const [type, setType] = useState<MovementType>('IN');
  const [qty, setQty] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [itemSearch, setItemSearch] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setFetching(true);
    try {
      const data = await getItems();
      setItems(data);
    } finally {
      setFetching(false);
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter(i => 
      i.name.toLowerCase().includes(itemSearch.toLowerCase()) || 
      i.sku.toLowerCase().includes(itemSearch.toLowerCase())
    );
  }, [items, itemSearch]);

  const selectedItem = useMemo(() => items.find(i => i.id === itemId), [items, itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId || !qty) return;
    
    setLoading(true);
    try {
      await createMovement({
        item_id: itemId,
        movement_type: type,
        quantity: Number(qty)
      });
      setQty('');
      onMovementCreated();
    } catch (error: any) {
      if (error.response?.data?.errors?.detail) {
        alert("Error: " + error.response.data.errors.detail);
      } else {
        alert('Failed to record movement');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-surface rounded-2xl shadow-xl border border-border p-6 h-full flex flex-col relative"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <ArrowRightLeft className="w-5 h-5 text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-white">Stock Movement</h3>
        <button 
          onClick={fetchItems} 
          className="ml-auto p-1.5 hover:bg-background rounded-full text-muted transition-colors"
          title="Refresh Items"
        >
          <RotateCcw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Custom Searchable Select */}
        <div className="space-y-1.5 relative">
          <label className="text-xs uppercase text-muted font-semibold tracking-wider">Select Item</label>
          
          <div 
            className={cn(
              "w-full bg-background border border-border rounded-lg p-3 text-sm flex justify-between items-center cursor-pointer transition-all",
              isSelectOpen ? "ring-2 ring-primary/50 border-primary" : "hover:border-muted"
            )}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span className={cn(selectedItem ? "text-white" : "text-muted/60")}>
              {selectedItem ? `${selectedItem.name} (${selectedItem.sku})` : "Choose an item..."}
            </span>
            <Search className="w-4 h-4 text-muted" />
          </div>

          <AnimatePresence>
            {isSelectOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsSelectOpen(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-20 top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden max-h-64 flex flex-col"
                >
                  <div className="p-2 border-b border-border">
                    <input 
                      autoFocus
                      placeholder="Search items..."
                      className="w-full bg-background border border-border rounded-md px-3 py-1.5 text-xs text-white outline-none focus:border-primary"
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="overflow-y-auto">
                    {filteredItems.length === 0 ? (
                      <div className="p-4 text-center text-xs text-muted">No items found</div>
                    ) : (
                      filteredItems.map(item => (
                        <div 
                          key={item.id}
                          className={cn(
                            "px-4 py-2.5 text-sm cursor-pointer border-l-2 flex justify-between items-center transition-all",
                            itemId === item.id 
                              ? "bg-primary/10 border-primary text-white" 
                              : "border-transparent text-muted hover:bg-background hover:text-white"
                          )}
                          onClick={() => {
                            setItemId(item.id);
                            setIsSelectOpen(false);
                            setItemSearch('');
                          }}
                        >
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-[10px] text-muted/60 font-mono uppercase">{item.sku} • {item.stock} {item.unit}</div>
                          </div>
                          {itemId === item.id && <Check className="w-4 h-4 text-primary" />}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        <div className="grid grid-cols-2 gap-2 p-1 bg-background rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setType('IN')}
            className={cn(
              "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
              type === 'IN' ? "bg-secondary text-white shadow-lg" : "text-muted hover:text-white hover:bg-surface"
            )}
          >
            <ArrowUpCircle className="w-4 h-4" /> IN
          </button>
          <button
            type="button"
            onClick={() => setType('OUT')}
            className={cn(
              "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all",
              type === 'OUT' ? "bg-danger text-white shadow-lg" : "text-muted hover:text-white hover:bg-surface"
            )}
          >
             <ArrowDownCircle className="w-4 h-4" /> OUT
          </button>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase text-muted font-semibold tracking-wider">Quantity</label>
          <div className="relative">
            <input 
              type="number" 
              placeholder="0.00" 
              value={qty}
              onChange={e => setQty(e.target.value)}
              min="1"
              required
              className="w-full bg-background border border-border rounded-lg p-3 text-lg font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white outline-none"
            />
            {selectedItem && (
               <span className="absolute right-4 top-4 text-muted text-sm">{selectedItem.unit}</span>
            )}
          </div>
          {selectedItem && type === 'OUT' && (
            <div className="flex justify-between text-[10px] px-1">
              <span className="text-muted/60 uppercase font-semibold">Projected Stock:</span>
              <span className={cn(
                "font-bold",
                (selectedItem.stock || 0) - Number(qty) < 0 ? "text-danger" : "text-secondary"
              )}>
                {(selectedItem.stock || 0) - Number(qty)} {selectedItem.unit}
              </span>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading || !itemId || !qty}
          className={cn(
            "w-full mt-4 font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
            type === 'IN' ? "bg-secondary hover:bg-secondary/90 text-white shadow-secondary/25" : "bg-danger hover:bg-danger/90 text-white shadow-danger/25"
          )}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (type === 'IN' ? 'Add Stock' : 'Remove Stock')}
        </button>
      </form>
    </motion.div>
  );
};
