import React from 'react';
import './TextEditor.scss';
import { useDispatch, useSelector } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
Font.whitelist = ['Montserrat', 'Roboto', 'Raleway', 'Lato', 'Rubik'];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }, { font: Font.whitelist }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean', { align: [] }],
    [{ color: [] }, { background: [] }],
  ],
};
const formats = [
  'header',
  'font',
  'color',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'size',
  'background',
  'align',
];

function TextEditor({ onChange, isEditing, value }) {
  const winWidth = window.innerWidth;

  const style = () => {
    if (winWidth <= 600) {
      return { width: '100%' };
    } else {
      return;
    }
  };

  return (
    <>
      <ReactQuill
        value={value}
        onChange={onChange}
        // placeholder="Введите текст"
        modules={modules}
        formats={formats}
        readOnly={isEditing ? false : true}
        theme={isEditing ? 'snow' : 'bubble'}
        style={style()}
      />
    </>
  );
}

export default TextEditor;
