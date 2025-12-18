import React from 'react';
import { HeroContainer, HeroContent, HeroTitle, HeroExcerpt, HeroMeta, ReadMoreButton } from '@/components/hero/hero.styles';
import { NewsArticle } from '@/types/news.types';

interface HeroProps {
  article: NewsArticle;
}

const Hero: React.FC<HeroProps> = ({ article }) => {
  return (
    <HeroContainer imageUrl={article.imageUrl}>
      <HeroContent>
        <HeroMeta>
          <span>{article.category}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.readTime} min read</span>
        </HeroMeta>
        <HeroTitle>{article.title}</HeroTitle>
        <HeroExcerpt>{article.excerpt}</HeroExcerpt>
        <ReadMoreButton href="#">Baca Selengkapnya</ReadMoreButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;