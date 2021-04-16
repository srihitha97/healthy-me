import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const UnstyledAnchor = styled.a``;

const UnstyledLink = ({ href, children, ariaLabel }) => (
  <UnstyledAnchor href={href} aria-label={ariaLabel}>
    {children}
  </UnstyledAnchor>
);

UnstyledLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
};

export default UnstyledLink;
