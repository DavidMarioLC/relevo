/** Native SVG pieces share a finite, visible-once construction timeline. */
export const ASSEMBLY_DURATION = 2400;
export const ASSEMBLY_TIMEOUT = 2700;

export const phases = {
  foundation: [0, 420],
  enclosure: [180, 720],
  cube: [600, 650],
  agentBase: [600, 340],
  agentCage: [730, 420],
  agentCube: [880, 460],
  equipment: [850, 600],
  connection: [1700, 550],
  label: [2050, 350],
} as const;
export type AssemblyPhase = keyof typeof phases;
export type AssemblyMode = 'fade' | 'draw';

export function build(id: string, phase: AssemblyPhase, offset = 0, mode: AssemblyMode = 'fade') {
  const [start, duration] = phases[phase];
  return {
    'data-build': id,
    'data-build-phase': phase,
    'data-build-mode': mode,
    'data-build-start': start + offset,
    'data-build-duration': duration,
  };
}

// Back row first, then front row. Coordinates are in the reference's 1732 × 728 plane.
export const agents = [
  { x:143.5, y:298, active:false }, { x:226.5, y:346, active:false },
  { x:309.5, y:394, active:true }, { x:392.5, y:442, active:false },
  { x:60.5, y:346, active:true }, { x:143.5, y:394, active:true },
  { x:226.5, y:442, active:false }, { x:309.5, y:490, active:false },
];
