import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Site1 from "./sites/site1/Page";
import Site2 from "./sites/site2/Page";
import Site3 from "./sites/site3/Page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/site1" element={<Site1 />} />
      <Route path="/site2" element={<Site2 />} />
      <Route path="/site3" element={<Site3 />} />
    </Routes>
  );
}
