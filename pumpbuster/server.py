from flask import Flask, request, jsonify, copy_current_request_context
import json
import re
from flask_cors import CORS, cross_origin
import requests
import time
import hmac
import hashlib
from configobj import ConfigObj
from gevent.lock import BoundedSemaphore
import gevent.monkey
import random

app = Flask(__name__)
CORS(app)
HOST = "127.0.0.1"
PORT = 5000
API_SECRET = ""
config = ConfigObj('configfile')
currencies = [x["Currency"] for x in requests.get('https://bittrex.com/api/v1.1/public/getcurrencies').json()["result"]] # one linerrrrrr

@app.route('/getmarketsummary', methods=['GET'])
def get_market_summary():
    if request.method == 'GET':
        try:
            market = request.args.get('market')
            url = 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-'+market
            return jsonify({"response": requests.get(url).json(), "statusCode": 200})
        except Exception:
            return jsonify({"response": {}, "statusCode": 404})


@app.route('/histohour', methods=['GET'])
def histohour():
    if request.method == 'GET':
        try:
            fsym = request.args.get('fsym')	
            tsym = "BTC"
            e = request.args.get('e')
            limit = request.args.get('limit')	
            url = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + fsym + '&tsym=' + tsym +'&limit=' + limit + '&e='+e
            return jsonify({"response":requests.get(url).json(), "statusCode" : 200})
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            print(message)
            return jsonify({"response":{}, "statusCode": 404})

@app.route('/getbalance', methods=['GET'])
def get_balance():
    if request.method == 'GET':
        try:
            apiKey = request.args.get('apiKey')
            currencyName = request.args.get('currencyName')
            nonce = str(int(time.time() * 1000))
            url = 'https://bittrex.com/api/v1.1/account/getbalance?apikey='+ apiKey + '&currency='+currencyName+'&nonce='+nonce
            response = requests.get(url, headers={"apisign": hmac.new(API_SECRET.encode(), url.encode(), hashlib.sha512).hexdigest()}).json()
            return jsonify({"response": response, "statusCode": 200})
        except Exception:
            return jsonify({"response": {}, "statusCode": 404})

@app.route('/getcurrencies', methods=['GET'])
def get_currencies():
    if request.method == 'GET':
        try:
            url = 'https://bittrex.com/api/v1.1/public/getcurrencies'
            response = requests.get(url).json()
            currencies = [x["Currency"] for x in response["result"]]
            return jsonify({"response": currencies, "statusCode": 200})
        except Exception:
            return jsonify({"response": {}, "statusCode": 404})

@app.route('/getavgspreads', methods=['GET'])
def get_avg_spreads():
    if request.method == 'GET':
        try:
            depth = 1 #bittrex depth param
            N = 5 # consider first N entries in order books
            SAMPLE = 5 #serve at most SAMPLE results.
            final_obj = {}
            semaphore = BoundedSemaphore(1) #mutual exclusion on final_obj
            random.shuffle(currencies) # shuffle array before taking random samples
            @copy_current_request_context
            def fetch_and_write(currency, depth, N, semaphore, final_obj):
                url = 'https://bittrex.com/api/v1.1/public/getorderbook?market=BTC-' + currency + '&type=both&depth='+ str(depth)
                try:
                    response = requests.get(url).json()
                    bid_list = [bid["Rate"] for bid in response["result"]["buy"]][:N]
                    bid_avg = sum(bid_list) / len(bid_list)
                    ask_list = [ask["Rate"] for ask in response["result"]["sell"]][:N]
                    ask_avg = sum(ask_list) / len(ask_list)
                    perc_diff = ((ask_avg - bid_avg) / bid_avg ) * 100
                    semaphore.acquire()
                    final_obj[currency] = perc_diff
                    semaphore.release()
                except Exception as ex:
                    template = "An exception of type {0} occurred. Arguments:\n{1!r}"
                    message = template.format(type(ex).__name__, ex.args)
                    print(message, currency)

            jobs = [gevent.spawn(fetch_and_write, currency, depth, N, semaphore, final_obj) for currency in currencies[:SAMPLE] if currency != 'BTC']
            gevent.wait(jobs)
            return jsonify({"response": final_obj, "statusCode": 200})
            
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            message = template.format(type(ex).__name__, ex.args)
            print(message)

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, threaded=True)
