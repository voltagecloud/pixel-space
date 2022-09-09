from flask import Flask, request
import requests
from prisma import Prisma
import json


app = Flask(__name__)

lnbits_url = "https://851ac819d2.d.voltageapp.io"
lnbits_header = {"X-Api-Key": "4e8c1512e3ed43edbc42fdcac30829a0"}


@app.route("/purchase", methods=['POST'])
def purchase():
    # create a purchase for given pixels and color
    return "<p>Hello, World!</p>"

@app.route("/payment/create", methods=['POST'])
def create_invoice(purchaseId):

    request = {"out": False, "amount": 69, "memo": "test", "unit": "sats"}
    lnbits_invoice = requests.post(
        f"{lnbits_url}/api/v1/payments",
        headers=lnbits_header,
        json=request
    )
    # given purchaseId and amount, fetch invoice via lnbits
    return "<p>Hello, World!</p>"   

@app.route("/payment/check", methods=['POST'])
def check():
    # given payment hash, check paid status
    data = request.json
    print(data)
    payment_hash = data["payment_hash"]
    lnbits_invoice = requests.get(
        f"{lnbits_url}/api/v1/payments/{payment_hash}",
        headers=lnbits_header
    ).json()

    is_paid = lnbits_invoice["paid"]
    return json.dumps({"paid": is_paid})

@app.route("/payment/<purchaseId>", methods=['POST'])
def status(purchaseId):
    # given hash of paid payment, complete the purchase
    return f"<p>Hello, {purchaseId}!</p>"


@app.route("/grid", methods=['GET'])
def grid():
    with Prisma() as db:
        pixels = db.pixel.find_many(take=2500)

    count = len(pixels)
    colors = [pixel.color for pixel in pixels ]

    return json.dumps({"size": count, "pixelColors": colors})