import 'swiper/css';
import "boxicons/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Route render={(props) => (
          <>
           {/* Pass route props to Header */}
            <Header {...props} /> 

            <Routes />

            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
