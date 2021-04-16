import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Copy } from '../typography/Copy';
import { Box } from '../grid/Box';

const Container = styled(Box)`
  margin: 12px 0px;
`;

const AlertContainer = styled.div`
  background-color: ${({ type, theme }) =>
    type === 'danger' ? theme.primaryRed : theme.primaryColor};
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 5px;
  color: ${({ theme }) => theme.lightgrey};
`;

const Alert = ({ alerts }) => {
  if (!alerts || !alerts.length) {
    return null;
  }

  return (
    <Container>
      {alerts.map(alert => (
        <AlertContainer key={alert.id} type={alert.type}>
          <Copy>{alert.msg}</Copy>
        </AlertContainer>
      ))}
    </Container>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapState = state => ({
  alerts: state.alerts,
});

export default connect(mapState)(Alert);
