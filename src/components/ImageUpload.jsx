import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

function ImageUploader(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

   const importFile = async (e) => {
     const formData = new FormData();
     formData.append('files', files);
     try {
      //  const res = await axios.post(
      //    'https://localhost:44343/api/ImageUpload',
      //    formData
      //  );
      fetch('https://localhost:44343/api/ImageUpload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
     } catch (ex) {
       console.log(ex);
     }
   };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <Button
        size='sm'
        variant='outline-warning'
        onClick={importFile}>
        Upload
      </Button>
      {/* <input type='button' value='upload' onClick={importFile} /> */}
    </section>
  );
}

export default ImageUploader
