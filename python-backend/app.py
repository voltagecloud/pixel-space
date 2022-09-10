from flask import Flask, request
import requests
from prisma import Prisma
import json
import uuid


app = Flask(__name__)

lnbits_url = "https://851ac819d2.d.voltageapp.io"
lnbits_header = {"X-Api-Key": "4e8c1512e3ed43edbc42fdcac30829a0"}


@app.route("/purchase", methods=["POST"])
def purchase():
    """
    request: { pixels: [0,21,66], color: '#ff0066' }
    response: { purchaseId: '123-456-789' }
    """
    # get data from POST body
    data = request.json
    print(data)

    # TODO: Create Purchase Object
    # with Prisma() as db:
    #     db.purchase.create(data={"color": data["color"], "pixels": {"connect": [{"id":0},{"id":2}]}, "complete": False})
    
    # TODO: Remove this dummy
    purchase_id = str(uuid.uuid4())
    response = { "purchaseId": purchase_id }

    # make a purchase object
    return response


@app.route("/payment/create", methods=["POST"])
def create_invoice():
    """
    request: { purchaseId: '123-456-789', amount: 150 }
    response: { hash: 'abcd…', request: 'lnbc…' }
    """
    # get data from POST body
    data = request.json
    print(data)

    # Create a lightning invoice
    invoice_details = {"out": False, "amount": 69, "memo": data["purchaseId"], "unit": "sats"}
    lnbits_invoice = requests.post(
        f"{lnbits_url}/api/v1/payments", headers=lnbits_header, json=invoice_details
    )
    response = {"hash": lnbits_invoice["payment_hash"], "request": lnbits_invoice["payment_request"]}


    # TODO: Create Payment Object
    # purchase_id = data["purchaseId"]
    # with Prisma() as db:
    #     db.payment.create(data={"purchaseId": purchase_id, "memo": {"connect": purchase_id }})

    # return
    return response


@app.route("/payment/check", methods=["POST"])
def check():
    """
    request: { hash: 'abcd…' }
    response: { paid: false }
    """

    # get data from POST body
    data = request.json
    print(data)

    payment_hash = data["payment_hash"]
    lnbits_invoice = requests.get(
        f"{lnbits_url}/api/v1/payments/{payment_hash}", headers=lnbits_header
    ).json()

    is_paid = lnbits_invoice["paid"]

    return json.dumps({"paid": is_paid})


@app.route("/grid", methods=["GET"])
def grid():
    """
    response: { cols: 100, pixels: ['#aabbcc', '#aabbcc', '…'] }
    """
    with Prisma() as db:
        pixels = db.pixel.find_many(take=2500)

    count = len(pixels)
    colors = [pixel.color for pixel in pixels]

    # TODO: Get the number of columns from some kind of config file
    return json.dumps({"cols": count, "pixels": colors})
