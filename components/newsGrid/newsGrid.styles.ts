import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  padding: 0 2rem;
  color: #1f2937;

  @media (max-width: 768px) {
    padding: 0 1rem;
    font-size: 1.5rem;
  }
`;