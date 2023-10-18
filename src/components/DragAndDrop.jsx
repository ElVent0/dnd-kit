import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortableList from "./SortableList.jsx";
import { handleDragOver, handleDragEnd } from "../utils/index";

const DragAndDrop = () => {
  const [items, setItems] = useState({
    numbers: ["First", "Second", "Third", "Fourth", "Fifth"],
    colors: ["Blue", "Yellow", "Red", "Green", "Black"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id));
  };

  return (
    <div className="p-10 h-screen bg-blue-100 text-blue-900 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={(event) =>
          handleDragOver(event, findContainer, setItems, items)
        }
        onDragEnd={(event) =>
          handleDragEnd(event, findContainer, items, setItems, arrayMove)
        }
      >
        {!!items &&
          Object.entries(items).map((item, index) => (
            <SortableList key={index} items={item[1]} />
          ))}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
