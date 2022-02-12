import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
          }),
    ],
    controllers: [
        MockController
    ],
    providers: [
        MockService
    ]
})
export class MockModule {}
