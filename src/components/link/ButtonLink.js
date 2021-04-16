import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '../buttons/Button';

export const ButtonLink = styled(({ routerLink, ...rest }) => (
  <Button as={!routerLink ? 'a' : RouterLink} {...rest} />
))`
  display: inline-block;
`;
