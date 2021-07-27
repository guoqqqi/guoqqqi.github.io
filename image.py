from PIL import Image
import os


def remove_transparency(im, bg_colour=(255, 255, 255)):
    # Only process if image has transparency (http://stackoverflow.com/a/1963146)
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        # Need to convert to RGBA if LA format due to a bug in PIL (http://stackoverflow.com/a/1963146)
        alpha = im.convert('RGBA').split()[-1]

        # Create a new background image of our matt color.
        # Must be RGBA because paste requires both images have the same format
        # (http://stackoverflow.com/a/8720632  and  http://stackoverflow.com/a/9459208)
        bg = Image.new("RGBA", im.size, bg_colour + (255,))
        bg.paste(im, mask=alpha)
        return bg
    else:
        return im


g = os.walk("website/static/img/showcase")

for path, dir_list, file_list in g:
    for file_name in file_list:
        if file_name.endswith("svg"):
            continue
        file_path = os.path.join(path, file_name)
        print(file_path + "\n")
        im = Image.open(file_path)
        img = remove_transparency(im)
        img.save(file_path)
