export enum Role {
    Admin = 1,
    Manager = 2,
    Editor = 3,
}

export type RoleMapping = {
    [key in keyof typeof Role]: string;
};

export const roleMapping: RoleMapping = {
    Admin: "Administrator",
    Manager: "Manager",
    Editor: "Editor",
};