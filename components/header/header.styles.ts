import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
  margin: 0;
`;

export const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.3s ease;
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

export const NavItem = styled.a`
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #2563eb;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;