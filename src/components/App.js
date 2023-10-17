import Container from "../components/Container/Container";
import DragAndDrop from "../components/DragAndDrop/DragAndDrop";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<DragAndDrop />} />
      </Route>
    </Routes>
  );
};

export default App;
