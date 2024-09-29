import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ChatGateway } from './chat/chat.gateway';
import { ApiConfigModule } from './api-config/api-config.module';
import { ApiConfigService } from './api-config/api-config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ApiConfigModule,
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: async (apiConfigService: ApiConfigService) => ({
        uri: apiConfigService.getMongodbUri,
      }),
      inject: [ApiConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: async (apiConfigService: ApiConfigService) => ({
        url: apiConfigService.getRedisUri,
      }),
      inject: [ApiConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(consumer: MiddlewareConsumer): void {}
}
