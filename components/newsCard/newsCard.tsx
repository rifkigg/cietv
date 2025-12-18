import React from 'react';
import { CardContainer, CardImage, CardContent, CardCategory, CardTitle, CardExcerpt, CardMeta } from '@/components/newsCard/newsCard.styles';
import { NewsArticle } from '@/types/news.types';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <CardContainer>
      <CardImage src={article.imageUrl} alt={article.title} />
      <CardContent>
        <CardCategory>{article.category}</CardCategory>
        <CardTitle>{article.title}</CardTitle>
        <CardExcerpt>{article.excerpt}</CardExcerpt>
        <CardMeta>
          <span>{article.author}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </CardMeta>
      </CardContent>
    </CardContainer>
  );
};

export default NewsCard;