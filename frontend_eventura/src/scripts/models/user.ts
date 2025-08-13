export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: Date;
    address: {
        id: number,
        addressLine1 : string;
        addressLine2 : string;
        postcode: string;
        city: string;
        country: string
    } ;
    createdDate: Date;
    updatedDate: Date;
    isAdminUser: boolean;
}
