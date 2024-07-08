import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Pages/Nav";
import Footer from "./Pages/Footer";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Nav />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
