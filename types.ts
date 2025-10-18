
import type { themeData, colorPalettes } from './constants';

export type ThemeKey = keyof typeof themeData;
export type PaletteKey = keyof typeof colorPalettes;

export interface Theme {
    subjects: string[];
    motifs: string[];
}

export interface PatternOptions {
    theme: ThemeKey;
    subjects: string[];
    palette: PaletteKey;
    style: 'inflated' | 'glossy' | 'metallic' | 'ornate';
    layout: 'horizontal' | 'scattered' | 'alternating' | 'border';
    density: number;
    background: 'clean' | 'confetti' | 'textured' | 'gradient';
    motifs: string;
    border: 'none' | 'ornate' | 'simple' | 'scattered';
}
