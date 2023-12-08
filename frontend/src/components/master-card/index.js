import MasterCardImage from '../../assets/images/mastercard.svg';
import masterCardBack from '../../assets/images/card-background.png';
import visaCardBack from '../../assets/images/images.jpeg';

import './style.css';

const MasterCard = ({
  cardholderName,
  brand,
  cardNumber,
  exp_month,
  exp_year
}) => {
  const cardBackStyle = {
    backgroundImage: `url(${brand === 'Visa' ? visaCardBack : masterCardBack})`,
    backgroundSize: 'cover'
  };

  return (
    <div className="m-2" style={cardBackStyle}>
      <div className="d-flex p-2">
        <img src={MasterCardImage} alt="cardImage" />
        <p className="ps-3 pt-3" style={{ fontWeight: 'bold' }}>
          {brand}
        </p>
      </div>
      <div
        style={{ fontWeight: 'bold' }}
        className="d-flex justify-content-around"
      >
        <p>****</p>
        <p>****</p>
        <p>****</p>
        <p>{cardNumber || '0000'}</p>
      </div>
      <div className="d-flex gap-5">
        <div style={{ fontStyle: 'italic' }} className="d-flex ps-4">
          {exp_month && exp_year ? `${exp_month}/${exp_year}` : '07/23'}
        </div>
        <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>123</div>
      </div>
      <div
        className="d-flex py-2 ps-4 pe-4 justify-content-around"
        style={{ fontWeight: 'bold' }}
      >
        {cardholderName || 'Dummy Name'}
      </div>
    </div>
  );
};

export default MasterCard;
