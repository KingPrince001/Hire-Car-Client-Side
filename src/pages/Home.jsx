import TopBar from "../components/TopBar";
import CarList from "../components/cars/FetchCars";

import './home.css';


const Home = () => {
  return (
    <div className="container2">
<TopBar />
<div className="car-cards">
 
<CarList />
</div>


    </div>
  )
}

export default Home;
