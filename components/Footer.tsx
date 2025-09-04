
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full mt-8 py-6 border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 md:px-8 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} rodgewiki.infinite. Все статьи сгенерированы искусственным интеллектом.</p>
                <p className="text-sm mt-1">Это вымышленный проект и не должен использоваться в качестве источника фактической информации.</p>
            </div>
        </footer>
    );
};

export default Footer;
