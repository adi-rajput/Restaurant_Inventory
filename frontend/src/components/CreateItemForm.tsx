import React, { useState } from 'react';
import { createItem } from '../api/client';
import { CreateItemDTO, Unit } from '../types/inventory';
import { Plus, Loader2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export const CreateItemForm: React.FC<{onItemCreated: () => void}> = ({ onItemCreated }) => {
  const [form, setForm] = useState<CreateItemDTO>({
    name: '',
    sku: '',
    unit: 'pcs'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem(form);
      setForm({ name: '', sku: '', unit: 'pcs' });
      onItemCreated();
    } catch (error) {
      alert('Error creating item (SKU might be duplicate)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface rounded-2xl shadow-xl border border-border p-6 h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Create New Item</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase text-muted font-semibold tracking-wider">Item Name</label>
            <input 
              placeholder="e.g. Tomato Sauce" 
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
              className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-muted/40 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase text-muted font-semibold tracking-wider">SKU Code</label>
              <input 
                placeholder="SAUCE-001" 
                value={form.sku}
                onChange={e => setForm({...form, sku: e.target.value})}
                required
                className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-muted/40 outline-none font-mono"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs uppercase text-muted font-semibold tracking-wider">Unit</label>
              <select 
                value={form.unit} 
                onChange={e => setForm({...form, unit: e.target.value as Unit})}
                className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white outline-none appearance-none"
              >
                <option value="pcs">Pieces (pcs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="litre">Litres (l)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </form>
      </div>
      
      <p className="text-xs text-muted/60 mt-4 text-center">
        ensure SKU is unique for tracking
      </p>
    </motion.div>
  );
};
