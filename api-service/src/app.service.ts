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
import { setting } from './entity/setting.entity';
import { addSetting } from './dto/addSetting.dto';
import { position } from './entity/positions.entity';

@Injectable()
export class AppService {

  private saltOrRounds: number = 10;
  constructor(
    private apiCalService : ApiCallService,
    private tokenService : TokenizeService,
    @InjectRepository(market) private readonly marketRepo: Repository<market>,

    @InjectRepository(transActions) private readonly transActionsRepo : Repository<transActions>,
    @InjectRepository(position) private readonly positionRepo : Repository<position>,
    @InjectRepository(setting) private readonly settingRepo : Repository<setting>,
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
    let allTransActions = await this.transActionsRepo.find({
      order : {created_at : 'DESC'}
    })
    if (allTransActions.length <= 0) {
      all = await this.apiCalService.transActions()
      for (let i of all) {
        let data = {
          nobitexId: i.id.toString(),
          amount: i.amount,
          description: i.description,
          created_at: i.created_at,
          balance: i.balance,
          tp: i.tp,
          calculatedFee: i.calculatedFee,
          type: i.type,
          currency: i.currency,
          date: new Date().toLocaleString('fa-IR').split(',')[0],
          time: new Date().toLocaleString('fa-IR').split(',')[1],
          milisecond: new Date().getTime().toString()
        }
        let createdTr = this.transActionsRepo.create(data)
        await this.transActionsRepo.save(createdTr)
      }
    }else{
      // let currentTime = new Date().getTime()
      all = allTransActions
    }
    return {
      success : true,
      data : all
    }
  }



  /**
   * this is for update transActions
   * @returns 
   */
  async updateTransActions(){
    let all;
    // if (allTransActions.length <= 0) {
      all = await this.apiCalService.transActions()
      for (let i of all) {
        let exist = await this.transActionsRepo.exists({
          where : {
            nobitexId : i.id
          }
        })
        if (!exist){
          let data = {
            nobitexId: i.id.toString(),
            amount: i.amount,
            description: i.description,
            created_at: i.created_at,
            balance: i.balance,
            tp: i.tp,
            calculatedFee: i.calculatedFee,
            type: i.type,
            currency: i.currency,
            date: new Date().toLocaleString('fa-IR').split(',')[0],
            time: new Date().toLocaleString('fa-IR').split(',')[1],
            milisecond: new Date().getTime().toString()
          }
          let createdTr = this.transActionsRepo.create(data)
          await this.transActionsRepo.save(createdTr)
        }
      }
    // }else{
    //   // let currentTime = new Date().getTime()
    //   all = allTransActions
    // }
    return {
      success : true,
      data : 'done'
    }
  }


  /**
   * this is for seting state by analyzor service
   * @param state 
   * @param rsi 
   * @param lastPrice 
   * @returns 
   */
  async setState(state : number , rsi : string , lastPrice : string , lastState : number , lastSellPrice : string , lastBuyPrice : string , position : number){
    

    try {      
    // console.log('its rsi' , lastSellPrice, lastBuyPrice)
    console.log('its staet' , position)
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

    let savedNewSituation = await this.marketRepo.save(marketSituation)

    if (position == 1){             // buy
      console.log('buy position start')
      let thisWeight = (10 / +lastBuyPrice)
      let lastSellPosition = await this.positionRepo.findOne({
        where: {
          type: 'sell',
          setllement: false
        }, order: { createdAt: 'DESC' }
      })

      console.log('its last buy position for profit', lastSellPosition)

      let lastSellWeight = lastSellPosition ? lastSellPosition?.weight : thisWeight


      let profit = thisWeight - +lastSellWeight

      let newPosition = this.positionRepo.create({
        market: savedNewSituation,
        weight: (10 / +lastBuyPrice).toString(),
        price: lastBuyPrice,
        balance: '10',
        profit: profit.toString(),
        type: 'buy',
      })

      if (lastSellPosition) {
        lastSellPosition ? lastSellPosition.setllement = true : console.log('no last buy price for setllemet')
        await this.positionRepo.save(lastSellPosition)
      }

      let savedPosition = await this.positionRepo.save(newPosition)
      
      savedNewSituation.position = savedPosition

      await this.marketRepo.save(savedNewSituation)

    }

    if (position == 0){            // sell
      console.log('sell position start' )
      let thisWeight = (10 / +lastSellPrice)
      let lastBuyPosition = await this.positionRepo.findOne({where : {
        type : 'buy',
        setllement : false
      } , order : {createdAt : 'DESC'}})

      console.log('its last sell position for profit' , lastBuyPosition)

      let lastBuyWeight = lastBuyPosition ? lastBuyPosition?.weight : thisWeight

      
      let profit = thisWeight - +lastBuyWeight
      
      let newPosition = this.positionRepo.create({
        market: savedNewSituation,
        weight: (10 / +lastSellPrice).toString(),
        price: lastSellPrice,
        balance: '10',
        profit: profit.toString(),
        type: 'sell',
      })

      if (lastBuyPosition){
        lastBuyPosition ? lastBuyPosition.setllement = true : console.log('no last buy price for setllemet')
        await this.positionRepo.save(lastBuyPosition)
      }
      let savedPosition = await this.positionRepo.save(newPosition)
      savedNewSituation.position = savedPosition
      await this.marketRepo.save(savedNewSituation)
    }


    if (position == 2){
      console.log('no position opened')
    }           // nothing

    return {
      success : true,
    }
    
    } catch (error) {
      console.log('its error' , error)
      return {
        success : false
      }      
    }

  }


  
  async getState(){
    let lastMarketSituations = await this.marketRepo.find({order : {createdAt : 'DESC'} , relations : ['position'], take : 10})
    let first = await this.marketRepo.find({relations : ['position']})

    let all = lastMarketSituations.concat(first[0])

    // let allDeleted = ['09632d2f-99ba-47bf-aea6-f646f72ea20e' , 'd7dc8e33-a91f-41db-a37f-6ce4c2de7085' , '']

    // let allD = await this.marketRepo.find({
    //   where : [{
    //     state : 0
    //   } , {
    //     state : -1
    //   }]
    // })

    // await this.marketRepo.remove(allD)

    return {
      success : true,
      data : all
    }

  }

  /**
   * this is for getting setting
   */
  async getSetting(){
    let setting = await this.settingRepo.findOne({
      where: {
        active: true
      }
    })
    if (!setting) {
      setting = await this.settingRepo.save(this.settingRepo.create({
        volume: '10',
        percent: 5,
        active: true,
        currencies: ['BTC']
      }))
    }

    return {
      success : true,
      message : 'fetching data done',
      data : setting
    }

  }

  /**
   * this is for adding new setting by user for his positions
   * @param body 
   */
  async addNewSetting(body : addSetting){
    let newSetting= await this.settingRepo.create(body)
    await this.settingRepo.save(newSetting)

    return {
      success: true,
      message: 'fetching data done',
      data: newSetting
    }
    
  }
}





