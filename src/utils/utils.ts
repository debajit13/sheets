/**
 * calculate the possible array of rows, columns and their start and end points array in your display
 */
export const calculateRowsAndCloumnsToDisplay = (
  size: number,
  visibleArea: number
) => {
  const visible: number[] = [];
  const start: number[] = [];
  const end: number[] = [];

  let index = 0;
  let nextStart = 0;

  while (nextStart < visibleArea) {
    visible.push(index);
    start.push(nextStart);
    end.push(nextStart + size);

    index++;
    nextStart += size;
  }

  return { visible, start, end };
};

/**
 * resize the canvas width and height based on device pixel ratio
 */
export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const { width, height } = canvas.getBoundingClientRect();

  const ratio = window.devicePixelRatio;

  const newCanvasWidth = Math.round(width * ratio);
  const newCanvasHeight = Math.round(height * ratio);

  canvas.width = newCanvasWidth;
  canvas.height = newCanvasHeight;

  const context = canvas.getContext('2d');
  context?.scale(ratio, ratio);
};

/**
 * take number as parameter and return its corresponding alphabets based on logic
 */
export const getEncodedCharacter = (num: number) => {
  let result = '';

  while (num > 0) {
    const rem = (num - 1) % 26; // 0 to 25
    result = String.fromCharCode(65 + rem) + result;
    num = Math.round((num - 1) / 26);
  }

  return result;
};
