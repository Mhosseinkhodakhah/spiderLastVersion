import { Injectable } from '@nestjs/common';
import { ApiCallService } from './api-call/api-call.service';
import { loginDto } from './dto/login.dto';
import { TokenizeService } from './tokenize/tokenize.service';
import { timeFrameType } from './dto/types';
import { market } from './entity/market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { transActions } from './entity/transActions.entity';

@Injectable()
export class AppService {

  constructor(
    private apiCalService : ApiCallService,
    private tokenService : TokenizeService,
    @InjectRepository(market) private readonly marketRepo: Repository<market>,

    @InjectRepository(transActions) private readonly transActionsRepo : Repository<transActions>
  ){}


  /**
   * for geting balances
   * @returns 
   */
  async getBalances(): Promise<{}> {
    return this.apiCalService.getCurrencies(1)
  }


  /**
   * for login
   * @param body 
   * @returns 
   */
  async login(body : loginDto){  
    let token = await this.tokenService.tokenize({userName : body.userName} , '1H' , 0)
    return {
      success : true,
      data : {
        token : token,
        access : token,
      }
    }
  } 



  /**
   * this end point is for getting price of a specific currency in specific timeframe
   * default isss >>>>>>>> currency : BTCUSDT      timeFrame : 60 minutes
   * @param currency 
   * @param timeFrame 
   * @returns 
   */
  async getPrice(currency : string , timeFrame : timeFrameType ){
    let price : string[]
    if (currency && currency !== 'undefined'){
       price = await this.apiCalService.getPrice(currency)
    }else{
      price = await this.apiCalService.getPrice()
    }

    price = await this.apiCalService.getPrice()

    return {
      success : true,
      data : price
    }
  }


  /**
   * this is for geting transActions
   * @returns 
   */
  async getTransActions(){
    let all;
    let allTransActions = await this.transActionsRepo.find()
    if (allTransActions.length <= 0){
      all = await this.apiCalService.transActions()
    }else{
      all = allTransActions
    }
    return {
      success : true,
      data : all
    }
  }



  /**
   * this is for seting state by analyzor service
   * @param state 
   * @param rsi 
   * @param lastPrice 
   * @returns 
   */
  async setState(state : number , rsi : string , lastPrice : string){

    console.log('its rsi' , state , rsi)

    let marketSituation = this.marketRepo.create({
      state : +state,
      rsi:rsi.toString(),
      lastPrice : lastPrice
    })
    
    let currencies = await this.apiCalService.getCurrencies(1)
    
    let currenciesCount = 0
    
    let totalBalance = 0
    
    for (let i of Object.keys(currencies)){
      console.log('datata' , Object.keys(currencies[i])[0])
      if (Object.keys(currencies[i])[0] != 'RLS' && Object.keys(currencies[i])[0] != 'USDT'){
        currenciesCount+=1
        let price = await this.apiCalService.getPrice(`${Object.keys(currencies[i])[0]}USDT`)
        let balanceAmount = +price[price.length-1] * +currencies[i][Object.keys(currencies[i])[0]].balance
        totalBalance+=balanceAmount
      }else if(Object.keys(currencies[i])[0] == 'USDT'){
        totalBalance += +currencies[i][Object.keys(currencies[i])[0]].balance        
      }
    }
    
    marketSituation.totalBalance = totalBalance.toString()
    
    marketSituation.currencies = currenciesCount.toString()

    await this.marketRepo.save(marketSituation)
    
    return {
      success : true,
    }
    
  }


  
  async getState(){
    let lastMarketSituations = await this.marketRepo.find({order : {createdAt : 'DESC'}})

    return {
      success : true,
      data : lastMarketSituations
    }

  }

}


