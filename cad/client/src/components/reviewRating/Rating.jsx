import React, { useState, useEffect } from "react";
import ReviewList from "./components/ReviewList.jsx";
import ReviewTile from "./components/ReviewTile.jsx";
import ProductBreakdown from "./components/ProductBreakdown.jsx";
import RatingBreakdown from "./components/RatingBreakdown.jsx";
import SortOptions from "./components/SortOptions.jsx";
import axios from 'axios';
require('dotenv').config();

const mockData = {
  product: "2",
  page: 0,
  count: 5,
  results: [
    {
      review_id: 5,
      rating: 3.25,
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
    {
      review_id: 6,
      rating: 0.5,
      summary: "These are booty!",
      recommend: false,
      response: null,
      body: "I've never had a worse experience in my life! Delivery was 5 minutes late! Unebleieveabletjet!",
      date: "2019-08-19T00:00:00.000Z",
      reviewer_name: "angryshopper69",
      helpfulness: 0,
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
      review_id: 9,
      rating: 5.0,
      summary:
        "THE BEST EVER BY FAR I CANT BELIEVE IT TOOK ME THIS LONG TO ORDER A PAIR OF THESE INCREDIBLE THINGS",
      recommend: true,
      response: "Sir this is a Wendy's.",
      body: "Yo, I love these so much! They tickle my fancy and my nose! And since I love sneezing more than pretty much anything else in the world, these are right up my alley! Have you ever sat and wondered about why sunglasses take away sunsneezes? Not with these! Give them ago and you'll be able to see fine while also sneezing like a dog at play! which is to say, a lot! These sneezers are incredible! Hell yeah!",
      date: "2019-12-26T00:00:00.000Z",
      reviewer_name: "dogmanthemandog",
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
    // ...
  ],
};

const Rating = (props) => {

  useEffect(() => {

    const params = {
      page: 1,
      count: 10,
      sort: 'relevant',
      product_id: 1
    }
    axios.get(`${process.env.API_URL}/reviews/1/10/'relevant'/1`, {
      params: params,
      headers: {
        "Authorization": `${process.env.API_KEY}`
      }
    })
    .then((response) => {
      console.log(response)
    })
  })

  const [reviews, setReviews] = useState(mockData.results);
  //BRD display 2 tiles at a time
  const [activeReviews, setActiveReviews] = useState(reviews.slice(0, 2));

  const fn = {
    activeReviews,
    setActiveReviews,
    reviews,
  };

  return (
    <div style={{ padding: "1rem", width: '66%'}}>
      <h3>RATINGS & REVIEWS</h3>
      <div>
        <div className="rating-container">
          <div className="reviewsLeft">
            <RatingBreakdown fn={fn} />
            <ProductBreakdown />
          </div>
          <div className="reviewsRight">
            <SortOptions fn={fn} />
            <ReviewList fn={fn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;

// if less than 2 reviews, the 'more reviews' button should be hidden => {reviews.length > 2 {button} : ''};
// if activeReviews.length < reviews.length, then <button> needs to be appended;
// max height = 100vh; overflow-y: scroll;
// the order of reviews should change;
// date (oldest, newest);
// ratings (highest, lowest);
// if no reviews, collapse reviewsList section and just show submit a new review near top of module;
