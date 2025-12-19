import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiCallService } from './api-call/api-call.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';  
import { ConfigService } from '@nestjs/config'; 
import { TokenizeService } from './tokenize/tokenize.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { market } from './entity/market.entity';
import { transActions } from './entity/transActions.entity';
import { user } from './entity/user.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { setting } from './entity/setting.entity';
import { position } from './entity/positions.entity';


@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hossein',
      password: 'hosseinkh1376',
      database: 'sunelly',
      entities: [
        market,
        transActions,
        user,
        setting,
        position
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      market,
      transActions,
      user,
      setting,
      position
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],  
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // secret: configService.get('JWT_USER_SECRET'),
        // signOptions: { expiresIn: '7d' },  
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ApiCallService, JwtStrategy ,TokenizeService],
})
export class AppModule {}
