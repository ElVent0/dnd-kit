import DragAndDrop from "./components/DragAndDrop.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DragAndDrop />} />
    </Routes>
  );
};

export default App;
