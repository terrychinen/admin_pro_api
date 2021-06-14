import { User } from '../entities/user.entity';
export interface IAuthResponse {
    user: User;
    token: string;
}