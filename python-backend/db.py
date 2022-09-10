from prisma import Prisma
import code
from datetime import datetime


def main() -> None:
    # db = Prisma(
    #     http={
    #         'timeout': 10,
    #     },
    # )

    with Prisma() as db:
        # db.connect()

        # write your queries here
        code.interact(local=dict(globals(), **locals()))
    # db.pixel.create({
    #     "id": 1234,
    #     "color": "test123",
    #     "purchases": [],
    #     "updatedAt": datetime.now()
    # })
    db.pixel.upsert(where={"id": 0}, data={"create": {}, "update": {}})
    db.pixel.create(data={})
    db.pixel.query_raw(query="SELECT * FROM Pixel")
    db.pixel.find_many(take=5)
    apixel = db.pixel.find_many(take=5)[0]

    db.purchase.create(data={"color": "red"})
    db.purchase.create(data={"color": "red", "complete": False})
    db.purchase.create(
        data={
            "color": "red",
            "complete": False,
            "pixels": {"connect": [{"id": 1}, {"id": 2}]},
        }
    )
    db.disconnect()


if __name__ == "__main__":
    main()
