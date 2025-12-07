import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { loginDto, registerDto } from './dto/login.dto';
import { timeFrameType } from './dto/types';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('balances')
  @UseGuards(AuthGuard)
  getBalances(): {} {
    return this.appService.getBalances();
  }


  @Get('price')
  // @UseGuards(AuthGuard)
  getPrice(@Query('currency') currency : string , @Query('timeFrame') timeFrame : any): {} {
    return this.appService.getPrice(currency , timeFrame);
  }


  @Get('transactionlist')
  @UseGuards(AuthGuard)
  getTransActions(): {} {
    return this.appService.getTransActions();
  }


  @Get('/market')
  // @UseGuards(AuthGuard)
  getState(): {} {
    return this.appService.getState();
  }


  @Post('/market')
  // @UseGuards(AuthGuard)
  setState(@Query('state') state : number , @Query('rsi') rsi : string , @Query('lastPrice') lastPrice : string , @Query('lastSellPrice') lastSellPrice : string , @Query('lastBuyPrice') lastBuyPrice : string , @Query('lastState') lastState : number): {} {
    return this.appService.setState(state , rsi , lastPrice , lastState ,lastSellPrice , lastBuyPrice);
  }

  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body() body : loginDto){
    return this.appService.login(body)
  }

  @Post('register')
  @UseGuards(AuthGuard)
  async registre(@Body(new ValidationPipe()) body : registerDto){
    return this.appService.register(body)
  }

  @Post('state')
  // @UseGuards(AuthGuard)
  async setStateOfMarket(@Body() body : loginDto){
    return this.appService.login(body)
  }

}
