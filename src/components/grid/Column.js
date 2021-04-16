import styled from 'styled-components';
import { Box } from './Box';

export const Column = styled(Box)`
  padding: 0px 24px;

  @media (max-width: 768px) {
    padding: 0px 14px;
  }
`;
