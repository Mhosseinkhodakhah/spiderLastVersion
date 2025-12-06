import requests
import pandas as pd
import talib
import numpy as np
import time

class analyzor :
    def __init__(self):
        self.rsi = 0
        self.state = 0
        self.lastPrice = 0
        self.lastSellPrice = 0
        self.lastBuyPrice = 0
        self.lastState = 0
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


    def checkTheStatusOfPosition(self):
        if (self.rsi < 30):
            print('come into the buy zone now' , self.log())
            if (self.state == 0):
                print('first step for buy befor' , self.log())
                self.state += 1
                self.lastBuyPrice = self.lastPrice
                self.lastState = 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                print('first step for buy after' , self.log())
                pass
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
                        self.state += 1
                        self.lastBuyPrice = self.lastPrice
                        self.lastState = 1
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                        print('third step for buy after in the 5 percent' , self.log())
                    else:
                        print('third step for buy buy with no 5 percent happend' , self.log())
                        pass
                elif (self.lastState == 0):
                    print('forth step for buy when last state was sell state befor' , self.log())
                    self.state += 1
                    self.lastBuyPrice = self.lastPrice
                    self.lastState = 1
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                    print('forth step for buy when last state was sell state after' , self.log())
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
                        self.state -= 1
                        self.lastSellPrice = self.lastPrice
                        self.lastState = 0
                        requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                        print('third step for sell after in the 5 percent' , self.log())
                        pass
                    else:
                        print('third step for sell sell with no 5 percent happend' , self.log())
                        pass
                elif (self.lastState == 1):
                    print('forth step for buy when last state was sell state befor' , self.log())
                    self.state -= 1
                    self.lastSellPrice = self.lastPrice
                    self.lastState = 0
                    requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                    print('forth step for buy when last state was sell state after' , self.log())
                    pass
                else:
                    print('i cant found what should i do---1' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                    pass
            elif (self.state == 7):
                print('first step for sell befor' , self.log())
                self.state -= 1
                self.lastSellPrice = self.lastPrice
                self.lastState = 0
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
                print('first step for sell after' , self.log())
                pass
            else : 
                print('i cant found what should i do---0' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
                pass
        else : 
            print('market is stable' , self.state , self.lastSellPrice , self.lastState , self.lastBuyPrice , self.lastPrice)
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}&lastSellPrice={self.lastSellPrice}&lastBuyPrice={self.lastBuyPrice}&lastState={self.lastState}')
    



    def openPosition(self , type , amount):
        pass


instance = analyzor()


while True:
    instance.start()
    time.sleep(60*10)