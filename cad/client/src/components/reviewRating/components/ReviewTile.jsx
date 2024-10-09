import React, { useState, useEffect } from "react";

const ReviewTile = ({ review }) => {
  const [expanded, setExpanded] = useState(false)

  return <div className="reviewTile"></div>;
};

export default ReviewTile;

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



