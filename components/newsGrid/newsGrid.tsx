import React from 'react';
import { GridContainer, SectionTitle } from '@/components/newsGrid/newsGrid.styles';
import NewsCard from '@/components/newsCard/newsCard';
import { NewsArticle } from '@/types/news.types';

interface NewsGridProps {
  articles: NewsArticle[];
  title?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles, title = "Berita Terbaru" }) => {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <GridContainer>
        {articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </GridContainer>
    </section>
  );
};

export default NewsGrid;