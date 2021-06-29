import sharp from "sharp";
import path from "path";

export const getImageSize = async (image: string): Promise<{ width: number, height: number }> => {
    let tempImage1 = path.join(__dirname, '../../tempImage1.png')
    const response: any = await sharp(image).resize().toFile(tempImage1)
        .then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
    return {
        width: response.width,
        height: response.height
    }
}

export const resizeImage = async (image: string, width: number, height: number): Promise<string> => {
    let tempImage = path.join(__dirname, '../../tempImage.png')
    const response: any = await sharp(image).resize(width, height, {
        fit: 'fill'
    }).toFile(tempImage)
        .then((res) => {
            return res;
        }).catch((err) => {
            return err;
        })
    return response;
}