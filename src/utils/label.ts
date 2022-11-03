export interface LabelRect {
  x: number;
  y: number;
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

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.labels = [];
    this.mode = LabelEvent.DeleteLabel;
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