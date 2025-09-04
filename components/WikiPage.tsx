
import React from 'react';
import type { WikiArticle } from '../types';

interface WikiPageProps {
    article: WikiArticle;
}

const WikiPage: React.FC<WikiPageProps> = ({ article }) => {
    // Use a consistent hash of the title to get the same image for the same article title
    const getHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    const imageId = getHash(article.title) % 1000; // Use a modulo to keep the number in a reasonable range for picsum

    return (
        <article className="p-6 md:p-10 font-serif">
            <header className="border-b border-gray-200 pb-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{article.title}</h1>
                <p className="text-md text-gray-500 mt-1">Из энциклопедии rodgewiki.infinite</p>
            </header>

            <div className="md:float-right md:ml-6 mb-4 md:w-80 clear-right">
                <figure className="bg-slate-100 p-3 border border-gray-200 text-center">
                    <img
                        src={`https://picsum.photos/id/${imageId}/400/300`}
                        alt={article.imageCaption}
                        className="w-full h-auto object-cover"
                    />
                    <figcaption className="text-sm text-gray-700 mt-2 italic">{article.imageCaption}</figcaption>
                </figure>
            </div>

            <p className="text-lg leading-relaxed mb-6 text-gray-800">{article.summary}</p>

            {article.sections.map((section, index) => (
                <section key={index} className="mb-6">
                    <h2 className="text-2xl font-bold font-sans border-b border-gray-200 pb-2 mb-4 text-gray-900">
                        {section.heading}
                    </h2>
                    <div className="space-y-4 text-base leading-loose text-gray-700">
                        {section.paragraphs.map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                        ))}
                    </div>
                </section>
            ))}
        </article>
    );
};

export default WikiPage;
