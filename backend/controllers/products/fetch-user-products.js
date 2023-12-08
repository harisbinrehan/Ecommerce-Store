import Product from '../../models/product';

const FetchUserProducts = async (req, res) => {
  try {
    const {
      limit, skip, filterObject
    } = req.query;
    let limitValue = 0;
    let skipValue = 0;
    if (!filterObject) {
      limitValue = Number(limit) || 0;
      skipValue = Number(skip) || 0;
    }

    const selector = {};

    if (filterObject?.size && filterObject.size !== 'none') {
      selector.size = { $in: filterObject.size };
    }

    if (filterObject?.color && filterObject.color !== 'none') {
      selector.color = { $in: filterObject.color };
    }

    if (filterObject?.search) {
      selector.name = { $regex: new RegExp(filterObject.search, 'i') };
    }

    if (
      filterObject?.price
      && filterObject.price[0] !== 'none'
      && filterObject.price[1] !== 'none'
    ) {
      selector.price = {
        $gte: Number(filterObject.price[0]),
        $lte: Number(filterObject.price[1])
      };
    }

    let sort = {};

    if (filterObject && filterObject.sorting !== 'none') {
      if (filterObject.sorting === 'Price low to high') {
        sort = { price: 1 };
      } else if (filterObject.sorting === 'Price high to low') {
        sort = { price: -1 };
      } else if (filterObject.sorting === 'Newest products') {
        sort = { date: -1 };
      }
    }

    const totalCount = await Product.countDocuments(selector);

    const products = await Product.find(selector)
      .sort(sort)
      .skip(skipValue)
      .limit(limitValue);

    return res.status(200).json({
      products, totalCount
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default FetchUserProducts;
