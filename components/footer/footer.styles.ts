import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: #1f2937;
  color: white;
  margin-top: 4rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FooterLink = styled.a`
  color: #9ca3af;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid #374151;
  color: #9ca3af;
`;