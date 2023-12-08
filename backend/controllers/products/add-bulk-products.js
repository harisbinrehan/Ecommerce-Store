import Product from '../../models/product';

const AddBulkProducts = async (req, res) => {
  try {
    const productsData = req.body.bulkProducts;

    const errorArr = [];

    let writeData = [];

    let successfulUploads = 0;

    let failedUploads = 0;

    for (let i = 0; i < productsData.length - 1; i += 1) {
      const [name, size, color, price, quantity, date, images] = productsData[i];

      const missingFields = [];

      if (!name) missingFields.push('Name');
      if (!size) missingFields.push('Size');
      if (!color) missingFields.push('Color');
      if (!quantity) missingFields.push('Quantity');
      if (!price) missingFields.push('Price');
      if (!date) missingFields.push('Date');
      if (!images) missingFields.push('Images');

      if (missingFields.length > 0) {
        errorArr.push({
          row: i + 2,
          message: `Missing fields: ${missingFields.join(', ')}`
        });
        failedUploads++;
      }

      const productDate = new Date(date);
      const imageArray = images.split('\r\n').filter(Boolean);

      const productPrice = parseFloat(price);
      const isValidPrice = /^\d+(\.\d{1,2})?$/.test(price) && productPrice >= 0;

      const productStock = parseFloat(quantity);
      const isValidStock = Number.isInteger(productStock) && productStock >= 0;

      if (!isValidPrice) {
        errorArr.push({
          row: i + 2,
          message:
            'Price should be a non-negative and can have 2 decimal places'
        });
        failedUploads++;
      }

      if (!isValidStock) {
        errorArr.push({
          row: i + 2,
          message: 'Quantity should be a non-negative integer value'
        });
        failedUploads++;
      }

      writeData.push({
        insertOne: {
          document: {
            name,
            size,
            color,
            quantity,
            price,
            date: productDate,
            sold: 0,
            images: imageArray
          }
        }
      });

      successfulUploads++;

      if (writeData.length >= 2) {
        try {
          Product.bulkWrite(writeData);
        } catch (err) {
          console.error('Bulk write error:', err);
        }
        writeData = [];
      }
    }

    if (writeData.length) {
      try {
        await Product.bulkWrite(writeData);
      } catch (err) {
        console.error('Bulk write error:', err);
      }
    }

    const bulkUploadResult = {
      errorArr,
      successfulUploads,
      failedUploads
    };

    return res
      .status(201)
      .json({
        message: 'Created: Bulk upload completed', bulkUploadResult
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default AddBulkProducts;
