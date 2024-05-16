import { Vehicle } from './vehicle.model';
import { Customer } from './customer.model';
import { Insurance } from './insurance.model';

export interface RentalContract {
    id?: number;
    vehicleId: number;
    customerId: number;
    insuranceId: number;
    startDate: Date;
    endDate: Date;
    totalCost: number;
    vehicle?: Vehicle;
    customer?: Customer;
    insurance?: Insurance;
}

