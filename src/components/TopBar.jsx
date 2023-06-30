import { AppBar, Toolbar, IconButton, TextField, Select, MenuItem, Box, Card, CardContent, Typography } from "@mui/material";
import { styled, alpha } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import BusinessLogo from '../assets/car-logo.jpg';
import { useState, useRef } from 'react';
import FetchPromotions from './promotions/FetchPromotions';
import FetchAdditionalCharges from "./additionalCharges/FetchAdditionalCharges";
import FetchInsurance from "./insurance/FetchInsurance";
import FetchReviews from "./ratesReviews/RatesAndReviews";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './TopBar.css';

const theme = createTheme({
  palette: {
    common: {
      white: "#fff",
    },
  },
});

const TopBar = () => {
  const [showPromotions, setShowPromotions] = useState(false);
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef('');

  // handle show promotions
  const handleShowPromotions = () => {
    setShowPromotions(!showPromotions);
  };

  // handle show additional charges
  const handleShowAdditionalCharges = () => {
    setShowAdditionalCharges(!showAdditionalCharges);
  };

  // handle show insurance
  const handleShowInsurance = () => {
    setShowInsurance(!showInsurance);
  };

  // handle show reviews
  const handleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleSearch = () => {
    const searchQuery = searchInputRef.current.value.trim();

    if (searchQuery === '') {
      toast.error('Please enter a search query.', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    console.log(searchQuery);
    searchCars(searchQuery);
  };

  const handleClearSearch = () => {
    searchInputRef.current.value = '';
    setSearchResults([]);
  };

  const searchCars = async (searchQuery) => {
    if (!searchQuery) return;

    try {
      setSearchResults([]); // Clear previous search results
      setIsLoading(true); // Set loading state

      const response = await fetch(
        `https://carhireapi.azurewebsites.net/searchCars?make=${searchQuery}`
      );
      const data = await response.json();
      console.log(data.result.recordset);

      if (data.result.recordset && data.result.recordset.length > 0) {
        setSearchResults(data.result.recordset);
      } else {
        setSearchResults([]);
        toast.warn('No cars found matching the search NAME.', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (error) {
      setSearchResults([]);
      toast.error('An error occurred while searching for cars.');
      console.log(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const SearchContainer = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  }));

  const SearchInput = styled(TextField)(({ theme }) => ({
    color: "inherit",
    height: "30px", // Adjust the height as desired
    "& input": {
      paddingTop: "3px", // Adjust the padding as desired
    },
  }));

  const ClearIconButton = styled(IconButton)(({ theme }) => ({
    padding: "6px", // Adjust the padding as desired
    "& svg": {
      fontSize: "18px", // Adjust the icon size as desired
    },
  }));

  const FilterSelect = styled(Select)(({ theme }) => ({
    color: "inherit",
  }));

  const handleFilterChange = (event) => {
    console.log("Filter changed:", event.target.value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar className="AppBar" position="static">
          <Toolbar className="tool-bar">
            <Box style={{ display: 'flex' }}>
              <Box style={{ width: '3vw', height: '6vh' }}>
                <img src={BusinessLogo} style={{ height: '100%', width: '100%', borderRadius: '50%' }} alt="Business Logo" />
              </Box>
              <SearchContainer className="search-container">
                <SearchInput className="search-input" placeholder="Search by car name" inputRef={searchInputRef} />
                <ClearIconButton sx={{ p: 1 }} aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </ClearIconButton>
                <ClearIconButton sx={{ p: 1 }} aria-label="clear" onClick={handleClearSearch}>
                  <ClearIcon />
                </ClearIconButton>
              </SearchContainer>
            </Box>
            <FilterSelect className="filter"
              value=""
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "filter" }}
            >
              <MenuItem value="" disabled>
                Recently Viewed
              </MenuItem>
              <MenuItem value="Promotions" onClick={handleShowPromotions}>Promotions</MenuItem>
              <MenuItem value="AdditionalCharges" onClick={handleShowAdditionalCharges}>Additional Charges</MenuItem>
              <MenuItem value="Insurance" onClick={handleShowInsurance}>Insurance</MenuItem>
              <MenuItem value="RatingsReviews" onClick={handleShowReviews}>Ratings and Reviews</MenuItem>
            </FilterSelect>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <div>
      
        <ToastContainer />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          searchResults.length > 0 ? (
            <div>
              {searchResults.map((car) => (
                <Card key={car.car_id} style={{ margin: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{`${car.make} - ${car.model}`}</Typography>
                    <Typography>{`Year: ${car.year}`}</Typography>
                    <Typography>{`Fuel Type: ${car.fuel_type}`}</Typography>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null
        )}
      </div>
<div style={{marginTop:'10px', display:'flex', flexDirection:'column', gap:'10px'}}>
      {showPromotions && <FetchPromotions />}
      {showAdditionalCharges && <FetchAdditionalCharges />}
      {showInsurance && <FetchInsurance />}
      {showReviews && <FetchReviews />}
      </div>
    </>
  );
};

export default TopBar;
