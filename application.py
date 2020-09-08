import requests
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/convert", methods=["POST"])
def convert():
  # get data from index.html form
  currency = request.form.get("currency")
  # query for currency exchange rate
  res = requests.get("https://v6.exchangerate-api.com/v6/683a03901bda1750a206b548/latest/USD",
  params={"base_code": "USD", "symbols": currency})
  # check query return status
  if res.status_code != 200:
    return jsonify({"success": False})
  # jsonify return data
  data = res.json()
  print(data)
  print(data["conversion_rates"][currency])
  if currency not in data["conversion_rates"]:
    return jsonify({"success": False})

  # return json object
  return jsonify({"success": True, "rate": data["conversion_rates"][currency]})
