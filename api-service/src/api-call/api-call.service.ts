import { Injectable } from '@nestjs/common';
import { timeFrameType } from 'src/dto/types';

@Injectable()
export class ApiCallService {
    /**
     * for statics data
     */
    private readonly url: { currencies, balance , price , transAcions } = {transAcions :'https://apiv2.nobitex.ir/users/transactions-history' , price : 'https://apiv2.nobitex.ir/market/udf/history' , currencies: 'https://apiv2.nobitex.ir/v2/wallets?currencies', balance: 'https://apiv2.nobitex.ir/users/wallets/balance' }
    private readonly token: string = 'Token e683b1a322bae2ea76783b1551509dc70114b471' 


    ////////////////////////////////////// methods /////////////////////////////////////////////////////////
    ////////////////////////////////////// methods /////////////////////////////////////////////////////////
    ////////////////////////////////////// methods /////////////////////////////////////////////////////////
    ////////////////////////////////////// methods /////////////////////////////////////////////////////////
    /**
     * for getting fudss   
     * if type was 1 retriev all currencies
     * if type was 0 retrive sum of balance as usdt
     * @param type 
     * @returns 
     */
    async getCurrencies(type: number): Promise<{}> {
        if (type == 0) {
            let body = { currency: 'usdt' }
            let url = this.url.balance
            let rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: this.token
                },
                body: JSON.stringify(body)
            })
            let response = await rawResponse.json()
            // console.log('response is >>>> ', response)
            return response
        } else if (type === 1) {
            let url = this.url.currencies

            let rawResponse = await fetch(url, {
                method: 'GET', headers: {
                    Authorization: this.token
                }
            })
            let response: {
                status: string,
                wallets: any
            } = await rawResponse.json()
            // console.log('response is >>>> ', response)

            let allData: {}[] = [];

            for (let i of Object.keys(response.wallets)){
                let data = {}
                if (+response.wallets[i].balance > 0){
                    if (i === 'USDT' || i === 'usdt'){
                        response.wallets[i].balance = (+response.wallets[i].balance).toFixed(2)                  
                    }
                    if (i === 'RLS' || i === 'rls') {
                        response.wallets[i].balance = (+response.wallets[i].balance).toFixed()
                    }
                    data[i] = response.wallets[i]
                    allData.push(data)
                }
            }

            return allData
        } else {
            return { msg: 'type is not valid' }
        }
    }



    /**
     * this func is fot getting price
     * @param currenci 
     * @param timeFrame 
     * @returns 
     */
    async getPrice(currenci ?: string , timeFrame ?: timeFrameType) : Promise<string[]>{
        
        let currency = currenci ? currenci : 'BTCUSDT'
        
        let currentTime = (new Date().getTime()/1000).toFixed()
        
        // console.log(`${this.url.price}?symbol=${currency}&resolution=${timeFrame ? timeFrame : 60}&to=${currentTime}`)

        let rawResponse = await fetch(`${this.url.price}?symbol=${currency}&resolution=${timeFrame ? timeFrame : 60}&to=${currentTime}` , {method : 'GET'})
        
        let response = await rawResponse.json()

        // console.log('data issss' , response)
        let data : string [] = response.c
        return data
    }



    /**
     * this is for geting all transActions
     * @returns 
     */
    async transActions(){
        let rawResponse = await fetch(`${this.url.transAcions}` , {method : 'GET' , headers : {
            Authorization : this.token
        }})
        
        let response = await rawResponse.json()
        
        // console.log('aftereee' , response)
        
        return response.transactions
    }

}
