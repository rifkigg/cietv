import styled from 'styled-components';

export const HeroContainer = styled.section<{ imageUrl: string }>`
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url(${props => props.imageUrl}) center/cover;
  display: flex;
  align-items: flex-end;
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  border-radius: 0 0 20px 20px;

  @media (max-width: 768px) {
    height: 400px;
    padding: 2rem 1rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  color: white;
`;

export const HeroMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroExcerpt = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
`;

export const ReadMoreButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: #1d4ed8;
  }
`;