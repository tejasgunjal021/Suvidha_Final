import VendorList from "../components/VendorList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Vendor Management</h1>
      <Link to="/add-vendor">Add Vendor</Link>
      <VendorList />
    </div>
  );
};

export default Home;
