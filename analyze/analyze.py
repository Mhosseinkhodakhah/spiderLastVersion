import requests
import pandas as pd
import talib
import numpy as np
import time
from datetime import datetime

class analyzor :
    def __init__(self):
        self.rsi = 0
        self.state = 0
        self.lastPrice = 0
        self.lastSellPrice = 0
        self.lastBuyPrice = 0
        self.lastState = 0
        self.token= 'Token e683b1a322bae2ea76783b1551509dc70114b471' 
        pass


    def start(self):
        currentStateRespons = requests.get('http://localhost:4000/market')
        currentState = currentStateRespons.json()
        if (len(currentState['data']) == 0):
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
        else:
            self.state = int(currentState['data'][0]['state'])
            self.lastPrice = float(currentState['data'][0]['lastPrice'])
            self.lastSellPrice = float(currentState['data'][0]['lastSellPrice']) if 'lastSellPrice' in currentState['data'][0] else 0
            self.lastBuyPrice = float(currentState['data'][0]['lastBuyPrice']) if 'lastBuyPrice' in currentState['data'][0] else 0
            self.lastState = int(currentState['data'][0]['lastState']) if 'lastState' in currentState['data'][0] else 0
            allPrices = self.gettingPrices()
            # print(allPrices.json()['data'])
            self.rsi = self.calculateRSI(allPrices.json()['data'])
            self.checkTheStatusOfPosition()
            pass
    

    def gettingPrices(self):
        allPrices = requests.get('http://localhost:4000/price')
        return allPrices

    def calculateRSI(self , data):
        self.lastPrice = data[len(data)-1]
        closes = np.array(data)
        rsi = talib.RSI(closes, timeperiod=14)
        print(rsi[len(rsi)-1])
        mainRsi = rsi[len(rsi)-1]
        return mainRsi
    
    
    def log(self):
        return f'{self.state},{self.rsi},{self.lastPrice},{self.lastSellPrice},{self.lastBuyPrice},{self.lastState}'



    '''
    this is for checking and calculating of rsi and market situation and call the openPosition and realy controle the market and funds
    '''
    def checkTheStatusOfPosition(self):
        if (self.rsi < 30):
            print('come into the buy zone now' , self.log())
            if (self.state == 0):
                print('first step for buy befor' , self.log())
                responseofTheOpeneingPosition1 = self.openPosition('buy' , 0)
                if (responseofTheOpeneingPosition1 == True):
                    self.state += 1
                    self.lastBuyPrice = self.lastPrice
                    self.lastState = 1
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                    print('first step for buy after' , self.log())
                    pass
                else :
                    print('can not open the new position in this situation1' , self.log())
            elif (self.state == 7):
                print('second step for buy befor' , self.log())
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                print('second step for buy after' , self.log())
                pass
            elif (self.state > 0 and self.state < 7):
                if (self.lastState == 1 and self.lastPrice < self.lastBuyPrice):
                    print('third step for buy befor' , self.log())
                    if ((((self.lastBuyPrice - self.lastPrice)/self.lastBuyPrice)*100) >= 5):       # here we should buy on step
                        print('third step for buy befor in the 5 percent' , self.log())
                        responseofTheOpeneingPosition2 = self.openPosition('buy' , 0)
                        if (responseofTheOpeneingPosition2 == True):
                            self.state += 1
                            self.lastBuyPrice = self.lastPrice
                            self.lastState = 1
                            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                            print('third step for buy after in the 5 percent' , self.log())
                        else : 
                            print('can not open the new position in this situation2' , self.log())
                            pass
                    else:
                        print('third step for buy buy with no 5 percent happend' , self.log())
                        pass
                elif (self.lastState == 0):
                    print('forth step for buy when last state was sell state befor' , self.log())
                    responseofTheOpeneingPosition3 = self.openPosition('buy' , 0)
                    if (responseofTheOpeneingPosition3 == True):
                        self.state += 1
                        self.lastBuyPrice = self.lastPrice
                        self.lastState = 1
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                        print('forth step for buy when last state was sell state after' , self.log())
                        pass
                    else:
                        print('can not open the new position in this situation3' , self.log())
                        pass
                else:
                    print('i cant found what should i do' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                    pass
            else :
                print('no step for buy its not clear for me' , self.log())
                pass
        if (self.rsi > 70):
            print('come into the sell zone now' , self.log())
            if (self.state == 0):
                print('second step for sell befor' , self.log())
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                print('second step for sell after' , self.log())
                pass
            elif (self.state > 0 and self.state < 7):
                if (self.lastState == 0 and self.lastPrice > self.lastSellPrice):
                    print('third step for sell befor' , self.log())
                    if ((((self.lastPrice - self.lastSellPrice)/self.lastPrice)*100) >= 5):       # here we should sell on step
                        print('third step for sell befor in the 5 percent' , self.log())
                        responseofTheOpeneingPosition4 = self.openPosition('sell' , 0)
                        if (responseofTheOpeneingPosition4 == True):
                            self.state -= 1
                            self.lastSellPrice = self.lastPrice
                            self.lastState = 0
                            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                            print('third step for sell after in the 5 percent' , self.log())
                            pass
                        else:
                            print('can not open the new position in this situation4' , self.log())
                            pass
                    else:
                        print('third step for sell sell with no 5 percent happend' , self.log())
                        pass
                elif (self.lastState == 1):
                    print('forth step for buy when last state was sell state befor' , self.log())
                    responseofTheOpeneingPosition5 = self.openPosition('sell' , 0)
                    if (responseofTheOpeneingPosition5 == True):
                        self.state -= 1
                        self.lastSellPrice = self.lastPrice
                        self.lastState = 0
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                        print('forth step for buy when last state was sell state after' , self.log())
                        pass
                    else:
                        print('can not open the new position in this situation5' , self.log())
                        pass
                else:
                    print('i cant found what should i do---1' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                    pass
            elif (self.state == 7):
                print('first step for sell befor' , self.log())
                responseofTheOpeneingPosition6 = self.openPosition('sell' , 0)
                if (responseofTheOpeneingPosition6 == True):
                    self.state -= 1
                    self.lastSellPrice = self.lastPrice
                    self.lastState = 0
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                    print('first step for sell after' , self.log())
                    pass
                else:
                    print('can not open the new position in this situation6' , self.log())
                    pass
            else : 
                print('i cant found what should i do---0' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                pass
        else : 
            print('market is stable' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
            if (self.state < 0):
                self.state = 0
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
    


    '''
    this is for creating a position and handeled by checkTheStatusOfPosition function
    '''
    def openPosition(self , type , amount) -> bool:
        print('start the creating the position' , self.log())
        try:
            body = {"type":"buy","srcCurrency":"btc", "dstCurrency":"usdt", "execution" : "market" ,"amount" : str(10/self.lastPrice) ,"price":self.lastPrice}
            if (type == 'sell'):
                body['type'] = 'sell'
                print('its sell position')
            elif(type == 'buy'):
                body['type'] = 'buy'
                print('its buy position')
            else:
                print('invalid type')
                return False
            
            response = requests.post('https://apiv2.nobitex.ir/market/orders/add' , data=body , headers={'Authorization' : self.token})
            mainResponse = response.json()
            if ('status' not in mainResponse or mainResponse['status'] != 'ok'):
                print('error in opening position' , mainResponse)
                return False

            print(f'position successfully opened in {type}ing btc ' , mainResponse)
            requests.get('http://localhost:4000/transactions/update')
            return True
        except Exception as e:
            print('some error occured in creting position' , e)
            return False


instance = analyzor()

while True:
    myobj = datetime.now()
    minute = myobj.minute
    if (minute == 59):
        print('start the runner')
        instance.start()
        time.sleep(60*10)
    else:
        print('script is sleep yet' , myobj.minute)
        time.sleep(60*10)
