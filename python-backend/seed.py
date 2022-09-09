from prisma import Prisma
import code
from datetime import datetime

def main() -> None:
    # Board size: 50 x 50

    with Prisma() as db:
        for i in range(0,2500):
            print(f"adding pixel: {i}")
            db.pixel.create(data={"color": "#ffffff"})

if __name__ == '__main__':
    main()