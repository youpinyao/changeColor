webpackJsonp([0],{0:function(t,e,a){t.exports=a("f1WI")},f1WI:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}a("W/N8");var o=a("MYwM"),i=n(o),r=a("lVK7"),c=n(r),s=document.getElementById("image").src,u=new c["default"]({imageUrl:s});new i["default"]({color:"#ff0000",background:"#000000",el:document.getElementById("color"),width:200,height:200}).onChange(function(t){u.setColor(t).then(function(t){document.getElementById("image").setAttribute("src",t)})})},lVK7:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=a("A/Xc"),r=n(i),c=a("9Otz"),s=n(c),u=function(){function t(e){var a=e.imageUrl;o(this,t),this.imageUrl=a}return t.prototype.defer=function(){var t={},e=new r["default"](function(e,a){t.resolve=e,t.reject=a});return t.promise=e,t},t.prototype.setColor=function(t){var e=this,a=this.defer(),n=(0,s["default"])(t);return this.loadImage().then(function(t){e.drawCanvas(t).then(function(t){var o=t.ctx,i=t.imageData,r=[],c=0;i.data.forEach(function(t,e){e%4==0&&(r.push([]),c=0),r[r.length-1][c]=t,c++}),r.forEach(function(t,e){0===t[0]&&0===t[1]&&0===t[2]&&0===t[3]||(r[e]=n.color.concat(255*n.valpha))}),r.forEach(function(t,e){t.forEach(function(t,a){i.data[4*e+a]=t})}),e.setImageData(i),a.resolve(o.canvas.toDataURL())})}),a.promise},t.prototype.setImageData=function(t){this._imageData=t,this._ctx.putImageData(t,0,0,0,0,this._loadedImage.width,this._loadedImage.height)},t.prototype.drawCanvas=function(t){var e=this,a=this.defer();if(this._ctx)return setTimeout(function(){a.resolve({imageData:e._imageData,ctx:e._ctx})}),a.promise;var n=document.createElement("canvas"),o=n.getContext("2d");return this._canvas=n,this._ctx=o,n.setAttribute("width",t.width),n.setAttribute("height",t.height),o.drawImage(t,0,0,t.width,t.height,0,0,t.width,t.height),this._imageData=o.getImageData(0,0,t.width,t.height),a.resolve({imageData:this._imageData,ctx:this._ctx}),a.promise},t.prototype.loadImage=function(){var t=this,e=this.imageUrl,a=this.defer(),n=new window.Image;return this._loadedImage?(setTimeout(function(){a.resolve(t._loadedImage)}),a.promise):(n.onload=function(){a.resolve(n),t._loadedImage=n},n.onerror=function(){a.reject()},n.src=e,a.promise)},t}();e["default"]=u}},[0]);