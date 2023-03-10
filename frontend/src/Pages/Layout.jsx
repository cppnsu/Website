import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = (props) => {
  return (
    <div>
      <Header {...props.Header}/>
      <Outlet />
      <Footer {...props.Footer}/>
    </div>
  );
};

export default Layout;
