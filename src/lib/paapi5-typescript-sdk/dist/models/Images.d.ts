export declare type ImageType = 'Primary' | 'Variants';
export declare type ImageSize = 'Small' | 'Medium' | 'Large';
export interface ImageData {
    URL: string;
    Height: string;
    Width: string;
}
export declare type Images = {
    [K in ImageType]?: {
        [KK in ImageSize]?: ImageData;
    };
};
export declare type ImagesResource = `Images.${ImageType}.${ImageSize}`;
