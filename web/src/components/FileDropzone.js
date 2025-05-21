import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from 'react-icons/fa';
import './FileDropzone.css';

const FileDropzone = ({ onChange }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: { 'application/pdf': [] },
    onDrop: (files) => {
      if (files.length > 0) {
        setAcceptedFiles(files);

        const fakeEvent = {
          target: {
            files: [files[0]]
          }
        };
        onChange && onChange(fakeEvent);
      }
    }
  });

  useEffect(() => {
    if (containerRef.current && acceptedFiles.length === 0) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [acceptedFiles]);

  return (
    <section className="dropzone-container">
      {acceptedFiles.length === 0 ? (
        <div
          {...getRootProps({
            className: `upload-box ${
              isDragAccept ? 'accept' : isDragReject ? 'reject' : ''
            }`,
          })}
          ref={containerRef}
        >
          <input {...getInputProps()} />
          <p className="dropzone-message">
            {isDragReject
              ? 'This format is not supported'
              : 'Drag & drop a PDF file, or click to select one'}
          </p>
        </div>
      ) : (
        <div
          className="upload-box file-preview-container"
          style={{ width: dimensions.width }}
        >
          {acceptedFiles.map((file) => (
            <div className="file-preview" key={file.name}>
              <FaFileAlt className="file-icon" />
              <p className="file-name">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FileDropzone;
