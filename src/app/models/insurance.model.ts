export interface Insurance {
    id?: number;
    provider?: string;
    policyNumber?: string;
    coverage?: string;
    costADay?: number;
    vehicleId?: number; // Make it optional to allow adding insurance independently
}
