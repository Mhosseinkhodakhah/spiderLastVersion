

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
        pass


    def start(self):
        currentStateRespons = requests.get('http://localhost:4000/market')
        currentState = currentStateRespons.json()
        if (len(currentState['data']) == 0):
            requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
        else:
            self.state = int(currentState['data'][0]['state'])
            self.lastPrice = float(currentState['data'][0]['lastPrice'])
            print('its hereeeee' , currentState['data'][0]['state'] , currentState['data'][0]['lastPrice'])
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
    
    
    def checkTheStatusOfPosition(self):
        #requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
        if (self.rsi < 30):
            if (self.state == 0):
                self.state += 1
                pass
            if (self.state == 1):
                self.state += 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
            if (self.state == 2):
                self.state += 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
        
        if (self.rsi > 70):
            if (self.state == 0):
                self.state -= 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
            if (self.state == 1):
                self.state -= 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
            if (self.state == 2):
                self.state -= 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
            if (self.state == 3):
                self.state -= 1
                requests.post(f'http://localhost:4000/market?state={self.state}&rsi={self.rsi}&lastPrice={self.lastPrice}')
                pass
            pass
        pass



    def openPosition(self , type , amount):
        pass


instance = analyzor()


while True:
    instance.start()
    time.sleep(60)