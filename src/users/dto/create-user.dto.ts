export enum Roles {
    Admin = 'Admin',
    Manager = 'Manager',
    Developer = 'Developer'
}

export class CreateUserDto {
    FirstName:string;
    LastName:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
    Role:Roles[];
}
