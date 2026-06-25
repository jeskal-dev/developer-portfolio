export interface ProcessStep {
  index: string;
  artifacts: string[];
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    artifacts: ["process.step1Art1", "process.step1Art2", "process.step1Art3"],
  },
  {
    index: "02",
    artifacts: ["process.step2Art1", "process.step2Art2", "process.step2Art3"],
  },
  {
    index: "03",
    artifacts: ["process.step3Art1", "process.step3Art2", "process.step3Art3"],
  },
];
