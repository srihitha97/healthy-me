import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getWorkouts as getWorkoutsAction } from '../../actions/workout';

import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { H3 } from '../typography/Headings';
import { Column } from '../grid/Column';
import { Divider } from '../layout/Divider';
import { Image } from '../image/Image';
import Workouts from '../workout/Workouts';
import Spinner from '../layout/Spinner';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const HeroRow = styled(Row)`
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const HeadingContainer = styled(Column)`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  background-color: ${({ theme }) => theme.grey};
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
  padding: 24px;

  @media (max-width: 768px) {
    width: 80%;
    position: relative;
    top: -50px;
    transform: inherit;
    padding-bottom: 24px;
  }
`;

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  height: 500px;
`;

const StyledImage = styled(Image)`
  width: 66.66%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CommunityWorkouts = ({ getWorkouts, workout: { workouts, loading } }) => {
  useEffect(() => {
    getWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !workouts?.length) {
    return <Spinner />;
  }
  return (
    <>
      <Container as="section">
        <HeroRow>
          <ImageContainer>
            <StyledImage src="./assets/group-fitness.png" alt="Weights" />
          </ImageContainer>
          <HeadingContainer>
            <H3 color="primary">Community Workouts</H3>
            <Divider color="grey" />
          </HeadingContainer>
        </HeroRow>
      </Container>

      <Workouts workouts={workouts} community />
    </>
  );
};

CommunityWorkouts.propTypes = {
  getWorkouts: PropTypes.func,
  workout: PropTypes.object,
};

const mapState = state => ({
  isAuthenticated: state?.user.isAuthenticated,
  workout: state?.workout,
});

export default connect(mapState, { getWorkouts: getWorkoutsAction })(
  CommunityWorkouts
);
