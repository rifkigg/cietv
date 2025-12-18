import styled from 'styled-components';

export const CardContainer = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e0e7ff;
  color: #3730a3;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  color: #1f2937;
`;

export const CardExcerpt = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #9ca3af;
`;