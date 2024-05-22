export interface Register {
    firstName: string;
    lastName: string;
    licenseNumber: string;
    phone: string;
    email: string;
    password: string;
    role?: string; // Optional role, default will be "Default"
  }
  