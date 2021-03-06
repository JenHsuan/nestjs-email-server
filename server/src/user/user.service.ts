import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    private users = [
        {
            userId: 1,
            username: this.configService.get<string>('VAILD_USERNAME'),
            password: this.configService.get<string>('VAILD_PASSWORD')
        }
    ];

    async findUser(username: string): Promise<any | undefined> {
        return this.users.find(user => user.username === username);
    }

    constructor(private configService: ConfigService) { }
}
