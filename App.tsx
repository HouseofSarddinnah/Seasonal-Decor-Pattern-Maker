
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import PromptDisplay from './components/PromptDisplay';
import PatternPreview from './components/PatternPreview';
import { PatternOptions, ThemeKey } from './types';
import { themeData, colorPalettes } from './constants';
import { generatePrompt, getPattern } from './services/geminiService';

const App: React.FC = () => {
    const [options, setOptions] = useState<PatternOptions>({
        theme: 'christmas',
        subjects: themeData['christmas'].subjects.slice(0, 2),
        palette: 'sunsetSorbet',
        style: 'inflated',
        layout: 'scattered',
        density: 5,
        background: 'clean',
        motifs: themeData['christmas'].motifs[0],
        border: 'none',
    });
    const [prompt, setPrompt] = useState<string>('');
    const [generatedSvg, setGeneratedSvg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleOptionsChange = useCallback((newOptions: Partial<PatternOptions>) => {
        setOptions(prev => {
            const updated = { ...prev, ...newOptions };
            if (newOptions.theme && newOptions.theme !== prev.theme) {
                const newThemeData = themeData[newOptions.theme as ThemeKey];
                updated.subjects = newThemeData.subjects.slice(0, 2);
                updated.motifs = newThemeData.motifs[0];
            }
            return updated;
        });
    }, []);
    
    const handleGeneratePrompt = useCallback(() => {
        const newPrompt = generatePrompt(options);
        setPrompt(newPrompt);
    }, [options]);
    
    useEffect(() => {
        // Auto-generate prompt when options change
        handleGeneratePrompt();
    }, [handleGeneratePrompt]);

    const handleGeneratePattern = useCallback(async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError(null);
        setGeneratedSvg('');
        try {
            const svg = await getPattern(prompt);
            setGeneratedSvg(svg);
        } catch (e: any) {
            setError('Failed to generate pattern. Please try again.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    const handleClearPrompt = () => {
        setPrompt('');
        setGeneratedSvg('');
    };

    const handleEditPrompt = (newPrompt: string) => {
        setPrompt(newPrompt);
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white font-sans">
            <main className="container mx-auto px-4 py-12">
                <Header />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <Controls
                            options={options}
                            onOptionChange={handleOptionsChange}
                            onGenerate={handleGeneratePattern}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        {prompt && (
                            <PromptDisplay
                                prompt={prompt}
                                onClear={handleClearPrompt}
                                onEdit={handleEditPrompt}
                            />
                        )}
                        <PatternPreview svgContent={generatedSvg} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
