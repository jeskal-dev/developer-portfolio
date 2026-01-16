import type { Paths } from "@/helpers/frame"; 

export interface FrameProps  {
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
}