import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getWorkout as getWorkoutAction } from '../../actions/workout';
import { Column } from '../grid/Column';
import { Divider } from '../layout/Divider';
import { H1, H3, H4, H6 } from '../typography/Headings';
import { Copy } from '../typography/Copy';
import { Image } from '../image/Image';
import Spinner from '../layout/Spinner';
import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { TextLink } from '../link/TextLink';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const AvatarColumn = styled(Column)`
  width: 25%;
  margin: 48px auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledRow = styled(Row)`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const DetailsSegment = styled(Column)`
  background-color: ${({ theme }) => theme.darkestGrey};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding-top: 12px;
  padding-bottom: 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Label = styled(H6)`
  background-color: ${({ theme }) => theme.darkerGrey};
  margin: 12px 12px 12px 0px;
  padding: 12px;
  display: inline-block;
  border-radius: 5px;
  width: 33.33%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RoutineNumberSegment = styled(Box)`
  width: 50px;
  height: 50px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 25px;
  text-align: center;
  justify-content: center;
  margin-top: 6px;
`;

const NumberCopy = styled(Copy)`
  color: ${({ theme }) => theme.darkestGrey};
`;

const RoutineSegment = styled(Box)`
  width: 90%;
  padding: 0px 24px 12px 24px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const RoutineRow = styled(Row)`
  display: flex;
  justify-content: space-around;
  padding: 12px;
  border-radius: 5px;
  background-color: ${({ index, theme }) =>
    index % 2 === 0 && theme.darkerGrey};
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;

const RoutineCopy = styled(Copy)`
  width: 33.33%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Workout = ({
  workout: { workout, loading },
  getWorkout,
  match: { params },
}) => {
  useEffect(() => {
    getWorkout(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !workout) {
    return <Spinner />;
  }

  return (
    <Container>
      <Column>
        <H1 color="primary">{workout?.name}</H1>
        <Divider color="grey" />
      </Column>
      <AvatarColumn>
        <Image
          src={`/assets/${workout?.user?.avatar}.png`}
          alt={workout?.user?.avatar}
        />
      </AvatarColumn>
      <DetailsSegment>
        <StyledRow>
          <Label as="h2">Calories Burned:</Label>
          <Copy color="primary" large>
            {workout?.caloriesBurned}
          </Copy>
        </StyledRow>
        <StyledRow>
          <Label as="h2">Description:</Label>
          <Copy>{workout?.description}</Copy>
        </StyledRow>
        <StyledRow>
          <Label as="h2">Author:</Label>
          <TextLink
            to={`/profile/${workout?.user?._id}`}
            routerLink
            color=" #E1E1E1"
          >
            {workout?.user?.firstName} {workout?.user?.lastName}
          </TextLink>
        </StyledRow>
        <StyledRow>
          <H3>Exercises</H3>
          <Divider color="grey" />
          {workout?.exercises?.length &&
            workout.exercises.map(({ routine, name }, index) => (
              <StyledRow>
                <RoutineNumberSegment>
                  <NumberCopy large>{index + 1}</NumberCopy>
                </RoutineNumberSegment>
                <RoutineSegment>
                  <H4>{name}</H4>
                  {routine.map(({ reps, weight }, routineIndex) => (
                    <RoutineRow index={routineIndex + 2}>
                      <RoutineCopy>Reps: {reps}</RoutineCopy>
                      <RoutineCopy>Weight: {weight}</RoutineCopy>
                    </RoutineRow>
                  ))}
                </RoutineSegment>
              </StyledRow>
            ))}
        </StyledRow>
      </DetailsSegment>
    </Container>
  );
};

Workout.propTypes = {
  getWorkout: PropTypes.func,
  workout: PropTypes.object,
  match: PropTypes.object,
};

const mapState = state => ({
  workout: state.workout,
});

export default connect(mapState, { getWorkout: getWorkoutAction })(Workout);
