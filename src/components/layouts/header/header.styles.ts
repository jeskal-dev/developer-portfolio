import type { Paths } from "@/helpers/frame";

export const headerBorderLeft: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "0", "0"],
      ["L", "100% - 6", "0"],
      ["L", "100% - 11", "100% - 64"],
      ["L", "100% + 0", "0% + 29"],
      ["L", "0", "11"],
      ["L", "0", "0"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "0", "14"],
      ["L", "100% - 7", "33"],
    ],
  },
];

export const headerNav: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "6", "0"],
      ["L", "100% - 6.5", "0"],
      ["L", "100% + 0", "0% + 9"],
      ["L", "100% - 28", "100% - 15"],
      ["L", "162", "100% - 15"],
      ["L", "164", "100% - 30"],
      ["L", "153", "100% - 15"],
      ["L", "27", "100% - 15"],
      ["L", "0", "0% + 8"],
      ["L", "6", "0"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "32", "100% - 15"],
      ["L", "0% + 152.5", "100% - 15"],
      ["L", "0% + 163.5", "100% - 29"],
      ["L", "0% + 161.5", "100% - 15"],
      ["L", "100% - 32.5", "100% - 15"],
      ["L", "100% - 36.5", "100% - 7"],
      ["L", "0% + 163.5", "100% - 7"],
      ["L", "0% + 165.5", "100% - 23"],
      ["L", "0% + 152.5", "100% - 7"],
      ["L", "37", "100% - 7"],
      ["L", "32", "100% - 15"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-3-stroke)",
      fill: "var(--color-frame-3-fill)",
    },
    path: [
      ["M", "0", "0% + 33"],
      ["M", "4", "0% + 33"],
      ["L", "0% + 18.5", "100% - 12"],
      ["L", "0% + 23.5", "100% - 12"],
      ["L", "29", "100% + 0"],
      ["L", "155", "100% - 0"],
      ["L", "160", "100% - 8"],
      ["L", "161", "100% - 0"],
      ["L", "100% - 28", "100% + 0"],
      ["L", "100% - 23", "100% - 11"],
      ["L", "100% - 17", "100% - 11"],
      ["L", "100% - 14", "100% - 14"],
      ["L", "100% + 0", "100% - 14"],
    ],
    name: "Frame 3",
  },
];

export const headerCard: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "19", "0"],
      ["L", "100% - 5", "0"],
      ["L", "100% + 0", "0% + 7"],
      ["L", "100% - 36", "100% - 20"],
      ["L", "0", "100% - 20"],
      ["L", "25", "8.999992370605469"],
      ["L", "19", "1"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "25", "100% - 14"],
      ["L", "100% - 32", "100% - 13"],
      ["L", "100% - 15", "36"],
    ],
    name: "Frame 2",
  },
];

export const headerBorderRight: Paths = [
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-1-stroke)",
      fill: "var(--color-frame-1-fill)",
    },
    path: [
      ["M", "12", "0"],
      ["L", "100% + 0", "0"],
      ["L", "100% + 0", "0% + 16"],
      ["L", "0", "100% - 42"],
      ["L", "18", "7"],
      ["L", "12", "0"],
    ],
  },
  {
    show: true,
    style: {
      strokeWidth: "1",
      stroke: "var(--color-frame-2-stroke)",
      fill: "var(--color-frame-2-fill)",
    },
    path: [
      ["M", "3", "100% - 36"],
      ["L", "100% + 0", "20"],
    ],
    name: "Frame 2",
  },
];
