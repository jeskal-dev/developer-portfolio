export interface Stat {
  value: string;
  labelKey: string;
  hintKey?: string;
}

export const stats: Stat[] = [
  {
    value: "8+",
    labelKey: "stats.label1",
    hintKey: "stats.hint1",
  },
  {
    value: "40+",
    labelKey: "stats.label2",
    hintKey: "stats.hint2",
  },
  {
    value: "<24h",
    labelKey: "stats.label3",
    hintKey: "stats.hint3",
  },
  {
    value: "3",
    labelKey: "stats.label4",
    hintKey: "stats.hint4",
  },
];
