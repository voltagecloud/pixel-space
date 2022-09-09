from prisma import Prisma
import code
from datetime import datetime

import webcolors
from PIL import Image

webcolors.rgb_to_hex((61, 34, 57))

def main() -> None:
    # Board size: 50 x 50
    img = Image.open("../pepe.png")
    img = img.convert("RGB")
    colors_rgb = list(img.getdata())
    colors_hex = [webcolors.rgb_to_hex(rgb) for rgb in colors_rgb ]

    with Prisma() as db:
        for i in colors_hex:
            print(f"adding pixel: {i}")
            db.pixel.create(data={"color": i})

if __name__ == '__main__':
    main()