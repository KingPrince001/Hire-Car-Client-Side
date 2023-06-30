import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FetchReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  // handle show reviews
  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://carhireapi.azurewebsites.net/carReview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews data");
        }

        const data = await response.json();
        setReviewsData(data);
      } catch (error) {
        toast.error("Error fetching reviews data");
        console.error("Error fetching reviews data:", error);
      }
    };

    fetchReviews();
  }, []);

  console.log(reviewsData);

  // Check if reviews data is available before rendering the table
  return (
    <div>
      {reviewsData && reviewsData.length !== 0 ? (
        <>
          {!showReviews ? (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
              <h2 style={{ margin: "-2px" }}>Reviews</h2>
              <Button variant="contained" color="primary" onClick={handleShowReviews}>
                Show
              </Button>
            </div>
          ) : (
            <table style={{ margin: '15px auto' }}>
              <thead>
                <tr>
                  <th colSpan="4">
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
                      <h2 style={{ margin: "-2px" }}>Reviews</h2>
                      <Button variant="contained" color="primary" onClick={handleShowReviews}>
                        Hide
                      </Button>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Car Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviewsData.map((car) =>
                  car.ratingsReviews.map((review) => (
                    <tr key={review.review_id}>
                      <td>{car.make} {car.model}</td>
                      <td>{review.rating} Stars</td>
                      <td>{review.review}</td>
                      <td>{review.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Loading reviews data...</p>
      )}
    </div>
  );
};

export default FetchReviews;
