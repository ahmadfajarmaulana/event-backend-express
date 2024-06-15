import { NotFoundError } from '../Helpers/errors';
import { Image, ImageInterface } from '../schemas/Image';
import { ImageInput } from '../types/ImageType';


export const generateImageUrl = (file: Express.Multer.File): string => {
    const result = file.filename;
    return result;
}

export const upload = async (file: Express.Multer.File): Promise<ImageInterface | null> => {
    const payload: ImageInput = {
        name: file ? `uploads/${file.filename}` : `uploads/avatar/default.png`
    };

    const image = new Image(payload);

    const result = await image.save();
    return result;
}

export const checkImage = async (id: string): Promise<ImageInterface | null> => {
    const image = await Image.findById(id);

    if (!image) {
        throw new NotFoundError('Image not found with id : ' + id);
    }

    return image;
}
