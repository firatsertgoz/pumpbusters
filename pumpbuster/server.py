from flask import Flask, request, jsonify
import json
from bson.json_util import loads
import re
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
CORS(app)
HOST = "127.0.0.1"
PORT = 5000

@app.route('/getmarketsummary', methods=['GET'])
def job_by_id():
    if request.method == 'GET':
        try:
            market = request.args.get('market')
            url = 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-'+market
            return jsonify({"response": requests.get(url).json(), "statusCode": 200})
        except Exception:
            return jsonify({"response": {}, "statusCode": 404})



if __name__ == "__main__":
    app.run(host=HOST, port=PORT, threaded=True)
