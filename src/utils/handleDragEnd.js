export const handleDragEnd = (
  event,
  findContainer,
  items,
  setItems,
  arrayMove
) => {
  const { active, over } = event;
  const { id } = active;
  const { id: overId } = over;

  const activeContainer = findContainer(id);
  const overContainer = findContainer(overId);

  if (!activeContainer || !overContainer || activeContainer !== overContainer) {
    return;
  }

  const activeIndex = items[activeContainer].indexOf(active.id);
  const overIndex = items[overContainer].indexOf(overId);

  if (activeIndex !== overIndex) {
    setItems((items) => ({
      ...items,
      [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
    }));
  }
};
