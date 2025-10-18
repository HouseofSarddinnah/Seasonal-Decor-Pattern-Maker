
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-transparent bg-clip-text mb-4 drop-shadow-[0_4px_8px_rgba(251,191,36,0.3)]">
                Seasonal Decor Pattern Maker
            </h1>
            <p className="text-xl text-slate-300 mb-2">
                Create beautiful seamless patterns for any season or celebration
            </p>
            <p className="text-md text-slate-400 italic">Design by You</p>
        </header>
    );
};

export default Header;
