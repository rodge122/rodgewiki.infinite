
import React, { useState, useEffect, useCallback } from 'react';
import type { WikiArticle } from './types';
import { generateRandomArticle } from './services/geminiService';
import Header from './components/Header';
import WikiPage from './components/WikiPage';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [article, setArticle] = useState<WikiArticle | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateArticle = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setArticle(null);
        try {
            const newArticle = await generateRandomArticle();
            setArticle(newArticle);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        handleGenerateArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
            <Header onGenerate={handleGenerateArticle} isLoading={isLoading} />
            <main className="flex-grow container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-lg">
                    {isLoading && <LoadingSpinner />}
                    {error && !isLoading && (
                        <div className="p-8 text-center text-red-600">
                            <h2 className="text-2xl font-bold mb-4">Ошибка</h2>
                            <p>{error}</p>
                        </div>
                    )}
                    {article && !isLoading && <WikiPage article={article} />}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;