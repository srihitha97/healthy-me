import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { getProfile as getProfileAction } from '../../actions/profile';
import { getWorkoutsByUser as getWorkoutsByUserAction } from '../../actions/workout';

import { H6, H3 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Copy } from '../typography/Copy';
import { Image } from '../image/Image';
import Spinner from '../layout/Spinner';
import { Column } from '../grid/Column';
import { Row } from '../grid/Row';
import { Divider } from '../layout/Divider';
import Workout from '../workout/Workout';

const Container = styled(Box)`
  padding: 48px 0px;
  width: 90%;
  margin: 0 auto;
`;

const InfoBox = styled(Box)`
  position: relative;
  background: ${({ theme }) => theme.grey};
  text-align: center;
  border-radius: 5px;
  margin-bottom: 48px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
`;

const InfoContainer = styled(Box)`
  border: 10px solid ${({ theme }) => theme.primaryColor};
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const HeadingContainer = styled(Box)`
  border: 10px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  padding: 12px;
  margin: 12px;
  width: auto;

  h3 {
    display: inline-block;
  }
`;

const StatsContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 24px auto;
  max-width: 300px;
  padding: 12px;
`;

const DetailsSegment = styled(Column)`
  display: flex;
  align-items: center;
`;

const DetailsContainer = styled(Row)``;

const ProfileLabel = styled(H6)`
  background-color: ${({ theme }) => theme.darkerGrey};
  margin: 12px 12px 12px 0px;
  padding: 12px;
  display: inline-block;
  border-radius: 5px;
  width: 33.33%;
`;

const ContentContainer = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const ProfileById = ({
  getProfile,
  profile: { profile, loading: profileLoading },
  workouts: { workouts, loading: workoutsLoading },
  getWorkoutsByUser,
  match: { params },
}) => {
  useEffect(() => {
    if (params?.userId) {
      getProfile(params.userId);
      getWorkoutsByUser(params.userId);
    }
  }, [getProfile, getWorkoutsByUser, params]);

  if (
    (profileLoading && profile === null) ||
    (workoutsLoading && !workouts.length)
  ) {
    return <Spinner />;
  }

  return (
    <Container>
      <InfoBox>
        <InfoContainer>
          <HeadingContainer>
            <H3 color="primary">{`${profile?.user?.firstName} ${profile?.user?.lastName}`}</H3>
          </HeadingContainer>
          <StatsContainer>
            <Image
              src={`/assets/${profile?.user?.avatar}.png`}
              alt="user avatar"
            />
          </StatsContainer>
        </InfoContainer>
      </InfoBox>
      <DetailsContainer>
        <Row>
          <DetailsSegment>
            <ProfileLabel>Daily Calories Goal:</ProfileLabel>
            <Copy large color="primary">
              {profile?.dailyCaloriesGoal}
            </Copy>
          </DetailsSegment>
        </Row>
        <Row>
          <DetailsSegment>
            <ProfileLabel>Bio:</ProfileLabel>
            <Copy>{profile?.bio}</Copy>
          </DetailsSegment>
        </Row>
        <Row>
          <DetailsSegment>
            <ProfileLabel>Activities:</ProfileLabel>
            <Copy>{profile?.activities.join(', ')}</Copy>
          </DetailsSegment>
        </Row>
        <Row>
          <DetailsSegment>
            <ProfileLabel>Member Since:</ProfileLabel>
            <Copy>
              <Moment format="MMM Do, YYYY">{profile?.user?.date}</Moment>
            </Copy>
          </DetailsSegment>
        </Row>
        <Row>
          <DetailsSegment>
            <ProfileLabel>Total Workouts:</ProfileLabel>
            <Copy>{workouts.length}</Copy>
          </DetailsSegment>
        </Row>
      </DetailsContainer>

      <ContentContainer>
        <H3>{profile?.user?.firstName}'s Workouts</H3>
        <Divider color="grey" />
        {workouts.length
          ? workouts.map(workout => (
              <Workout profile={profile} workout={workout} key={workout._id} />
            ))
          : null}
      </ContentContainer>
    </Container>
  );
};

ProfileById.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  getWorkoutsByUser: PropTypes.func,
  workouts: PropTypes.array,
  match: PropTypes.object,
};

const mapState = ({ profile, workout }) => ({
  profile,
  workouts: workout,
});

export default connect(mapState, {
  getProfile: getProfileAction,
  getWorkoutsByUser: getWorkoutsByUserAction,
})(ProfileById);
