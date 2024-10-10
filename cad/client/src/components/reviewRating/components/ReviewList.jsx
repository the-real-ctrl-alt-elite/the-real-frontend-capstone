import React, { useEffect, useState } from "react";
import ReviewTile from "./ReviewTile.jsx";

const mockData = {
  product: "2",
  page: 0,
  count: 5,
  results: [
    {
      review_id: 5,
      rating: 3.75,
      summary: "I'm enjoying wearing these shades",
      recommend: false,
      response: null,
      body: "Comfortable and practical.",
      date: "2019-04-14T00:00:00.000Z",
      reviewer_name: "shortandsweeet",
      helpfulness: 5,
      photos: [
        {
          id: 1,
          url: "urlplaceholder/review_5_photo_number_1.jpg",
        },
        {
          id: 2,
          url: "urlplaceholder/review_5_photo_number_2.jpg",
        },
        // ...
      ],
    },
    {
      review_id: 3,
      rating: 4.5,
      summary: "I am liking these glasses",
      recommend: true,
      response: "Glad you're enjoying the product!",
      //adding length to test limited display functionality for ReviewTile
      body: "They are very dark. But that's good because I'm in very sunny spots. They are very dark. But that's good because I'm in very sunny spots. They are very dark. But that's good because I'm in very sunny spots. They are very dark. But that's good because I'm in very sunny spots. They are very dark. But that's good because I'm in very sunny spots.",
      date: "2019-06-23T00:00:00.000Z",
      reviewer_name: "bigbrotherbenjamin",
      helpfulness: 12,
      photos: [],
    },
    // ...
  ],
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  //BRD display 2 tiles at a time
  const [activeReviews, setActiveReviews] = useState(reviews.slice(0, 2));

  return (
    <div className="reviewList">
      {mockData.results.map((review) => (
        <ReviewTile
        key={review.review_id}
        review={review}/>
      ))}
    </div>
  );
};

export default ReviewList;
