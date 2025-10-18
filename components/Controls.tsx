
import React from 'react';
import { PatternOptions, ThemeKey, PaletteKey } from '../types';
import { themeData, colorPalettes } from '../constants';

interface ControlsProps {
    options: PatternOptions;
    onOptionChange: (newOptions: Partial<PatternOptions>) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ options, onOptionChange, onGenerate, isLoading }) => {
    
    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value as ThemeKey;
        onOptionChange({ theme: newTheme });
    };

    const handleSubjectChange = (subject: string) => {
        const newSubjects = options.subjects.includes(subject)
            ? options.subjects.filter(s => s !== subject)
            : [...options.subjects, subject];
        onOptionChange({ subjects: newSubjects });
    };

    const handleMotifChange = (motif: string) => {
        onOptionChange({ motifs: motif });
    };

    const currentThemeData = themeData[options.theme];

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl p-8 border border-amber-400/30 backdrop-blur-sm shadow-2xl shadow-black/30">
            <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">🎨 Customize Your Pattern</h3>
            <div className="space-y-6">
                {/* Theme */}
                <div className="control-group">
                    <label className="block mb-2 font-semibold text-slate-300">Theme</label>
                    <select value={options.theme} onChange={handleThemeChange} className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                        {Object.keys(themeData).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
                    </select>
                </div>

                {/* Subjects */}
                <div className="control-group">
                    <label className="block mb-2 font-semibold text-slate-300">Subjects (select up to 4)</label>
                    <div className="grid grid-cols-2 gap-2">
                        {currentThemeData.subjects.map(subject => (
                            <button key={subject} onClick={() => handleSubjectChange(subject)} disabled={options.subjects.length >= 4 && !options.subjects.includes(subject)} className={`p-3 text-sm rounded-lg border ${options.subjects.includes(subject) ? 'bg-amber-500 text-slate-900 border-amber-400 font-bold' : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                {subject}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Motifs */}
                 <div className="control-group">
                    <label className="block mb-2 font-semibold text-slate-300">Accent Motifs</label>
                    <div className="flex flex-wrap gap-2">
                        {currentThemeData.motifs.map(motif => (
                            <button key={motif} onClick={() => handleMotifChange(motif)} className={`py-1 px-3 text-sm rounded-full border ${options.motifs === motif ? 'bg-amber-500 text-slate-900 border-amber-400 font-bold' : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'}`}>
                                {motif}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Palette */}
                <div className="control-group">
                    <label className="block mb-2 font-semibold text-slate-300">Color Palette</label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.keys(colorPalettes).map(key => (
                            <button key={key} onClick={() => onOptionChange({ palette: key as PaletteKey })} className={`p-2 rounded-lg border-2 ${options.palette === key ? 'border-amber-400' : 'border-transparent'}`}>
                                <div className="flex h-8">
                                    {colorPalettes[key as PaletteKey].map(color => <div key={color} className="w-full h-full" style={{ backgroundColor: color }} />)}
                                </div>
                                <span className="text-xs mt-1 block text-slate-400">{key}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* More options... style, layout, density, background, border */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="control-group">
                        <label className="block mb-2 font-semibold text-slate-300">Style</label>
                        <select value={options.style} onChange={e => onOptionChange({ style: e.target.value as any })} className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                            <option value="inflated">Inflated</option>
                            <option value="glossy">Glossy</option>
                            <option value="metallic">Metallic</option>
                            <option value="ornate">Ornate</option>
                        </select>
                    </div>
                    <div className="control-group">
                        <label className="block mb-2 font-semibold text-slate-300">Layout</label>
                        <select value={options.layout} onChange={e => onOptionChange({ layout: e.target.value as any })} className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                            <option value="horizontal">Horizontal</option>
                            <option value="scattered">Scattered</option>
                            <option value="alternating">Alternating</option>
                            <option value="border">Border</option>
                        </select>
                    </div>
                </div>

                <div className="control-group">
                    <label className="block mb-2 font-semibold text-slate-300">Density: {options.density}</label>
                    <input type="range" min="1" max="10" value={options.density} onChange={e => onOptionChange({ density: Number(e.target.value) })} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="control-group">
                        <label className="block mb-2 font-semibold text-slate-300">Background</label>
                        <select value={options.background} onChange={e => onOptionChange({ background: e.target.value as any })} className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                            <option value="clean">Clean</option>
                            <option value="confetti">Confetti</option>
                            <option value="textured">Textured</option>
                            <option value="gradient">Gradient</option>
                        </select>
                    </div>
                    <div className="control-group">
                        <label className="block mb-2 font-semibold text-slate-300">Border</label>
                        <select value={options.border} onChange={e => onOptionChange({ border: e.target.value as any })} className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                            <option value="none">None</option>
                            <option value="ornate">Ornate</option>
                            <option value="simple">Simple</option>
                            <option value="scattered">Scattered</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <button 
                    onClick={onGenerate} 
                    disabled={isLoading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-lg rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
                >
                    {isLoading ? 'Generating...' : '✨ Generate Pattern'}
                </button>
            </div>
        </div>
    );
};

export default Controls;
