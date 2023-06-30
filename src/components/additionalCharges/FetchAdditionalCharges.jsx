import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const FetchAdditionalCharges = () => {
  const [additionalChargesData, setAdditionalChargesData] = useState([]);
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  // handle show additional charges
  const handleShowAdditionalCharges = () => {
    setShowAdditionalCharges(!showAdditionalCharges);
  };

  useEffect(() => {
    const fetchAdditionalCharges = async () => {
      try {
        const response = await fetch("https://carhireapi.azurewebsites.net/carAdditionalCharges", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setAdditionalChargesData(data);
      } catch (error) {
        console.error("Error fetching additional charges data:", error);
      }
    };

    fetchAdditionalCharges();
  }, []);

  console.log(additionalChargesData);

  // Conversion rate from USD to KSH
  const conversionRate = 110;

  return (
    <div>
      {additionalChargesData && additionalChargesData.length !== 0 ? (
        <>
           {!showAdditionalCharges ? (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
              <h2 style={{ margin: "-2px" }}>Additional Charges</h2>
              <Button variant="contained" color="primary" onClick={handleShowAdditionalCharges}>
                Show
              </Button>
            </div>
            ) : (
            <table  style={{margin:'15px auto'}}>
              <thead>
                <tr>
                  <th colSpan="5">
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
                      <h2 style={{ margin: "-2px" }}>Additional Charges</h2>
                      <Button variant="contained" color="primary" onClick={handleShowAdditionalCharges}>
                        Hide
                      </Button>
                    </div>
                  </th>
                </tr>
                <tr>
                <th>Charge ID</th>
                  <th>Category Name</th>
                  <th>Charge Type</th>
                  <th>Charge Amount (KSH)</th>
                </tr>
              </thead>
              <tbody>
                {additionalChargesData.map((category) => (
                  category.additionalCharges.map((additionalCharge) => (
                    <tr key={additionalCharge.charge_id}>
                       <td>{additionalCharge.charge_id}</td>
                      <td>{category.category_name}</td>
                      <td>{additionalCharge.charge_type}</td>
                      <td>{additionalCharge.charge_amount * conversionRate}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Loading additional charges data...</p>
      )}
    </div>
  );
};

export default FetchAdditionalCharges;
