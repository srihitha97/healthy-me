import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 80px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const H2 = styled.h2`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 60px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const H3 = styled.h3`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 44px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const H4 = styled.h4`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const H5 = styled.h5`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const H6 = styled.h6`
  color: ${({ color, theme }) => {
    if (color === 'primary') {
      return theme.primaryColor;
    }
    if (color === 'tertiary') {
      return theme.primaryWhite;
    }
    return color;
  }};
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
