import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { loginDto, registerDto } from './dto/login.dto';
import { timeFrameType } from './dto/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('balances')
  getBalances(): {} {
    return this.appService.getBalances();
  }


  @Get('price')
  getPrice(@Query('currency') currency : string , @Query('timeFrame') timeFrame : any): {} {
    return this.appService.getPrice(currency , timeFrame);
  }


  @Get('transactionlist')
  getTransActions(): {} {
    return this.appService.getTransActions();
  }


  @Get('/market')
  getState(): {} {
    return this.appService.getState();
  }


  @Post('/market')
  setState(@Query('state') state : number , @Query('rsi') rsi : string , @Query('lastPrice') lastPrice : string): {} {
    return this.appService.setState(state , rsi , lastPrice);
  }

  
  @Post('login')
  async login(@Body() body : loginDto){
    return this.appService.login(body)
  }

  @Post('register')
  async registre(@Body(new ValidationPipe()) body : registerDto){
    return this.appService.register(body)
  }

  @Post('state')
  async setStateOfMarket(@Body() body : loginDto){
    return this.appService.login(body)
  }


}
