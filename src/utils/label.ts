export interface LabelRect {
  x: number; // small x
  y: number; // small y
  width: number;
  height: number;
}

const LabelEvent = {
  DefaultEvent: "DefaultEvent",
  CreateLabel: "CreateLabel",
  SelectLabel: "SelectLabel",
  MoveLabel: "MoveLabel",
  AdjustLabelSize: "AdjustLabelSize",
  RotateLabel: "RotateLabel",
  DeleteLabel: "DeleteLabel",
} as const;

export type LabelEvent = typeof LabelEvent[keyof typeof LabelEvent];

export default class LabelCanvas {
  width: number;
  height: number;
  labels: LabelRect[];
  mode: LabelEvent;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.labels = [];
    this.mode = LabelEvent.DefaultEvent;
    this.canvas = document.getElementById('label-canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  createLabel(x: number, y: number, endX: number, endY: number) {
    const label: LabelRect = {
      x: x > endX ? endX : x,
      y: y > endY ? endY : y,
      width: Math.abs(x - endX),
      height: Math.abs(y - endY),
    }

    this.labels.push(label);
  }
}