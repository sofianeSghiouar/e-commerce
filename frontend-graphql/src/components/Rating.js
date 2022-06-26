import React from 'react';

function Rating(props) {
  const { rating, numReviews } = props;

  return (
    <div className='rating'>
      <span>
        <i
          className={
            rating >= 1
              ? 'typcn text-warning typcn-star-full-outline'
              : rating >= 0.5
              ? 'typcn text-warning typcn-star-half-outline'
              : 'typcn text-warning typcn-star-outline'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'typcn text-warning typcn-star-full-outline'
              : rating >= 1.5
              ? 'typcn text-warning typcn-star-half-outline'
              : 'typcn text-warning typcn-star-outline'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'typcn text-warning typcn-star-full-outline'
              : rating >= 2.5
              ? 'typcn text-warning typcn-star-half-outline'
              : 'typcn text-warning typcn-star-outline'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'typcn text-warning typcn-star-full-outline'
              : rating >= 3.5
              ? 'typcn text-warning typcn-star-half-outline'
              : 'typcn text-warning typcn-star-outline'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'typcn text-warning typcn-star-full-outline'
              : rating >= 4.5
              ? 'typcn text-warning typcn-star-half-outline'
              : 'typcn text-warning typcn-star-outline'
          }
        />
      </span>
      <span className='text-dark ms-1'>{numReviews} reviews</span>
    </div>
  );
}
export default Rating;
