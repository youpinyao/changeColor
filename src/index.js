import Promise from 'promise';
import Color from 'color';

class ChangeColor {
  constructor({
    imageUrl
  }) {
    this.imageUrl = imageUrl;
  }

  defer() {
    const deferred = {};
    const promise = new Promise(function(resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    deferred.promise = promise;

    return deferred;
  }

  setColor(color) {
    const deferred = this.defer();
    const colorObj = Color(color);

    this.loadImage().then(image => {
      this.drawCanvas(image).then(({
        ctx,
        imageData,
      }) => {

        const colors = [];
        let index = 0;

        // 转换数组
        imageData.data.forEach((d, i) => {
          if (i % 4 === 0) {
            colors.push([]);
            index = 0;
          }
          colors[colors.length - 1][index] = d;
          index++;
        });

        // 转换颜色
        colors.forEach((d, i) => {
          if (d[0] !== 0 || d[1] !== 0 || d[2] !== 0 || d[3] !== 0) {
            colors[i] = colorObj.color.concat(colorObj.valpha * 255);
          }
        });

        // 还原数组
        colors.forEach((d, i) => {
          d.forEach((dd, ii) => {
            imageData.data[i * 4 + ii] = dd;
          });
        });

        this.setImageData(imageData);

        deferred.resolve(ctx.canvas.toDataURL());
      });
    });

    return deferred.promise;
  }

  setImageData(imageData) {
    this._imageData = imageData;
    this._ctx.putImageData(imageData, 0, 0, 0, 0, this._loadedImage.width, this._loadedImage.height);
  }

  drawCanvas(image) {
    const deferred = this.defer();

    if (this._ctx) {
      setTimeout(() => {
        deferred.resolve({
          imageData: this._imageData,
          ctx: this._ctx,
        });
      });
      return deferred.promise;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    this._canvas = canvas;
    this._ctx = ctx;

    canvas.setAttribute('width', image.width);
    canvas.setAttribute('height', image.height);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
    this._imageData = ctx.getImageData(0, 0, image.width, image.height);

    deferred.resolve({
      imageData: this._imageData,
      ctx: this._ctx,
    });

    return deferred.promise;
  }

  loadImage() {
    const src = this.imageUrl;
    const deferred = this.defer();
    const image = new window.Image();

    if (this._loadedImage) {
      setTimeout(() => {
        deferred.resolve(this._loadedImage);
      });
      return deferred.promise;
    }

    image.onload = () => {
      deferred.resolve(image);
      this._loadedImage = image;
    };

    image.onerror = () => {
      deferred.reject();
    };

    image.src = src;

    return deferred.promise;

  }

}

export default ChangeColor;
