const findContainer = (id, items) => {
  if (id in items) {
    return id;
  }
  return Object.keys(items).find((key) => items[key].includes(id));
};

export const handleDragOver = (event, setItems, items) => {
  const { active, over, activatorEvent } = event;

  const { id } = active;
  const { id: overId } = over;

  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

  if (!activeContainer || !overContainer || activeContainer === overContainer) {
    return;
  }

  setItems((prev) => {
    const activeItems = prev[activeContainer];
    const overItems = prev[overContainer];

    const activeIndex = activeItems.indexOf(id);
    const overIndex = overItems.indexOf(overId);

    let newIndex;
    if (overId in prev) {
      newIndex = overItems.length + 1;
    } else {
      const isBelowLastItem =
        over &&
        overIndex === overItems.length - 1 &&
        activatorEvent.offsetY > over.rect.top + over.rect.height;

      const modifier = isBelowLastItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
    }

    return {
      ...prev,
      [activeContainer]: [
        ...prev[activeContainer].filter((item) => item !== active.id),
      ],
      [overContainer]: [
        ...prev[overContainer].slice(0, newIndex),
        items[activeContainer][activeIndex],
        ...prev[overContainer].slice(newIndex, prev[overContainer].length),
      ],
    };
  });
};

export const handleDragEnd = (event, items, setItems, arrayMove) => {
  const { active, over } = event;
  const { id } = active;
  const { id: overId } = over;

  const activeContainer = findContainer(id, items);
  const overContainer = findContainer(overId, items);

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
