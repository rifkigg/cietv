import React from 'react';
import { FooterContainer, FooterContent, FooterSection, FooterTitle, FooterLink, Copyright } from '@/components/footer/footer.styles';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Tentang Kami</FooterTitle>
          <p>NewsHub menyajikan berita terkini dan terpercaya dari berbagai kategori.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Kategori</FooterTitle>
          <FooterLink href="#">Teknologi</FooterLink>
          <FooterLink href="#">Bisnis</FooterLink>
          <FooterLink href="#">Olahraga</FooterLink>
          <FooterLink href="#">Hiburan</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Ikuti Kami</FooterTitle>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">YouTube</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © 2024 NewsHub. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;