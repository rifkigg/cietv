"use client"

import React, { useState } from 'react';
import { HeaderContainer, Logo, Navigation, NavItem, MobileMenuButton } from '@/components/header/header.styles';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>NewsHub</Logo>
      <Navigation isOpen={isMobileMenuOpen}>
        <NavItem href="#">Berita</NavItem>
        <NavItem href="#">Teknologi</NavItem>
        <NavItem href="#">Bisnis</NavItem>
        <NavItem href="#">Olahraga</NavItem>
        <NavItem href="#">Hiburan</NavItem>
      </Navigation>
      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </MobileMenuButton>
    </HeaderContainer>
  );
};

export default Header;