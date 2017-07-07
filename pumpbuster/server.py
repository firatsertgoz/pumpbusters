from flask import Flask, request, jsonify
import json
import re
from flask_cors import CORS, cross_origin
import requests
import time
import hmac
import hashlib

app = Flask(__name__)
CORS(app)
HOST = "127.0.0.1"
PORT = 5000
API_SECRET = ""

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
            fsym = request.args.get('fysm')	
            tsym = request.args.get("tsym")	
            e	 = request.args.get('e')
            limit = request.args.get('limit')	
            url = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + fsym + '&tsym=' + tsym +'&limit=' + limit + '&e='e
            return jsonify({"response":request.get(url).json(),statusCode : 200})
        except Exception
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

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, threaded=True)
