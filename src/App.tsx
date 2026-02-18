import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import BusinessRequirement from "./components/BusinessRequirement";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/business-requirement" element={<BusinessRequirement />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
