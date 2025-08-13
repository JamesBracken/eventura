export interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    address: {
        id: number;
    };
    isAdminUser: boolean;
}
