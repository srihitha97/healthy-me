import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TextLink = styled(({ routerLink, children, ...rest }) =>
  routerLink ? <Link {...rest}>{children}</Link> : <a {...rest}>{children}</a>
)`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 5px solid transparent;
  color: ${({ theme, color }) => color || theme.primaryColor};
  transition: ${({ theme }) => theme.defaultTransition};

  &:hover {
    border-bottom: 5px solid
      ${({ theme, color }) => color || theme.primaryColor};
  }
`;
