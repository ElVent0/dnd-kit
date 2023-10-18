import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem.jsx";

const SortableList = ({ items }) => {
  return (
    <ul className="w-64 mr-4">
      <SortableContext
        id={items}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem key={index} id={item} />
        ))}
      </SortableContext>
    </ul>
  );
};

export default SortableList;
