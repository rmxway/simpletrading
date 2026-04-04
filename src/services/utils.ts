export const round2 = (value: number): number => Math.round(value * 100) / 100;

export const absPercent = (value: number): number => round2(Math.abs(value));
