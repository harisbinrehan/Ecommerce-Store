import Product from '../../models/product';

const FetchAdminProducts = async (req, res) => {
  try {
    const {
      limit, skip, filterObject
    } = req.query;

    const limitValue = Number(limit) || 0;
    const skipValue = Number(skip) || 0;

    const selector = {};

    if (filterObject?.search) {
      selector.name = { $regex: new RegExp(filterObject.search, 'i') };
    }

    const totalCount = await Product.countDocuments(selector);

    const products = await Product.find(selector)
      .limit(limitValue)
      .skip(skipValue);

    return res.status(200).json({
      products, totalCount
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default FetchAdminProducts;
