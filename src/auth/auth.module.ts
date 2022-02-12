import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        UserService,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule {}
