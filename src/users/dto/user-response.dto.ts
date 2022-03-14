import { User, UserRole } from "../entities/user.entity";

export class UserResponseDto {
  
  id: number;
  email: string;
  role: UserRole;

  constructor(id:number, email:string, role: UserRole){
    this.id = id;
    this.email = email;
    this.role = role
  }

  static fromEntity(user:User){
    return new UserResponseDto(user.id, user.email, user.role);
  }
}