import React, { useRef } from 'react';
import { message } from 'antd';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import cloudImage from '../../assets/images/cloud-arrow-up.svg';
import CustomBtn from '../button';
import { addBulkProducts } from '../../redux/slices/products';
import Cross from '../../assets/images/close.svg';

import './style.css';

const CustomModal = ({
  fileName,
  setFileName,
  show,
  setShow,
  setImportBulkDiv,
  bulkProducts,
  setBulkProducts
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleClose = () => setShow(false);

  const handleDeleteFile = () => {
    setFileName('');
    setBulkProducts([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    dispatch(addBulkProducts({ bulkProducts }));
    setImportBulkDiv(true);
    handleClose();
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile?.type === 'text/csv') {
      setFileName(selectedFile.name);
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        const text = event.target.result;
        const rows = text.split('\n');

        if (rows.length > 0) {
          const newBulkProducts = rows.slice(1).map((row) => row.split(','));

          setBulkProducts(newBulkProducts);
        }
      };

      fileReader.readAsText(selectedFile);
    } else {
      message.error('Please select a valid CSV file.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Import Bulk Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bulk-upload">
          <img src={cloudImage} alt="Cloud" className="mb-3" />
          {fileName ? (
            <p className="text-style" style={{ color: 'green' }}>{fileName}</p>
          ) : (
            <p className="text-style">Please browse a .csv file</p>
          )}
          {fileName ? (
            <img
              style={{ cursor: 'pointer' }}
              src={Cross}
              alt="Arrow Left"
              className="pe-2"
              onClick={handleDeleteFile}
            />
          ) : (
            <CustomBtn
              className="mt-3"
              btnText="Browse"
              onClick={handleBrowseClick}
            />
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelected}
            multiple={false}
            accept=".csv"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <CustomBtn className="mt-3" btnText="Save" onClick={handleSave} />
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
