

import requests
import pandas as pd
import talib
import numpy as np


class analyzor :
    def __init__(self):
        pass


    def start(self):
        allPrices = self.gettingPrices()
        # print(allPrices.json()['data'])
        rsi = self.calculateRSI(allPrices.json()['data'])
        self.checkTheStatusOfPosition(rsi)
        pass
    

    def gettingPrices(self):
        allPrices = requests.get('http://localhost:4000/price')
        return allPrices
    
    def calculateRSI(self , data):
        closes = np.array(data)
        rsi = talib.RSI(closes, timeperiod=14)
        print(rsi[len(rsi)-1])
        mainRsi = rsi[len(rsi)-1]
        return mainRsi
    

    def checkTheStatusOfPosition():
        if (rsi < 30):
            pass
        if (rsi > 70):
            pass
        pass



    def openPosition(self , type , amount):
        pass


instance = analyzor()


instance.start()