
import React from 'react';

interface PatternPreviewProps {
    svgContent: string | null;
    isLoading: boolean;
    error: string | null;
}

const PatternPreview: React.FC<PatternPreviewProps> = ({ svgContent, isLoading, error }) => {
    const downloadSVG = () => {
        if (!svgContent) return;
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pattern.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const copySVG = () => {
        if (!svgContent) return;
        navigator.clipboard.writeText(svgContent).then(() => {
            alert('SVG code copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy SVG code.');
        });
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mb-4"></div>
                    <p className="text-xl font-semibold text-slate-300">Crafting your masterpiece...</p>
                    <p className="text-slate-400">This can take a moment.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-500/10 p-6 rounded-lg">
                     <p className="text-2xl font-bold mb-2">😢</p>
                    <p className="font-semibold">Oops! Something went wrong.</p>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }

        if (svgContent) {
            return (
                <div
                    className="w-full h-full bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}')`, backgroundSize: '200px 200px' }}
                >
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <p className="text-5xl mb-4">🎨</p>
                <p className="text-xl font-semibold">Your pattern will appear here</p>
                <p>Adjust the options and click "Generate Pattern"</p>
            </div>
        );
    }


    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl p-6 border border-amber-400/30 backdrop-blur-sm shadow-2xl shadow-black/30 flex flex-col">
            <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center">
                ✨ Pattern Preview
            </h3>
            <div className="aspect-square bg-slate-900/80 rounded-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                {renderContent()}
            </div>
            {svgContent && !isLoading && !error && (
                 <div className="flex gap-4 justify-center mt-6 flex-wrap">
                    <button onClick={downloadSVG} className="py-2 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg transition-transform hover:scale-105">
                        💾 Download SVG
                    </button>
                    <button onClick={copySVG} className="py-2 px-6 bg-slate-700/50 text-slate-300 font-semibold rounded-lg transition-colors hover:bg-slate-600">
                        📋 Copy Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatternPreview;
