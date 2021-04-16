import React from 'react';
import styled from 'styled-components';
import { Box } from '../grid/Box';
import { Row } from '../grid/Row';
import { Image } from '../image/Image';

const SpinnerContainer = styled(Box)`
  max-width: 200px;
  margin: 50px auto;
`;

const Spinner = () => (
  <Row>
    <SpinnerContainer>
      <Image src="/assets/Spinner.gif" alt="Spinner" />
    </SpinnerContainer>
  </Row>
);

export default Spinner;
