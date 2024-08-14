import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setNewOffset = (
  initialPos: { x: number; y: number },
  mouseMoveDir = { x: 0, y: 0 }
) => {
  const newX = initialPos.x + mouseMoveDir.x;
  const newY = initialPos.y + mouseMoveDir.y;

  return {
    x: newX < 0 ? 0 : newX,
    y: newY < 0 ? 0 : newY,
  };
};

export const getOffset = (card: any) => {
  const offsetLeft = card.offsetLeft;
  const offsetTop = card.offsetTop;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export function autoGrow(textAreaRef: any) {
  const { current } = textAreaRef;
  current.style.height = "auto"; // Reset the height
  current.style.height = textAreaRef.current.scrollHeight + "px"; // Set the new height
}

export const setZIndex = (selectedCard: Element) => {
  const card = selectedCard as HTMLElement;
  card.style.zIndex = "999";
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      let cardElement = card as HTMLElement;
      let newZindex = parseInt(cardElement.style.zIndex) - 1;
      cardElement.style.zIndex = newZindex.toString();
    }
  });
};

export function bodyParser(value: any) {
  try {
    JSON.parse(value);
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
