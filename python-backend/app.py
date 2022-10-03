from flask import Flask, request
import requests
from prisma import Prisma
import json
import uuid


app = Flask(__name__)

lnbits_url = "https://851ac819d2.d.voltageapp.io"
lnbits_header = {
    "X-Api-Key": "4e8c1512e3ed43edbc42fdcac30829a0",
}

#   https://851ac819d2.d.voltageapp.io/wallet?usr=87e41eb2c04b4789a1d5c01eef06fec8&wal=cc7173f640a140d69517b305de49e48f

@app.route("/", methods=["GET"])
def hello_world():
    print("inside hello_world")
    return "hello-world"

@app.route("/purchase", methods=["POST"])
def purchase():
    """
        When the user wants to select a set of pixels to color, they use this API. It is just returns a 
    purchase order id, which can then be used to create a payment request.

    request: { pixels: [0,21,66], color: '#ff0066' }
    response: { purchaseId: '123-456-789' }
    """
    print("inside purchase")

    # get data from POST body
    data = request.json
    print(data)

    # Create Purchase Object
    with Prisma() as db:
        purchase = db.purchase.create(
            data={"color": data["color"], "pixels": {"connect": [{"id":1},{"id":2}]}, "complete": False},
            include={"pixels": True}
        )
    
    print("Created a purchse")
    print(purchase)
    purchase_id = purchase.id
    response = { "purchaseId": purchase_id }

    # make a purchase object
    return response


@app.route("/payment/create", methods=["POST"])
def create_invoice():
    """
        When the user wants to pay for their pixels, they can use this endpoint to generate a lightning,
    payment request. The user is allowed to specify a larger amount than the number of pixels as a donation.
    request: { purchaseId: '123-456-789', amount: 150 }
    response: { hash: 'abcd…', request: 'lnbc…' }
    """
    print("inside create_invoice")
    # get data from POST body
    data = request.json
    print(data)

    purchase_id = data["purchaseId"]
    amount = data["amount"]

    # Create a lightning invoice
    invoice_details = {
        "out": False,
        "amount": amount,
        "memo": purchase_id,
        "unit": "sat",
        "webhook": "http://35.93.109.236:5000/webhook"
    }
    lnbits_invoice = requests.post(
        f"{lnbits_url}/api/v1/payments", headers=lnbits_header, json=invoice_details
    ).json()
    print(lnbits_invoice)
    payment_hash = lnbits_invoice["payment_hash"]
    response = {
        "hash": payment_hash,
        "request": lnbits_invoice["payment_request"]
    }

    # Create Payment Object and Link payment object to purchase object
    with Prisma() as db:
        db.payment.create(
            data={"memo": {"connect": {"id": purchase_id}}, "hash": payment_hash, "amount": amount, "paid": False},
            include={"memo": True}
        )

    # return
    return json.dumps(response)


@app.route("/payment/check", methods=["POST"])
def check():
    """
    request: { hash: 'abcd…' }
    response: { paid: false }
    """

    print("inside check")
    # get data from POST body
    data = request.json
    print(data)

    payment_hash = data["hash"]

    with Prisma() as db:
        payment = db.payment.find_unique(where={"hash": payment_hash})

    if not payment:
        return "not found", 404

    is_paid = payment.paid
    
    # Check paid status from lnbits
    
    # Write to database if it is paid

    return json.dumps({"paid": is_paid})


@app.route("/grid", methods=["GET"])
def grid():
    """
    response: { cols: 100, pixels: ['#aabbcc', '#aabbcc', '…'] }
    """
    # TODO: Read config file
    print("inside grid")

    with Prisma() as db:
        pixels = db.pixel.find_many(take=2500)

    count = len(pixels)
    colors = [pixel.color for pixel in pixels]

    # TODO: Get the number of columns from some kind of config file
    return json.dumps({"cols": count, "pixels": colors})

@app.route("/webhook", methods=["GET", "POST"])
def webhook():
    print("received a webook event!")
    print(request)
    args = request.args
    data = request.json
    print(data)


    payment_hash = data["payment_hash"]


    with Prisma() as db:
        # Mark payment as paid
        payment = db.payment.find_unique(
            where={"hash": payment_hash}
        )
        if payment is None:
            return "unknown", 404
        db.payment.update(data={"paid": True}, where={"hash": payment.hash})
        # Mark purchase as completed
        purchase_id = payment.purchaseId
        purchase = db.purchase.find_unique(
            where={"id": purchase_id},
            include={"pixels": True}
        )
        db.purchase.update(data={"complete": True}, where={"id": purchase_id})
        # TODO: Draw pixels
        pixels = purchase.pixels
        print(purchase)
        for pix in pixels:
            print(pix.id)
            print(pix.color)
    print(args)
    return "success"