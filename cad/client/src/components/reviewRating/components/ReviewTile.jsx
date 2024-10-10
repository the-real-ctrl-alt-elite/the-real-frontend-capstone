import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  //need to set up useEffect to do an axios call for each reviewer. If the reviewer's email has been
  //associated with a purchase, then their username needs to have a 'Verified Purchaser' next to
  //their username

  return (
    <div
      style={{
        padding: "1rem",
        borderBottom: "1px solid black",
        margin: "1.25rem .5rem .5rem .5rem",
      }}
      className="reviewTile"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 .25rem",
          height: "15%",
        }}
        className="reviewTileHeader"
      >
        <ReviewStars rating={review.rating} />
        <div>
          <small>
            {" "}
            {review.reviewer_name}, {format(review.date, "MMMM dd, y")}
          </small>
        </div>
      </div>
      <div style={{ fontWeight: "bold" }} className="reviewSummary">
        {review.summary}
      </div>
      <div style={{ height: "55%" }} className="reviewBody">
        {review.body}
        <div
          stlye={{ display: "flex", gap: "4px" }}
          className="picturesContainer"
        >
          {review.photos.map((img) => (
            <img key={img.url} src={img.url}></img>
          ))}
        </div>
      </div>
      {review.recommend === true ? <Recommend />  : ""}
      {review.response !== null ? <Response response={review.response} /> : ""}
      <FeedbackFooter review={review} />
    </div>
  );
};

export default ReviewTile;

const ReviewStars = ({ rating }) => {
  let stars = [];

  (function fillStarArray(rating) {
    while (rating > 1) {
      rating -= 1;
      stars.push(1);
    }
    //function in push is for rounded to nearest quarter value
    stars.push((Math.round(rating * 4) / 4).toFixed(2));
    while (stars.length < 5) {
      stars.push(0);
    }
  })(rating);

  return (
    <div style={{ display: "flex" }}>
      {stars.map((star, index) => (
        <Star percentage={star} key={"a" + star + index} />
      ))}
    </div>
  );
};

const Star = ({ percentage }) => {
  //this is used to double stars to the same absolute posiition, so that you can have these
  // partial fills with the clipPath css property
  return (
    <div className="star-wrapper">
      <i
      className="star-back fa-solid fa-star-sharp"> </i>
      <i
        className="star-front fa-solid fa-star-sharp"
        style={{ clipPath: `inset(0 ${100 - (percentage *= 100)}% 0 0)` }}
        ></i>
      <i/>
    </div>
  );
};

const Response = ({ response }) => {
  //
  return (
    <div
      className="sellerResponse"
      style={{
        margin: ".25rem",
        padding: ".5rem",
        backgroundColor: "rgba(125,155,155,.33",
        borderRadius: "1em",
      }}
    >
      <div style={{ fontWeight: "bold" }}>Response from seller </div>
      {response}
    </div>
  );
};

const Recommend = () => {
  //
  return (
    <div
    style={{padding: '.25rem'}}
    >
      <i className="fa-solid fa-check"></i> I recommend this product
    </div>
  )
}

const FeedbackFooter = ({review}) => {
  //
  return (
    <div
    style={{ position: "relative", bottom: "0" }}
    className="reviewFooter"
  >
    <small>
      Helpful? <a href="#">Yes</a> {"(" + review.helpfulness + ")"} |{" "}
      <a href="#">Report</a>
    </small>
  </div>
  )
}

// star rating (total of 5 stars, filled in by quarters (rounded down ===> 3.8 = 3.75));
// date of review format Month, DD, YYYY;
// review summary => single sentence of no more than 60 characters ==> summary appears in bold font above full review;
// review body: free-form multimedia input where they can submit text and images
// text needs to be between 50 - 1000 characters;
// submit UP TO 5 images along with a single review;
// By default, first 250 characters should display. If the review text is > 250, a link should have a button to say show more (state managed in the review) to expand / collapse extra
// Any images should appear as thumbnails below the review text;
// on click, should open a model displaying image at full resolution. Should have a close button;
// recommended - if recommended, it should have text saying "I recommend this product." AND a checkmark displayed below the review; if not recommended, nothing display on bottom;
// repsonse to review - if a response exists, it should appear below reviewer name and be preceded by the text 'Response from seller' and be visually distinct from the rest of the review;
// rating helpfulness - "Was this review helpful?" followed by two links "Yes" and "No". Following Yes and No will be the count of users who selected that information;
// a user does NOT have to be logged in to provide feedback on review;
//a user can provide feedback on any review, however they can only do so once - if the user selects yes or no, they should not be able to select another option for the review;
