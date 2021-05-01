const getRelativeParent = (element) => {
  if (!element) {
    return null;
  }

  const position = window
    .getComputedStyle(element)
    .getPropertyValue("position");
  if (position !== "static") {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

const positionSuggestions = ({
  decoratorRect,
  popover,
  state,
  filteredEmojis,
}) => {
  const relativeParent = getRelativeParent(popover.parentElement);
  const relativeRect = {};

  if (relativeParent) {
    relativeRect.scrollLeft = relativeParent.scrollLeft;
    relativeRect.scrollTop = relativeParent.scrollTop;

    const relativeParentRect = relativeParent.getBoundingClientRect();
    relativeRect.left = decoratorRect.left - relativeParentRect.left;
    relativeRect.top = decoratorRect.top - relativeParentRect.top;
  } else {
    relativeRect.scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    relativeRect.scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    relativeRect.top = decoratorRect.top;
    relativeRect.left = decoratorRect.left;
  }

  const left = relativeRect.left + relativeRect.scrollLeft;
  const top = relativeRect.top + relativeRect.scrollTop;

  let transform;
  let transition;
  if (state.isActive) {
    if (filteredEmojis.size > 0) {
      transform = "scale(1)";
      transition = "all 0.25s cubic-bezier(.3,1.2,.2,1)";
    } else {
      transform = "scale(0)";
      transition = "all 0.35s cubic-bezier(.3,1,.2,1)";
    }
  }

  const result = {
    bottom: "auto",
    right: "auto",
    left: `${left}px`,
    top: `${top}px`,
    transform,
    transformOrigin: "1em 0%",
    transition,
  };

  // Check if we need to move the popover away from the edge of the window
  if (typeof popover.parentElement.getBoundingClientRect === "function") {
    const viewArea = popover.parentElement.getBoundingClientRect();
    if (viewArea.y + 150 > window.innerHeight) {
      result.bottom = `${top + 20}px`;
      result.top = "auto";
    }
    if (viewArea.x + 150 > window.innerWidth) {
      result.right = `${left - 20}px`;
      result.left = "auto";
    }
  }

  return result;
};

export default positionSuggestions;
