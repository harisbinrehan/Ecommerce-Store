import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const TopSelling = () => {
  const { orderStats } = useSelector((state) => state.order);
  if (!orderStats || !orderStats.topSelling) {
    return null;
  }

  return (
    <div>
      <div className="table-body w-100 h-100 p-4">
        <div className="main-div d-flex">
          <h2 className="pt-3 pb-2">Top Selling Products</h2>
        </div>

        <div>
          <Table bordered hover responsive>
            <thead>
              <tr className="table-secondary mt-3">
                <th>Image</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Units</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orderStats.topSelling.map((product, index) => (
                <tr className="" key={index}>
                  <td>
                    <img
                      className=""
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt="thumbnail"
                      height="50px"
                      width="70px"
                    />
                  </td>

                  <td className="pt-4">
                    <b>{product.name}</b>
                  </td>
                  <td className="pt-4">{product.quantity}</td>
                  <td className="pt-4">
                    {product.sold}
                    {' '}
                    (sold)
                  </td>
                  <td className="pt-4">{product.price}</td>
                  <td className="pt-4">
                    {new Date(product.date).toLocaleString('en-US', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
