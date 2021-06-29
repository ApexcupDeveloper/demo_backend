import sharp from "sharp";

export const getImageSize = async (image: string): Promise<{ width: number, height: number }> => {
    let tempImage = 'tempImage.png'
    const response: any = await sharp(image).resize().toFile(tempImage)
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
    let tempImage = 'tempImage.png'
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