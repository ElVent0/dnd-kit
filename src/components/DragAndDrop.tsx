import { FC, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import { handleDragOver, handleDragEnd } from "../utils/handleDrag";
import { useDefaultSensors } from "../hooks/useDefaultSensors";

const DragAndDrop: FC = () => {
  const [items, setItems] = useState<Record<string, string[]>>({
    numbers: ["First", "Second", "Third", "Fourth", "Fifth"],
    colors: ["Blue", "Yellow", "Red", "Green", "Black"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  });

  const sensors = useDefaultSensors();

  return (
    <div className="p-10 h-screen bg-blue-100 text-blue-900 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) => handleDragOver(event, setItems, items)}
        onDragEnd={(event) => handleDragEnd(event, items, setItems, arrayMove)}
      >
        {!!items &&
          Object.entries(items).map(([key, value], index) => (
            <SortableList key={index} items={value} id={key} />
          ))}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
