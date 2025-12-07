import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { loginDto, registerDto } from './dto/login.dto';
import { timeFrameType } from './dto/types';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('balances')
  @UseGuards(JwtAuthGuard)
  getBalances(): {} {
    return this.appService.getBalances();
  }


  @Get('price')
  // @UseGuards(JwtAuthGuard)
  getPrice(@Query('currency') currency : string , @Query('timeFrame') timeFrame : any): {} {
    return this.appService.getPrice(currency , timeFrame);
  }


  @Get('transactionlist')
  @UseGuards(JwtAuthGuard)
  getTransActions(): {} {
    return this.appService.getTransActions();
  }


  @Get('/market')
  // @UseGuards(JwtAuthGuard)
  getState(): {} {
    return this.appService.getState();
  }


  @Post('/market')
  // @UseGuards(JwtAuthGuard)
  setState(@Query('state') state : number , @Query('rsi') rsi : string , @Query('lastPrice') lastPrice : string , @Query('lastSellPrice') lastSellPrice : string , @Query('lastBuyPrice') lastBuyPrice : string , @Query('lastState') lastState : number): {} {
    return this.appService.setState(state , rsi , lastPrice , lastState ,lastSellPrice , lastBuyPrice);
  }

  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(@Body() body : loginDto){
    return this.appService.login(body)
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registre(@Body(new ValidationPipe()) body : registerDto){
    return this.appService.register(body)
  }

  @Post('state')
  // @UseGuards(JwtAuthGuard)
  async setStateOfMarket(@Body() body : loginDto){
    return this.appService.login(body)
  }

}
