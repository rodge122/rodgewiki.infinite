
import React from 'react';

interface HeaderProps {
    onGenerate: () => void;
    isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGenerate, isLoading }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .5C5.648.5.5 5.648.5 12s5.148 11.5 11.5 11.5S23.5 18.352 23.5 12 .5zM12 21.365c-5.168 0-9.365-4.197-9.365-9.365S6.832 2.635 12 2.635 21.365 6.832 21.365 12 17.168 21.365 12 21.365z" />
                        <path d="M12 5.068A6.932 6.932 0 1 0 18.932 12 6.94 6.94 0 0 0 12 5.068zm0 12.364a5.432 5.432 0 1 1 5.432-5.432A5.438 5.438 0 0 1 12 17.432z" />
                        <path d="M11.999 9.382a2.618 2.618 0 1 0 2.618 2.618 2.62 2.62 0 0 0-2.618-2.618zm0 4.197a1.58 1.58 0 1 1 1.58-1.579 1.581 1.581 0 0 1-1.58 1.58z" />
                    </svg>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tighter">
                        rodge<span className="font-light">wiki</span><span className="text-sky-600">.infinite</span>
                    </h1>
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? 'Генерация...' : 'Сгенерировать новую статью'}
                </button>
            </div>
        </header>
    );
};

export default Header;
