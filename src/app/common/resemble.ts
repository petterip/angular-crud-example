/**
 * An example of using ResebleJS library for comparing a given image against a static one.
 */
import { compare } from 'resemblejs';

const COMPARISON_IMAGE = 'assets/retina_2.jpg';

export function getDiff(compareImage: File): Promise<any> {
  return Promise.all([
    fetch('assets/retina_2.jpg').then(response => response.blob()),
    fileReader(compareImage)
  ]).then(result => {
    const blob: Blob = result[0]
    const event: Event = result[1]
    const fileReader: FileReader = event.target as FileReader
    const img1 = URL.createObjectURL(blob)
    const img2 = fileReader.result

    return processImages(img2, img1)
  });
}

function fileReader(file: File): Promise<Event> {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = resolve;  // CHANGE to whatever function you want which would eventually call resolve
    fr.readAsDataURL(file);
  });
}

function processImages(image1: any, image2: any): Promise<any> {
  const options = {
    // stop comparing once determined to be > 5% non-matching; this will
    // also enable compare-only mode and no output image will be rendered;
    // the combination of these results in a significant speed-up in batch processing
    returnEarlyThreshold: 50,
    scaleToSameSize: true,
    ignore: ["colors", "antialiasing"]
  };

  return new Promise((resolve, reject) => {
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    compare(image1, image2, options, function (err, data) {
      if (err) {
        console.log("RESEMBLE, error!", err);
        reject(err);
      } else {
        console.log("RESEMBLE COMPARISON: ", data);
        resolve(data);
        /*
        {
        misMatchPercentage : 100, // %
        isSameDimensions: true, // or false
        dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
        getImageDataUrl: function(){}
        }
        */
      }
    });
  });
}
