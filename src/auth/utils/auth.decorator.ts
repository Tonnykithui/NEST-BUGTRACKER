import { SetMetadata } from "@nestjs/common";
import { Roles } from "../dto/create-auth.dto";

export const ROLES_KEY = 'roles'
export const RolesGuard = (...roles:Roles[]) => SetMetadata(ROLES_KEY, roles);