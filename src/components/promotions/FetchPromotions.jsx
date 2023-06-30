import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const FetchPromotions = () => {
  const [promotionsData, setPromotionsData] = useState([]);
  const [showPromotions, setShowPromotions] = useState(false);

  // handle show promotions
  const handleShowPromotions = () => {
    setShowPromotions(!showPromotions);
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("https://carhireapi.azurewebsites.net/carPromotions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setPromotionsData(data);
      } catch (error) {
        console.error("Error fetching promotions data:", error);
      }
    };

    fetchPromotions();
  }, []);

  console.log(promotionsData);

  // Check if promotions Data is available before rendering the table
  return (
    <div>
      {promotionsData && promotionsData.length !== 0 ? (
        <>
          {!showPromotions ? (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
              <h2 style={{ margin: "-2px" }}>Promotions</h2>
              <Button variant="contained" color="primary" onClick={handleShowPromotions}>
                Show
              </Button>
            </div>
          ) : (
            <table style={{margin:'15px auto'}}>
              <thead>
                <tr>
                  <th colSpan="4">
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
                      <h2 style={{ margin: "-2px" }}>Promotions</h2>
                      <Button variant="contained" color="primary" onClick={handleShowPromotions}>
                        Hide
                      </Button>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Promotion ID</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Discount Percent</th>
                </tr>
              </thead>
              <tbody>
                {promotionsData.map((category) => (
                  category.promotions.map((promotion) => (
                     <tr key={promotion.promotion_id}>
                    <td>{promotion.promotion_id}</td>
                    <td>{category.category_name}</td>
                    <td>{promotion.promotion_description}</td>
                    <td>{promotion.discount_percent}%</td>
                  </tr>
                  ))
                 
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Loading promotions data...</p>
      )}
    </div>
  );
};

export default FetchPromotions;
