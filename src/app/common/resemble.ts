declare var require: any

// const compare = require("resemblejs").compare;

import { compare } from 'resemblejs';

const image2 = require("../../assets/compare.png");

// function loadImage(image: any, src: string) {
//   return new Promise(resolve => {
//     image.onload = () => resolve();
//   });
//   image.src = require(src);
// }

// let imagesUrls = ['asd', 'asd2'];
// let images = [new Image(), new Image()];
// Promise.all(images.map((e, i) => loadImage(e, imagesUrls[i]))).then(() => {
//   // your code here
// });

// fetch(image2)
//   .then(response => response.blob())
//   .then(images => {
//     // Then create a local URL for that image and print it
//     outside = URL.createObjectURL(images)
//     console.log(outside)
//   })

export function getDiff(image1: File): Promise<any> {
  return Promise.all([
    fetch('assets/retina_2.jpg').then(response => response.blob()),
    fileReader(image1)
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
