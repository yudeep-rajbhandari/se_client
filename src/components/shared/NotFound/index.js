/** @format */

import { Link } from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';

const NotFound = () => {
  return (
    <div>
      {/* <img src={PageNotFound} /> */}
      <p style={{ textAlign: 'center' }}>
        <img
          className='image'
          src={process.env.PUBLIC_URL + '/image/pagenotfound.jpeg'}
        />
        <Link to='/'>Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFound;
