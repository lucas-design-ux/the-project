import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface ArticleBodyProps {
    rawHtmlContent: string;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ rawHtmlContent }) => {
    const sanitizedContent = DOMPurify.sanitize(rawHtmlContent);

    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none prose-p:my-8 prose-headings:my-10 prose-table:my-8"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default ArticleBody;
