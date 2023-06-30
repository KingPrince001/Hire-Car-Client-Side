import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const FetchInsurance = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [showInsurance, setShowInsurance] = useState(false);

  // handle show insurance
  const handleShowInsurance = () => {
    setShowInsurance(!showInsurance);
  };

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await fetch("https://carhireapi.azurewebsites.net/carInsurance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setInsuranceData(data);
      } catch (error) {
        console.error("Error fetching insurance data:", error);
      }
    };

    fetchInsurance();
  }, []);

  console.log(insuranceData);
 // Conversion rate from USD to KSH
 const conversionRate = 110;
  // Checking if insurance data is available before rendering the table
  return (
    <div>
      {insuranceData && insuranceData.length !== 0 ? (
        <>
          {!showInsurance ? (
            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
              <h2 style={{ margin: "-2px" }}>Insurance</h2>
              <Button variant="contained" color="primary" onClick={handleShowInsurance}>
                Show
              </Button>
            </div>
          ) : (
            <table  style={{margin:'15px auto'}}>
              <thead>
                <tr>
                  <th colSpan="5">
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "0 50px" }}>
                      <h2 style={{ margin: "-2px" }}>Insurance</h2>
                      <Button variant="contained" color="primary" onClick={handleShowInsurance}>
                        Hide
                      </Button>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Insurance ID</th>
                  <th>Car Name</th>
                  <th>Coverage Type</th>
                  <th>Premium Amount (KSH)</th>
                </tr>
              </thead>
              <tbody>
                {insuranceData.map((car) => (
                  car.insurance.map((insurance) => (
                    <tr key={insurance.insurance_id}>
                      <td>{insurance.insurance_id}</td>
                      <td>{car.make} {car.model} </td>
                      <td>{insurance.coverage_type}</td>
                      <td>{insurance.premium_amount * conversionRate}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <p>Loading insurance data...</p>
      )}
    </div>
  );
};

export default FetchInsurance;
