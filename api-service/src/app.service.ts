import { Injectable } from '@nestjs/common';
import { ApiCallService } from './api-call/api-call.service';
import { loginDto } from './dto/login.dto';
import { TokenizeService } from './tokenize/tokenize.service';
import { timeFrameType } from './dto/types';
import { market } from './entity/market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    private apiCalService : ApiCallService,
    private tokenService : TokenizeService,
    @InjectRepository(market) private readonly marketRepo: Repository<market>,
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


  async getTransActions(){
    let trs = await this.apiCalService.transActions()

    return {
      success : true,
      data : trs
    }
  }


  async setState(state : number , rsi : string){
    let marketSituation = this.marketRepo.create({
      state : state,
      rsi:rsi
    })

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


