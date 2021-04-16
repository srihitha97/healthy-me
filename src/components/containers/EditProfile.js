import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  getProfile as getProfileAction,
  updateProfile as updateProfileAction,
  createProfile as createProfileAction,
} from '../../actions/profile';
import { Column } from '../grid/Column';
import { H1 } from '../typography/Headings';
import { Divider } from '../layout/Divider';
import Spinner from '../layout/Spinner';
import { TextInput } from '../forms/TextInput';
import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { Copy } from '../typography/Copy';
import { Button } from '../buttons/Button';
import { setAlert as setAlertAction } from '../../actions/alert';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const ProfileContainer = styled(Box)`
  background-color: ${({ theme }) => theme.darkestGrey};
  border-radius: 5px;
  padding: 24px;
  margin: 24px;
  width: calc(100% - 48px);

  @media (max-width: 768px) {
    width: calc(100% - 24px);
    margin: 14px;
    padding: 12px;
  }
`;

const InputRow = styled(Row)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 12px;
  text-align: center;
`;

const StyledCopy = styled(Copy)`
  margin: 12px;
`;

const initialState = {
  dailyCaloriesGoal: 0,
  bio: '',
  activities: '',
};

const EditProfile = ({
  profile: { profile, loading },
  match: { params },
  history,
  getProfile,
  updateProfile,
  createProfile,
  setAlert,
}) => {
  const data = _.isNull(profile) ? initialState : profile;
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    getProfile(params.id);
    if (profile) {
      setFormData(profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && profile === null) {
    return <Spinner />;
  }

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (profile) {
      if (_.isEqual(formData, profile)) {
        setAlert('You have not made any changes', 'danger', 2000);
      } else {
        updateProfile(formData, history);
      }
    } else {
      createProfile(formData, history);
    }
  };

  const { dailyCaloriesGoal, bio, activities } = formData;

  return (
    <Container>
      <Column>
        <H1 color="primary">{profile ? 'Edit' : 'Create'} Profile</H1>
        <Divider color="grey" />
      </Column>
      <ProfileContainer as="form" onSubmit={onSubmit}>
        <InputRow>
          <TextInput
            type="number"
            id="dailyCaloriesGoal"
            label="Daily Calories Goal"
            value={dailyCaloriesGoal}
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <TextInput
            type="text"
            id="bio"
            value={bio}
            label="Bio"
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <TextInput
            type="text"
            id="activities"
            label="Activities"
            value={activities}
            onChange={onChange}
          />
          <StyledCopy small>Keep activities comma separated</StyledCopy>
        </InputRow>
        <Button type="submit">Submit</Button>
      </ProfileContainer>
    </Container>
  );
};

EditProfile.propTypes = {
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  createProfile: PropTypes.func,
  setAlert: PropTypes.func,
  profile: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};

const mapState = ({ profile, user }) => ({
  profile,
  user,
});

export default connect(mapState, {
  getProfile: getProfileAction,
  updateProfile: updateProfileAction,
  createProfile: createProfileAction,
  setAlert: setAlertAction,
})(EditProfile);
