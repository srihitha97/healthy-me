import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { H4, H6 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Image } from '../image/Image';
import { Divider } from '../layout/Divider';
import { Copy } from '../typography/Copy';
import { Row } from '../grid/Row';
import { Column } from '../grid/Column';
import { ButtonLink } from '../link/ButtonLink';
import Label from '../forms/Label';

const Container = styled(Row)`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const WorkoutContainer = styled(Box)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.darkestGrey};
  width: 85%;
  display: flex;
  margin: 24px 0px;
  padding: 24px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const AvatarContainer = styled(Column)`
  width: 25%;
  padding: 24px;
  text-align: center;

  @media (max-width: 768px) {
    width: 75%;
    margin-bottom: 24px;
  }
`;

const DetailsContainer = styled(Column)`
  flex-grow: 2;
  padding: 24px;
`;

const StyledH4 = styled(H4)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 12px 0px;
  margin: 12px 0px;
  border-radius: 5px;
`;

const ActionsContainer = styled(Column)`
  width: 15%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Workout = ({ workout }) => {
  if (!Object.keys(workout).length) {
    return null;
  }
  return (
    <Container>
      <WorkoutContainer>
        <AvatarContainer>
          <Image
            src={
              workout?.user?.avatar && `/assets/${workout?.user?.avatar}.png`
            }
            alt="avatar image"
          />
          <StyledH4 color="primary">{workout.caloriesBurned}</StyledH4>
          <H6 color="primary">Calories</H6>
        </AvatarContainer>
        <Divider color="grey" vertical />
        <DetailsContainer>
          <H4 color="primary">{`${workout?.name}`}</H4>
          <Row>
            <Label>Author</Label>
            <Copy>{`${workout.user.firstName} ${workout.user.lastName}`}</Copy>
          </Row>
          <Row>
            <Label>Description</Label>
            <Copy>{workout?.description}</Copy>
          </Row>
          <Row>
            <Label>Exercises</Label>
            <Copy>{workout?.exercises?.length} total exercise(s)</Copy>
          </Row>
          <Row>
            <Label>Sets</Label>
            <Copy>
              {workout?.exercises?.reduce(
                (acc, curr) => acc + curr.routine.length,
                0
              )}{' '}
              total set(s)
            </Copy>
          </Row>
          <Row>
            <Label>Date</Label>
            <Copy>
              <Moment format="MMM Do, YYYY">{workout.date}</Moment>
            </Copy>
          </Row>
        </DetailsContainer>
      </WorkoutContainer>
      <ActionsContainer>
        <ButtonLink routerLink to={`/workout/${workout._id}`}>
          View
        </ButtonLink>
      </ActionsContainer>
    </Container>
  );
};

Workout.propTypes = {
  workout: PropTypes.object,
};

export default Workout;
