import React from "react";
import DragAndDrop from "./components/DragAndDrop";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DragAndDrop />} />
    </Routes>
  );
};

export default App;
