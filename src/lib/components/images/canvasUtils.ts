/**
 * @author Valentin Hervieu
 * https://codesandbox.io/s/y09komm059?file=/src/canvasUtils.js
 */

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  
  function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
  }
  
  /**
   * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
   * @param {string} imageSrc - Image File url
   * @param {Object} pixelCrop - pixelCrop Object provided by svelte-easy-crop
   * @param {number} [rotation=0] - optional rotation parameter
   * @returns {Promise<string>} - A promise that resolves to a URL of the cropped image
   */
  export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation: number = 0
  ): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('2D context not supported or canvas already initialized');
    }
  
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
  
    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;
  
    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
  
    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);
  
    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // paste generated rotate image with correct offsets for x, y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );
  
    // As a blob
    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file!));
      }, 'image/png');
    });
  }
  
  /**
   * Get the rotated image
   * @param {string} imageSrc - Image File url
   * @param {number} [rotation=0] - Rotation in degrees
   * @returns {Promise<string>} - A promise that resolves to a URL of the rotated image
   */
  export async function getRotatedImage(
    imageSrc: string,
    rotation: number = 0
  ): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('2D context not supported or canvas already initialized');
    }
  
    const orientationChanged =
      rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
    if (orientationChanged) {
      canvas.width = image.height;
      canvas.height = image.width;
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }
  
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
  
    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve(URL.createObjectURL(file!));
      }, 'image/png');
    });
  }
  