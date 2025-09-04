
import { GoogleGenAI, Type } from "@google/genai";
import type { WikiArticle } from '../types';

const articleSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "The title of the fictional article. Should be intriguing and specific.",
        },
        summary: {
            type: Type.STRING,
            description: "A brief introductory paragraph (2-3 sentences) summarizing the topic.",
        },
        imageCaption: {
            type: Type.STRING,
            description: "A descriptive, encyclopedic caption for an image related to the topic. E.g., 'An artist's rendition of a Lumina moth.'",
        },
        sections: {
            type: Type.ARRAY,
            description: "An array of sections that make up the body of the article.",
            items: {
                type: Type.OBJECT,
                properties: {
                    heading: {
                        type: Type.STRING,
                        description: "The heading for this section (e.g., 'History', 'Biology', 'Cultural Impact').",
                    },
                    paragraphs: {
                        type: Type.ARRAY,
                        description: "An array of strings, where each string is a full paragraph for this section. Generate 2-4 paragraphs per section.",
                        items: {
                            type: Type.STRING,
                        },
                    },
                },
                required: ["heading", "paragraphs"],
            },
        },
    },
    required: ["title", "summary", "imageCaption", "sections"],
};


export const generateRandomArticle = async (): Promise<WikiArticle> => {
    if (!process.env.API_KEY) {
        throw new Error("Ключ API не настроен. Пожалуйста, убедитесь, что переменная окружения API_KEY установлена.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate a fictional but plausible-sounding Wikipedia article in Russian. The topic should be completely random and imaginary, such as a mythical creature, a forgotten artist, a bizarre scientific theory, or a non-existent historical event. The tone must be formal, neutral, and encyclopedic. Create at least 3 detailed sections.",
            config: {
                responseMimeType: "application/json",
                responseSchema: articleSchema,
                temperature: 1.0,
            },
        });
        
        const jsonText = response.text.trim();
        const articleData = JSON.parse(jsonText) as WikiArticle;

        // Basic validation
        if (!articleData.title || !articleData.summary || !articleData.sections) {
            throw new Error("Получены некорректные данные статьи от API.");
        }

        return articleData;
    } catch (error) {
        console.error("Ошибка при генерации статьи:", error);
        if (error instanceof Error) {
            throw new Error(`Не удалось сгенерировать статью: ${error.message}`);
        }
        throw new Error("Не удалось получить или обработать статью от Gemini API.");
    }
};