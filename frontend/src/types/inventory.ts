export type Unit = 'pcs' | 'kg' | 'litre';
export type MovementType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface Item {
    id: string;
    name: string;
    sku: string;
    unit: Unit;
    stock?: number;
}

export interface InventoryMovement {
    id: string;
    item_id: string;
    quantity: number;
    movement_type: MovementType;
    inserted_at: string;
}

export interface CreateItemDTO {
    name: string;
    sku: string;
    unit: Unit;
}

export interface CreateMovementDTO {
    item_id: string;
    quantity: number;
    movement_type: MovementType;
}
