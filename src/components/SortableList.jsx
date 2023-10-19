import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem.jsx";
import { useDroppable } from "@dnd-kit/core";

const SortableList = ({ items, id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <ul className="w-64 mr-4 p-2 border border-blue-300 bg-blue-200 rounded-md">
      <SortableContext
        id={items}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {items.map((item, index) => (
            <SortableItem key={index} id={item} />
          ))}
        </div>
      </SortableContext>
    </ul>
  );
};

export default SortableList;
