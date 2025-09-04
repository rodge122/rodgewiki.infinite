
export interface ArticleSection {
    heading: string;
    paragraphs: string[];
}

export interface WikiArticle {
    title: string;
    summary: string;
    imageCaption: string;
    sections: ArticleSection[];
}
