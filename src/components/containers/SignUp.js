import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import { H3, H4 } from '../typography/Headings';
import { Copy } from '../typography/Copy';
import { Divider } from '../layout/Divider';
import Workout from '../svg/Workout';
import { TextInput } from '../forms/TextInput';
import { Button } from '../buttons/Button';
import { Box } from '../grid/Box';
import { Row } from '../grid/Row';
import { Image } from '../image/Image';
import { createUser as createUserAction } from '../../actions/user';

const Container = styled(Box)`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  margin: 24px 0px;
  padding: 12px 0px;
  background-color: ${({ theme }) => theme.grey};
  width: 100%;
  border-radius: 5px;
`;

const FormGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const FormSection = styled.section`
  width: 50%;
  padding: 0px 12px;
  input {
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AvatarContainer = styled(Row)``;

const Avatar = styled(Box)`
  width: calc(33.33% - 24px);
  margin: 12px;
  transition: ${({ theme }) => theme.defaultTransition};
  img {
    border-radius: 100%;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0);
  }

  img {
    ${({ selected }) =>
      selected &&
      css`
        box-shadow: 0 8px 12px 0 rgba(213, 253, 69, 0.4);
      `}
  }
`;

const ImageContainer = styled(Box)`
  width: 40%;
  margin: 24px 0px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const SignUp = ({ createUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    avatar: '',
    firstName: '',
    lastName: '',
  });

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createUser(formData);
  };

  const { email, password, password2, avatar, firstName, lastName } = formData;

  const avatarList = [
    {
      avatar: 'sportsman',
    },
    {
      avatar: 'sportswoman',
    },
    {
      avatar: 'dumbbell',
    },
    {
      avatar: 'hand-grip',
    },
    {
      avatar: 'kettlebell',
    },
    {
      avatar: 'smartwatch',
    },
  ];

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <H3 color="primary">Sign Up For An Account</H3>
      <Divider color="grey" />
      <FormContainer onSubmit={onSubmit}>
        <FormGroup>
          <FormSection>
            <H4 color="primary">Credentials</H4>
            <TextInput
              type="text"
              id="firstName"
              label="firstName"
              value={firstName}
              onChange={onChange}
            />
            <TextInput
              type="text"
              id="lastName"
              label="lastName"
              value={lastName}
              onChange={onChange}
            />
            <Copy color="white">
              Please enter an email that hasn't already been registered
            </Copy>
            <TextInput
              type="text"
              id="email"
              label="email"
              value={email}
              onChange={onChange}
            />
            <Copy color="white">Please enter a unique password</Copy>
            <TextInput
              type="password"
              id="password"
              label="password"
              value={password}
              onChange={onChange}
            />
            <TextInput
              type="password"
              id="password2"
              label="Reenter your password"
              value={password2}
              onChange={onChange}
            />
            <Copy color="white">Please select an avatar</Copy>
            <AvatarContainer>
              {avatarList.map(({ avatar: avatarType }) => (
                <Avatar
                  key={avatarType}
                  selected={avatar === avatarType}
                  onClick={() => {
                    onChange({ target: { name: 'avatar', value: avatarType } });
                  }}
                >
                  <Image src={`/assets/${avatarType}.png`} alt={avatarType} />
                </Avatar>
              ))}
            </AvatarContainer>
          </FormSection>
        </FormGroup>
        <ButtonContainer>
          <Button type="register">Register</Button>
        </ButtonContainer>
      </FormContainer>
      <ImageContainer>
        <Workout />
      </ImageContainer>
    </Container>
  );
};

SignUp.propTypes = {
  createUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapState = state => ({
  isAuthenticated: state?.user.isAuthenticated,
});

export default connect(mapState, { createUser: createUserAction })(SignUp);
