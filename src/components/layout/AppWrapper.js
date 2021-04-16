import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperContainer = styled.div`
  padding: 0px 12px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AppWrapper = ({ children }) => (
  <WrapperContainer>{children}</WrapperContainer>
);

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
