export interface LabelRect {
  x: number; // small x
  y: number; // small y
  width: number; // x + width
  height: number; // y + height
}

export const LabelMode = {
  ViewLabel: "ViewLabel",
  CreateLabel: "CreateLabel",
  SelectLabel: "SelectLabel",
} as const;

export type LabelMode = typeof LabelMode[keyof typeof LabelMode];

export const SelectedLabelEvent = {
  MoveLabel: "MoveSelectedLabel",
  AdjustLabelSize: "AdjustSelectedLabelSize",
  RotateLabel: "RotateSelectedLabel",
  DeleteLabel: "DeleteSelectedLabel",
} as const;

export type SelectedLabelEvent = typeof SelectedLabelEvent[keyof typeof SelectedLabelEvent];

const LABEL_BOX_COLOR = '#5668D9';
const BOX_OPACITY = 0.2;
const BORDER_OPACITY = 1;
const BORDER_WIDTH = 3; // 3px
const ANCHOR_BOX_WIDTH = 16;
const ANCHOR_BOX_HALF_WIDTH = 8;

export class LabelCanvas {
  labels: LabelRect[];
  selectedLabels: LabelRect[];
  labelMode: LabelMode;
  selectedLabelEvent: SelectedLabelEvent | undefined;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D | null) {
    if (!context) {
      throw new Error('LabelCanvas constructor context is null!');
    }

    this.labels = [];
    this.selectedLabels = [];
    this.labelMode = LabelMode.ViewLabel;
    this.selectedLabelEvent = undefined;
    this.context = context;
    this.context.fillStyle = LABEL_BOX_COLOR;
    this.context.lineWidth = 3;
  }

  changeLabelMode(mode: LabelMode) {
    this.labelMode = mode;

    if (this.labelMode === LabelMode.ViewLabel) {
      this.selectedLabels = [];
      this.labels.forEach(({ x, y, width, height }) => {
        // inside of label rect
        this.context.globalAlpha = BOX_OPACITY;
        this.context.fillRect(x + BORDER_WIDTH, y + BORDER_WIDTH, width - BORDER_WIDTH, height - BORDER_WIDTH);

        // label rect border
        this.context.globalAlpha = BORDER_OPACITY;
        this.context.strokeRect(x, y, width, height);
      })
    }

    if (this.labelMode === LabelMode.SelectLabel) {

    }
  }

  addAnchorToSelectedLabels() {
    this.selectedLabels.forEach(({ x, y, width, height }) => {
      // label rect border anchors - 16 x 16, 8 anchors
      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH, y - ANCHOR_BOX_HALF_WIDTH, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);
      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH, y - ANCHOR_BOX_HALF_WIDTH + height / 2, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);
      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH, y - ANCHOR_BOX_HALF_WIDTH + height, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);

      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH + width / 2,
        y - ANCHOR_BOX_HALF_WIDTH, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);
      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH + width,
        y - ANCHOR_BOX_HALF_WIDTH, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);

      this.context.strokeRect(x - ANCHOR_BOX_HALF_WIDTH + width, y - ANCHOR_BOX_HALF_WIDTH + height, ANCHOR_BOX_WIDTH, ANCHOR_BOX_WIDTH);
    })
  }

  createLabel(x: number, y: number, endX: number, endY: number) {
    if (this.labelMode !== LabelMode.CreateLabel) {
      return;
    }

    const label: LabelRect = {
      x: x > endX ? endX : x,
      y: y > endY ? endY : y,
      width: Math.abs(x - endX),
      height: Math.abs(y - endY),
    }

    this.labels.push(label);
    this.selectedLabels.push(label);
    this.addAnchorToSelectedLabels();
  }

  selectLabel(x: number, y: number) {
    if (this.labelMode !== LabelMode.SelectLabel) {
      return;
    }

    // for (const label of this.labels.slice().reverse()) {
    for (const label of this.labels) {
      if (x >= label.x && x <= label.x + label.width
        && y >= label.y && y <= label.y + label.height) {
        this.selectedLabels.push(label);
        this.addAnchorToSelectedLabels();
        break;
      }
    }
  }

  moveLabel(startX: number, startY: number, endX: number, endY: number) {
    if (this.labelMode !== LabelMode.SelectLabel) {
      return;
    }
  }

  onMouseDownCanvas(event: MouseEvent) {
    if (this.labelMode === LabelMode.ViewLabel) {
      return;
    }

    if (this.labelMode === LabelMode.CreateLabel) {

    }

    if (this.labelMode === LabelMode.SelectLabel) {

    }
  }

  onMouseEnter() {

  }

  onMouseLeave() {

  }
}