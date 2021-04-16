import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { getProfile as getProfileAction } from '../../actions/profile';
import { getWorkoutsByUser as getWorkoutsByUserAction } from '../../actions/workout';

import { H3 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Copy } from '../typography/Copy';
import { Image } from '../image/Image';
import Spinner from '../layout/Spinner';
import { Column } from '../grid/Column';
import { Row } from '../grid/Row';
import { ButtonLink } from '../link/ButtonLink';
import Label from '../forms/Label';

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

const ProfileLabel = styled(Label)`
  width: 33.33%;
`;

const Profile = ({
  getProfile,
  profile: { profile, loading: profileLoading },
  user: { user, loading: userLoading, isAuthenticated },
  workouts: { workouts, loading: workoutsLoading },
  getWorkoutsByUser,
}) => {
  useEffect(() => {
    if (user && user._id) {
      getProfile(user._id);
      getWorkoutsByUser(user._id);
    }
  }, [getProfile, getWorkoutsByUser, user]);

  if (
    (profileLoading && profile === null) ||
    (userLoading && user === null) ||
    (workoutsLoading && !workouts.length)
  ) {
    return <Spinner />;
  }

  const noProfileButton = (
    <ButtonLink routerLink to={`/edit-profile/${profile?.user?._id}`}>
      Create Profile
    </ButtonLink>
  );

  const existingProfileButton = (
    <ButtonLink routerLink to={`/edit-profile/${profile?.user?._id}`}>
      Edit Profile
    </ButtonLink>
  );

  return (
    <Container>
      <InfoBox>
        <InfoContainer>
          <HeadingContainer>
            <H3 color="primary">{`${user?.firstName} ${user?.lastName}`}</H3>
          </HeadingContainer>
          <StatsContainer>
            <Image src={`/assets/${user?.avatar}.png`} alt="user avatar" />
          </StatsContainer>
        </InfoContainer>
      </InfoBox>
      {isAuthenticated && profile ? existingProfileButton : noProfileButton}
      {profile && (
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
                <Moment format="MMM Do, YYYY">{user?.date}</Moment>
              </Copy>
            </DetailsSegment>
          </Row>
          <Row>
            <DetailsSegment>
              <ProfileLabel>Total Workouts:</ProfileLabel>
              <Copy>{workouts?.length}</Copy>
            </DetailsSegment>
          </Row>
        </DetailsContainer>
      )}
    </Container>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  user: PropTypes.object,
  getWorkoutsByUser: PropTypes.func,
  workouts: PropTypes.array,
};

const mapState = ({ profile, user, workout }) => ({
  profile,
  user,
  workouts: workout,
});

export default connect(mapState, {
  getProfile: getProfileAction,
  getWorkoutsByUser: getWorkoutsByUserAction,
})(Profile);
