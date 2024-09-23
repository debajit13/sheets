export interface Change {
  x: number;
  y: number;
  value: string;
}

export interface VisibleResult {
  visible: number[];
  start: number[];
  end: number[];
}

export interface CoordinateType {
  x: number;
  y: number;
}

export interface SelectionCoordinatesType {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
