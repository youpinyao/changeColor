import 'simple-color-picker/src/simple-color-picker.css';
import ColorPicker from 'simple-color-picker';
import ChangeColor from '../../src';

console.log(ChangeColor);

const imageUrl = document.getElementById('image').src;

const changeColor = new ChangeColor({
  imageUrl,
});

const colorPicker = new ColorPicker({
  color: '#ff0000',
  background: '#000000',
  el: document.getElementById('color'),
  width: 200,
  height: 200
});

colorPicker.onChange(d => {
  changeColor.setColor(d).then(dataUrl => {
    document.getElementById('image').setAttribute('src', dataUrl);
  });
});
