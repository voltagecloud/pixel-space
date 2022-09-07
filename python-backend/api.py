from flask import Flask
import requests


app = Flask(__name__)

@app.route("/purchase")
def purchase():
    # create a purchase for given pixels and color
    return "<p>Hello, World!</p>"

@app.route("/payment/create")
def create_invoice(purchaseId):
    # given purchaseId and amount, fetch invoice via lnbits
    return "<p>Hello, World!</p>"   

@app.route("/payment/check")
def check():
    # given payment hash, check paid status
    return "<p>Hello, World!</p>"

@app.route("/payment/<purchaseId>")
def check(purchaseId):
    # given hash of paid payment, complete the purchase
    return f"<p>Hello, {purchaseId}!</p>"

