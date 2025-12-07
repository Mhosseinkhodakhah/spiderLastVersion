import { Injectable } from '@nestjs/common';
import { ApiCallService } from './api-call/api-call.service';
import { loginDto, registerDto } from './dto/login.dto';
import { TokenizeService } from './tokenize/tokenize.service';
import { timeFrameType } from './dto/types';
import { market } from './entity/market.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { transActions } from './entity/transActions.entity';
import { user } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {

  private saltOrRounds: number = 10;
  constructor(
    private apiCalService : ApiCallService,
    private tokenService : TokenizeService,
    @InjectRepository(market) private readonly marketRepo: Repository<market>,

    @InjectRepository(transActions) private readonly transActionsRepo : Repository<transActions>,
    @InjectRepository(user) private readonly userRepo : Repository<user>,
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

    let user = await this.userRepo.findOne({
      where : [{
        userName : body.userName
      } , {
        phoneNumber : body.userName
      }]
    })
    
    if (!user){
      return {
        success : false,
        message : 'user not found!',
        error : 'user not found!'
      }
    }


    let compare =  await bcrypt.compare(body.password, user?.password)

    if (!compare){
      return {
        success : false,
        message : 'password is incorrect',
        error : 'password is incorrect'
      }
    }

    let token = await this.tokenService.tokenize({userName : user.userName , id : user.id , phoneNumber : user.phoneNumber} , '1H' , 0)
    return {
      success : true,
      data : {
        token : token,
        access : token,
      }
    }
  } 



  /**
   * for register
   * @param body 
   * @returns 
   */
  async register(body : registerDto){  

    let user = await this.userRepo.find({
      where : [{
        phoneNumber : body.phoneNumber
      } , {
        userName : body.userName
      }]
    })

    if (user.length>0){
      return {
        msg : 'user found!!!'
      }
    }

    let hashPassword = await bcrypt.hash(body.password, this.saltOrRounds)

    let newuser = this.userRepo.create(body)
    newuser.password = hashPassword;
    newuser.date = new Date().toLocaleString("fa-IR").split(',')[0]
    newuser.time = new Date().toLocaleString("fa-IR").split(',')[1]
    newuser.milisecond = new Date().getTime().toString()
    await this.userRepo.save(newuser)

    return {
      success : true,
      data : newuser
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
  async setState(state : number , rsi : string , lastPrice : string , lastState : number , lastSellPrice : string , lastBuyPrice : string){

    // console.log('its rsi' , lastSellPrice, lastBuyPrice)

    let marketSituation = this.marketRepo.create({
      state : +state,
      rsi:rsi.toString(),
      lastPrice : lastPrice,
      lastState ,
      lastSellPrice,
      lastBuyPrice
    })
    
    let currencies = await this.apiCalService.getCurrencies(1)
    
    let currenciesCount = 0
    
    let totalBalance = 0
    
    for (let i of Object.keys(currencies)){
      // console.log('datata' , Object.keys(currencies[i])[0])
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


