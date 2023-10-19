import { DragOverEvent, DragEndEvent } from "@dnd-kit/core";

type Items = Record<string, string[]>;

export const handleDragOver = (
  event: DragOverEvent,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
  items: Items
): void => {
  const { active, over, activatorEvent } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setItems((prev) => {
    const activeItems = prev[activeContainer] || [];
    const overItems = prev[overContainer] || [];

    const activeIndex = activeItems.indexOf(String(id));
    const overIndex = overItems.indexOf(String(overId));

    let newIndex: number;
    if (overId in prev) {
      newIndex = overItems.length;
    } else {
      const isBelowLastItem =
        over &&
        overIndex === overItems.length - 1 &&
        (activatorEvent as MouseEvent).offsetY > 0;

      const modifier = isBelowLastItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
    }

    return {
      ...prev,
      [activeContainer]: [...activeItems.filter((item) => item !== id)],
      [overContainer]: [
        ...overItems.slice(0, newIndex),
        items[activeContainer][activeIndex],
        ...overItems.slice(newIndex, overItems.length),
      ],
    };
  });
};

export const handleDragEnd = (
  event: DragEndEvent,
  items: Items,
  setItems: React.Dispatch<React.SetStateAction<Items>>,
  arrayMove: (arr: string[], from: number, to: number) => string[]
): void => {
  const { active, over } = event;

  const id = active?.id;
  const overId = over?.id;
  if (!overId) return;

  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;
  if (activeContainer === overContainer) return;

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  const activeIndex = (items[activeContainer] || []).indexOf(String(id));
  const overIndex = (items[overContainer] || []).indexOf(String(overId));

  if (activeIndex !== overIndex) {
    setItems((prevItems) => ({
      ...prevItems,
      [overContainer]: arrayMove(
        prevItems[overContainer] || [],
        activeIndex,
        overIndex
      ),
    }));
  }
};
