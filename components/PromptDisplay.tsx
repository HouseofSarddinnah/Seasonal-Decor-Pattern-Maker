
import React from 'react';

interface PromptDisplayProps {
    prompt: string;
    onClear: () => void;
    onEdit: (newPrompt: string) => void;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt, onClear, onEdit }) => {
    if (!prompt) {
        return null;
    }

    const handleEdit = () => {
        const newPrompt = window.prompt("Edit your prompt:", prompt);
        if (newPrompt !== null) {
            onEdit(newPrompt);
        }
    }

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 rounded-2xl p-8 mb-12 border border-amber-400/30 backdrop-blur-sm shadow-2xl shadow-black/30">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-amber-400 mb-4">
                    💭 Your Creative Prompt
                </h3>
                <div className="bg-slate-900/80 rounded-xl p-6 mb-6 border border-slate-700/50 min-h-[60px] flex items-center justify-center">
                    <p className="text-lg text-slate-50 italic">"{prompt}"</p>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button onClick={handleEdit} className="py-2 px-6 bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold rounded-lg transition-transform hover:scale-105">
                        ✏️ Edit Prompt
                    </button>
                    <button onClick={onClear} className="py-2 px-6 bg-slate-700/50 text-slate-300 font-semibold rounded-lg transition-colors hover:bg-red-500/20 hover:text-red-300">
                        🗑️ Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptDisplay;
