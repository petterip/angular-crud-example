/**
 * An example of using ResebleJS library for comparing a given image against a static one.
 *
 * See:
 * https://github.com/rsmbl/Resemble.js
 */
import { compare } from 'resemblejs';

const BASELINE_IMAGE = 'assets/sample.jpg';

export function getDiff(userImageFile: File): Promise<any> {
  return Promise.all([
    fetch(BASELINE_IMAGE).then(response => response.blob()),
    fileReader(userImageFile)
  ]).then(result => {
    const imageBlob: Blob = result[0];
    const event: Event = result[1];
    const fileTarget: FileReader = event.target as FileReader;
    const baseLineImage = URL.createObjectURL(result[0]);
    const userImage = fileTarget.result;

    return processImages(userImage, baseLineImage);
  });
}

function fileReader(file: File): Promise<Event> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = resolve;
    reader.readAsDataURL(file);
  });
}

function processImages(image1: any, image2: any): Promise<any> {
  const options = {
    // Stop comparing once determined to be >75% non-matching; this will
    // also enable compare-only mode and no output image will be rendered;
    // the combination of these results in a significant speed-up in batch processing
    returnEarlyThreshold: 75,
    scaleToSameSize: true,
    ignore: ['colors', 'antialiasing']
  };

  return new Promise((resolve, reject) => {
    // Feed the images to ResemberJS compare function
    compare(image1, image2, options, (err, data) => {
      if (err) {
        // Image comparison failed, return the error
        reject(err);
      } else {
        // Image comparison succeeded, return the match percentage
        console.warn('!!MATCH:', 100 - data.misMatchPercentage);
        resolve(100 - data.misMatchPercentage);
      }
    });
  });
}
