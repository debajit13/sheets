import { VisibleResult } from '../types/types';

// calculateRowsAndColumnsToDisplay function with type annotations
export const calculateRowsAndColumnsToDisplay = (
  size: number,
  visibleArea: number,
  offset: number,
  cellOffset: number
): VisibleResult => {
  const visible: number[] = [];
  const start: number[] = [];
  const end: number[] = [];

  let idx = cellOffset;
  let nextStart = offset;

  while (nextStart < visibleArea) {
    visible.push(idx);
    start.push(nextStart);
    end.push(nextStart + size);

    idx++;
    nextStart += size;
  }

  return { visible, start, end };
};

// resizeCanvas function with type annotations
export const resizeCanvas = (canvas: HTMLCanvasElement) => {
  const { width, height } = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio;

  const newCanvasWidth = Math.round(width * ratio);
  const newCanvasHeight = Math.round(height * ratio);

  const context = canvas.getContext('2d');
  if (context) {
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;
    context.scale(ratio, ratio);
  }
};

// getEncodedCharacter function with type annotations
export const getEncodedCharacter = (num: number): string => {
  let result = '';

  while (num > 0) {
    const rem = (num - 1) % 26;
    result = String.fromCharCode(65 + rem) + result;
    num = Math.floor((num - 1) / 26);
  }

  return result;
};
