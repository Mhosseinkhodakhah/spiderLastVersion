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
        self.position = 2
        self.token= 'Token e683b1a322bae2ea76783b1551509dc70114b471' 
        pass
    
    
    def start(self):
        currentStateRespons = requests.get('http://localhost:4000/market')
        currentState = currentStateRespons.json()
        if (len(currentState['data']) == 0):
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
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
        print(rsi[len(rsi)-1] , self.lastPrice)
        mainRsi = rsi[len(rsi)-1]
        return mainRsi
    
    
    def log(self):
        return f'{self.state},{self.rsi},{self.lastPrice},{self.lastSellPrice},{self.lastBuyPrice},{self.lastState}'



    '''
    this is for checking and calculating of rsi and market situation and call the openPosition and realy controle the market and funds
    '''
    def checkTheStatusOfPosition(self):
        self.position = 2
        if (self.rsi < 40):
            print('==========================================================')
            print('come into the buy zone now' , self.log())
            print('==========================================================')
            if (self.state == 0):
                print('==========================================================')
                print('first step for buy befor' , self.log())
                print('==========================================================')
                responseofTheOpeneingPosition1 = self.openPosition('buy' , 0)
                if (responseofTheOpeneingPosition1 == True):
                    self.state += 1
                    self.lastBuyPrice = self.lastPrice
                    self.lastState = 1
                    self.position = 1
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                    print('==========================================================')
                    print('first step for buy after' , self.log())
                    print('==========================================================')
                    pass
                else :
                    print('==========================================================')
                    print('can not open the new position in this situation1' , self.log())
                    print('==========================================================')
            elif (self.state == 7):
                print('==========================================================')
                print('second step for buy befor' , self.log())
                print('==========================================================')
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                print('==========================================================')
                print('second step for buy after' , self.log())
                print('==========================================================')
                pass
            elif (self.state > 0 and self.state < 7):
                if (self.lastState == 1 and self.lastPrice < self.lastBuyPrice):
                    print('==========================================================')
                    print('third step for buy befor' , self.log())
                    print('==========================================================')
                    if ((((self.lastBuyPrice - self.lastPrice)/self.lastBuyPrice)*100) >= 4):       # here we should buy on step
                        print('==========================================================')
                        print('third step for buy befor in the 5 percent' , self.log())
                        print('==========================================================')
                        responseofTheOpeneingPosition2 = self.openPosition('buy' , 0)
                        if (responseofTheOpeneingPosition2 == True):
                            self.state += 1
                            self.lastBuyPrice = self.lastPrice
                            self.lastState = 1
                            self.position = 1
                            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                            print('==========================================================')
                            print('third step for buy after in the 5 percent' , self.log())
                            print('==========================================================')
                        else : 
                            print('==========================================================')
                            print('can not open the new position in this situation2' , self.log())
                            print('==========================================================')
                            pass
                    else:
                        print('==========================================================')
                        print('third step for buy buy with no 5 percent happend' , self.log())
                        print('==========================================================')

                        pass
                elif (self.lastState == 0):
                    print('==========================================================')
                    print('forth step for buy when last state was sell state befor' , self.log())
                    print('==========================================================')
                    responseofTheOpeneingPosition3 = self.openPosition('buy' , 0)
                    if (responseofTheOpeneingPosition3 == True):
                        self.state += 1
                        self.lastBuyPrice = self.lastPrice
                        self.lastState = 1
                        self.position = 1
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                        print('==========================================================')
                        print('forth step for buy when last state was sell state after' , self.log())
                        print('==========================================================')
                        pass
                    else:
                        print('==========================================================')
                        print('can not open the new position in this situation3' , self.log())
                        print('==========================================================')
                        pass
                else:
                    print('==========================================================')
                    print('i cant found what should i do' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                    print('==========================================================')
                    pass
            else :
                print('==========================================================')
                print('no step for buy its not clear for me' , self.log())
                print('==========================================================')
                pass
        if (self.rsi > 70):
            print('==========================================================')
            print('come into the sell zone now' , self.log())
            print('==========================================================')
            if (self.state == 0):
                print('==========================================================')
                print('second step for sell befor' , self.log())
                print('==========================================================')
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                print('==========================================================')
                print('second step for sell after' , self.log())
                print('==========================================================')
                pass
            elif (self.state > 0 and self.state < 7):
                if (self.lastState == 0 and self.lastPrice > self.lastSellPrice):
                    print('==========================================================')
                    print('third step for sell befor' , self.log())
                    print('==========================================================')
                    if ((((self.lastPrice - self.lastSellPrice)/self.lastPrice)*100) >= 4):       # here we should sell on step
                        print('==========================================================')
                        print('third step for sell befor in the 5 percent' , self.log())
                        print('==========================================================')
                        responseofTheOpeneingPosition4 = self.openPosition('sell' , 0)
                        if (responseofTheOpeneingPosition4 == True):
                            self.state -= 1
                            self.lastSellPrice = self.lastPrice
                            self.lastState = 0
                            self.position = 0
                            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                            print('==========================================================')
                            print('third step for sell after in the 5 percent' , self.log())
                            print('==========================================================')
                            pass
                        else:
                            print('==========================================================')
                            print('can not open the new position in this situation4' , self.log())
                            print('==========================================================')
                            pass
                    else:
                        print('==========================================================')
                        print('third step for sell sell with no 5 percent happend' , self.log())
                        print('==========================================================')
                        pass
                elif (self.lastState == 1):
                    print('==========================================================')
                    print('forth step for buy when last state was sell state befor' , self.log())
                    print('==========================================================')
                    responseofTheOpeneingPosition5 = self.openPosition('sell' , 0)
                    if (responseofTheOpeneingPosition5 == True):
                        self.state -= 1
                        self.lastSellPrice = self.lastPrice
                        self.lastState = 0
                        self.position = 0
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                        print('==========================================================')
                        print('forth step for buy when last state was sell state after' , self.log())
                        print('==========================================================')
                        pass
                    else:
                        print('==========================================================')
                        print('can not open the new position in this situation5' , self.log())
                        print('==========================================================')
                        pass
                else:
                    print('==========================================================')
                    print('i cant found what should i do---1' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                    print('==========================================================')
                    pass
            elif (self.state == 7):
                print('==========================================================')
                print('first step for sell befor' , self.log())
                print('==========================================================')
                responseofTheOpeneingPosition6 = self.openPosition('sell' , 0)
                if (responseofTheOpeneingPosition6 == True):
                    self.state -= 1
                    self.lastSellPrice = self.lastPrice
                    self.lastState = 0
                    self.position = 0
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
                    print('==========================================================')
                    print('first step for sell after' , self.log())
                    print('==========================================================')
                    pass
                else:
                    print('==========================================================')
                    print('can not open the new position in this situation6' , self.log())
                    print('==========================================================')
                    pass
            else : 
                print('==========================================================')
                print('i cant found what should i do---0' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                print('==========================================================')
                pass
        else : 
            print('==========================================================')
            print('market is stable' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
            print('==========================================================')
            if (self.state < 0):
                self.state = 0
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
    


    '''
    this is for creating a position and handeled by checkTheStatusOfPosition function
    '''
    def openPosition(self , type , amount) -> bool:
        print('==========================================================')
        print('start the creating the position' , self.log())
        print('==========================================================')
        try:
            body = {"type":"buy","srcCurrency":"btc", "dstCurrency":"usdt", "execution" : "market" ,"amount" : str(20/self.lastPrice) ,"price":self.lastPrice}
            if (type == 'sell'):
                body['type'] = 'sell'
                print('==========================================================')
                print('its sell position')
                print('==========================================================')
            elif(type == 'buy'):
                body['type'] = 'buy'
                print('==========================================================')
                print('its buy position')
                print('==========================================================')
            else:
                print('==========================================================')
                print('invalid type')
                print('==========================================================')
                return False
            
            response = requests.post('https://apiv2.nobitex.ir/market/orders/add' , data=body , headers={'Authorization' : self.token})
            mainResponse = response.json()
            print('its response of the open position' , mainResponse)
            if ('status' not in mainResponse or mainResponse['status'] != 'ok'):
                print('==========================================================')
                print('error in opening position' , mainResponse)
                print('==========================================================')
                return False
            print('==========================================================')
            print(f'position successfully opened in {type}ing btc ' , mainResponse)
            # mainResponse['order']['']
            print('==========================================================')
            responseOfUpdateTransActions = requests.get('http://localhost:4000/transactions/update')
            print('response of the update t reransactions' , responseOfUpdateTransActions)
            return True
        except Exception as e:
            print('==========================================================')
            print('some error occured in creting position' , e)
            print('==========================================================')
            return False
        
    def updateState(self):
        currentStateRespons = requests.get('http://localhost:4000/market')
        currentState = currentStateRespons.json()
        if (len(currentState['data']) == 0):
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')
        else:
            self.state = int(currentState['data'][0]['state'])
            self.lastPrice = float(currentState['data'][0]['lastPrice'])
            self.lastSellPrice = float(currentState['data'][0]['lastSellPrice']) if 'lastSellPrice' in currentState['data'][0] else 0
            self.lastBuyPrice = float(currentState['data'][0]['lastBuyPrice']) if 'lastBuyPrice' in currentState['data'][0] else 0
            self.lastState = int(currentState['data'][0]['lastState']) if 'lastState' in currentState['data'][0] else 0

        allPrices = self.gettingPrices()
        self.rsi = self.calculateRSI(allPrices.json()['data'])
        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}&position={self.position}')

        

instance = analyzor()

while True:
    myobj = datetime.now()
    minute = myobj.minute
    # if (int(minute) == 29):
    print('==========================================================')
    print('start the runner' , myobj)
    print('==========================================================')
    instance.start()
    time.sleep(60)
    # elif (int(minute) == 59 or int(minute) == 45 or int(minute) == 15):
    #     print('==========================================================')
    #     print('run the update state' , myobj.minute)
    #     print('==========================================================')
    #     instance.updateState()
    #     time.sleep(60)
    # # else:
    #     print('==========================================================')
    #     print('script is sleep yet' , myobj.minute)
    #     print('==========================================================')
    #     time.sleep(60)
