from prisma import Prisma
import code
from datetime import datetime

def main() -> None:
    db = Prisma()
    db.connect()

    # write your queries here
    code.interact(local=dict(globals(), **locals()))
# db.pixel.create({
#     "id": 1234,
#     "color": "test123",
#     "purchases": [],
#     "updatedAt": datetime.now()
# })
    db.disconnect()

if __name__ == '__main__':
    main()