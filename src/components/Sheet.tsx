import { useEffect, useRef, useState } from 'react';
import {
  calculateRowsAndCloumnsToDisplay,
  resizeCanvas,
  getEncodedCharacter,
} from '../utils/utils';

// constants for cell width and cell height
const cellWidth = 100;
const cellHeight = 22;

// constants for row header width and column header height
const rowHeaderWidth = 50;
const columnHeaderHeight = 22;

// constant for color
const headerColor = '#f8f9fa';
const headerTextColor = '#666666';
const gridLineColor = '#e2e3e3';
const selectionColor = '#e9f0fd';
const selectionBorderColor = '#1b73e7';

const Sheet = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [cellsOffset, setCellsOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [maxScrollArea, setMaxScrollArea] = useState<{ x: number; y: number }>({
    x: 3000,
    y: 3000,
  });
  const [selection, setSelection] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>({ x1: -1, y1: -1, x2: -1, y2: -1 });
  const [selectionInProgress, setSelectionInProgress] =
    useState<boolean>(false);

  // calculate number of columns, start point and end point for each column
  const {
    visible: visibleColumns,
    start: columnStart,
    end: columnEnd,
  } = calculateRowsAndCloumnsToDisplay(
    cellWidth,
    canvasWidth,
    rowHeaderWidth,
    cellsOffset.x
  );
  const {
    visible: visibleRows,
    start: rowStart,
    end: rowEnd,
  } = calculateRowsAndCloumnsToDisplay(
    cellHeight,
    canvasHeight,
    columnHeaderHeight,
    cellsOffset.y
  );

  const coordinateToCell = (x: number, y: number) => {
    let cellX = 0;
    let cellY = 0;

    for (let i = 0; i < visibleColumns.length; i++) {
      if (x >= columnStart[i] && x <= columnEnd[i]) {
        cellX = visibleColumns[i];
      }
    }

    for (let i = 0; i < visibleRows.length; i++) {
      if (y >= rowStart[i] && y <= rowEnd[i]) {
        cellY = visibleRows[i];
      }
    }

    return {
      x: cellX,
      y: cellY,
    };
  };

  const cellToCoordinate = (cellX: number, cellY: number) => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < visibleColumns.length; i++) {
      if (visibleColumns[i] === cellX) {
        x = columnStart[i];
        break;
      }
    }

    for (let i = 0; i < visibleRows.length; i++) {
      if (visibleRows[i] === cellY) {
        y = rowStart[i];
        break;
      }
    }

    return { x, y };
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; // cast target to HTMLDivElement
    const scrollX = target.scrollLeft;
    const scrollY = target.scrollTop;

    const cellsOffsetInX = Math.floor(scrollX / cellWidth);
    const cellsOffsetInY = Math.floor(scrollY / cellHeight);

    setCellsOffset({
      x: cellsOffsetInX,
      y: cellsOffsetInY,
    });

    const newMaxScrollArea = { ...maxScrollArea };
    if (newMaxScrollArea.x / scrollX < 1) {
      maxScrollArea.x *= 1.5;
    }

    if (newMaxScrollArea.y / scrollY < 1) {
      newMaxScrollArea.y *= 1.5;
    }

    setMaxScrollArea({ ...newMaxScrollArea });
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.clientX;
    const y = e.clientY;

    setSelectionInProgress(true);

    const sel1 = coordinateToCell(x, y); // point1
    const sel2 = { ...sel1 }; // point2

    setSelection({
      x1: sel1.x,
      y1: sel1.y,
      x2: sel2.x,
      y2: sel2.y,
    });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.clientX;
    const y = e.clientY;

    if (selectionInProgress) {
      const sel2 = coordinateToCell(x, y);
      setSelection({ ...selection, x2: sel2.x, y2: sel2.y });
    }
  };

  const onMouseUp = () => {
    setSelectionInProgress(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas) {
      resizeCanvas(canvas);
    }

    if (context) {
      context.fillStyle = '#fff';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height); // set the canvas color

      // selecting cells
      let selX1 = selection.x1;
      let selX2 = selection.x2;

      // to make sure if user is selecting from right to left then also x1 < x2
      if (selection.x1 > selection.x2) {
        selX1 = selection.x2;
        selX2 = selection.x1;
      }

      let selY1 = selection.y1;
      let selY2 = selection.y2;

      // to make sure if user is selecting from bottom to top then also y1 < y2
      if (selection.y1 > selection.y2) {
        selY1 = selection.y2;
        selY2 = selection.y1;
      }

      const isSelectionActive =
        selX1 !== -1 && selY1 !== 1 && selX2 !== -1 && selY2 !== -1;

      const point1 = cellToCoordinate(selX1, selY1);
      const point2 = cellToCoordinate(selX2, selY2);

      point2.x += cellWidth;
      point2.y += cellHeight;

      if (isSelectionActive) {
        const rectWidth = point2.x - point1.x;
        const rectHeight = point2.y - point1.y;

        context.fillStyle = selectionColor;
        context.fillRect(point1.x, point1.y, rectWidth, rectHeight);
      }

      context.fillStyle = headerColor; // setup the header color
      context.font = '13px sans-serif';

      context.fillRect(0, 0, rowHeaderWidth, context.canvas.height); // set the row header color
      context.fillRect(0, 0, context.canvas.width, columnHeaderHeight); // set the column header color
      context.strokeStyle = gridLineColor;

      // Draw row header
      let startY = columnHeaderHeight; // Make sure startY is initialized
      for (let i = 0; i < visibleRows.length; i++) {
        context.beginPath();
        context.moveTo(0, startY); // x, y
        context.lineTo(rowHeaderWidth, startY); // x, y
        context.stroke();
        startY += cellHeight;
      }

      // column header settings
      context.fillStyle = headerTextColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      // Write row header text
      startY = columnHeaderHeight; // Initialize startY
      for (let i = 0; i < visibleRows.length; i++) {
        const centerY = startY + cellHeight * 0.5;
        const centerX = rowHeaderWidth * 0.5;
        const content = String(visibleRows[i] + 1);
        context.fillText(content, centerX, centerY);
        startY += cellHeight;
      }

      // Draw row lines
      startY = columnHeaderHeight; // Make sure startY is initialized
      for (let i = 0; i < visibleRows.length; i++) {
        context.beginPath();
        context.moveTo(rowHeaderWidth, startY); // x, y
        context.lineTo(context.canvas.width, startY); // x, y
        context.stroke();
        startY += cellHeight;
      }

      // Draw column header
      let startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        context.beginPath();
        context.moveTo(startX, 0); // x, y
        context.lineTo(startX, columnHeaderHeight); // x, y
        context.stroke();
        startX += cellWidth;
      }

      // Write column header text
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        const centerX = startX + cellWidth * 0.5;
        const centerY = columnHeaderHeight * 0.5;
        const content = getEncodedCharacter(visibleColumns[i] + 1);
        context.fillText(content, centerX, centerY);
        startX += cellWidth;
      }

      // Draw column header text
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        startX += cellWidth;
      }

      // Draw column lines
      startX = rowHeaderWidth; // Initialize startX
      for (let i = 0; i < visibleColumns.length; i++) {
        context.beginPath();
        context.moveTo(startX, columnHeaderHeight); // x, y
        context.lineTo(startX, context.canvas.height); // x, y
        context.stroke();
        startX += cellWidth;
      }
      if (isSelectionActive) {
        const rectWidth = point2.x - point1.x;
        const rectHeight = point2.y - point2.y;

        context.strokeStyle = selectionBorderColor;
        context.rect(point1.x, point1.y, rectWidth, rectHeight);
        context.stroke();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasHeight, canvasWidth, cellsOffset.x, cellsOffset.y, selection]);

  useEffect(() => {
    const resizeCanvas = () => {
      setCanvasHeight(window.innerHeight);
      setCanvasWidth(window.innerWidth);
    };

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className='w-screen h-screen relative  overflow-hidden'>
      <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
      <div
        className='absolute w-full h-full top-0 left-0 overflow-scroll'
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div className={`w-[${maxScrollArea.x + 2000}px] h-[1px]`} />
        <div className={`w-[1px] h-[${maxScrollArea.y + 2000}px]`} />
      </div>
    </div>
  );
};
export default Sheet;
