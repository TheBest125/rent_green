/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import UploadFile from '../components/UploadFile';
import { fileName, UploadImage } from '../helpers/uploadImage';
import { addItem } from '../redux/item/itemReducer';
import history from '../helpers/history';
import './NewItemPage.css';

function NewItemPage() {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (redirect) {
      history.navigate('/');
    }
  }, [redirect]);

  const onSubmit = (item) => {
    setRedirect(true);
    const name = item.name.trim();
    const description = item.description.trim();
    const range = item.range.trim();
    if (name && description && range && selectedFile) {
      const item = {
        name, description, range, photo: fileName(selectedFile),
      };
      UploadImage(selectedFile, setProgress, reset, dispatch(addItem(item)));
    }
  };

  return (
    <div className="formcontainer">
      <h1>Add Your Green</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            Name:
            <input
              className="formitem"
              type="text"
              {...register('name')}
              id="name"
              name="name"
              required
              minLength="2"
              maxLength="30"
            />
          </label>
        </div>

        <div>
          <label htmlFor="description">
            Description:
            <input
              className="formitem"
              type="text"
              {...register('description')}
              id="description"
              name="description"
              required
              minLength="2"
              maxLength="200"
            />
          </label>
        </div>

        <div>
          <label htmlFor="range">
            Range:
            <input
              className="formitem"
              type="text"
              {...register('range')}
              id="range"
              name="range"
              required
              minLength="2"
              maxLength="200"
            />
          </label>
        </div>

        <div>
          <UploadFile setSelectedFile={setSelectedFile} progress={progress} />
        </div>

        <button className="sbutton" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewItemPage;
