import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box } from '../grid/Box';

const Container = styled(Box)`
  text-align: center;
  white-space: nowrap;
`;

const SVG = styled.svg`
  transform: rotate(-90deg);
`;

const BackgroundCircle = styled.circle`
  stroke: #e6e6e6;
`;

const ValueCircle = styled.circle`
  stroke: #212121;
  transition: all 1s;
`;

const ProgressRing = ({ progress, size, strokeSize, isPieChart = false }) => {
  const actualStroke = isPieChart ? size / 2 : strokeSize;
  const radius = size / 2 - actualStroke / 2;
  const center = size / 2;
  const dashLength = 2 * Math.PI * radius;
  const dashSpace = dashLength * (1 - progress / 100);
  return (
    <Container>
      <SVG
        className="radialProgress"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <BackgroundCircle
          className="radialProgress__bg"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={actualStroke}
        />
        <ValueCircle
          className="radialProgress__value"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={actualStroke}
          strokeDasharray={dashLength}
          strokeDashoffset={dashSpace}
        />
      </SVG>
    </Container>
  );
};

ProgressRing.propTypes = {
  progress: PropTypes.number,
  size: PropTypes.number,
  strokeSize: PropTypes.number,
  isPieChart: PropTypes.bool,
};

export default ProgressRing;
