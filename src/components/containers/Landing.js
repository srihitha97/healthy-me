import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { loginUser as loginUserAction } from '../../actions/user';

import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { H3 } from '../typography/Headings';
import { Column } from '../grid/Column';
import { Icon } from '../typography/Icon';
import { Divider } from '../layout/Divider';
import { Copy } from '../typography/Copy';
import { Image } from '../image/Image';
import { TextInput } from '../forms/TextInput';
import { TextLink } from '../link/TextLink';
import { Button } from '../buttons/Button';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const LoginRow = styled(Row)`
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const LoginContainer = styled(Column)`
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
    top: -100px;
    transform: inherit;
  }
`;

const InputContainer = styled.div`
  margin: 24px 0px;

  div:first-child {
    margin-bottom: 12px;
  }
`;

const StyledCopy = styled(Copy)`
  display: flex;
  flex-wrap: wrap;
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

const InfoContainer = styled(Column)`
  width: 100%;
  padding: 0px;
`;

const InfoGroup = styled.ul`
  width: 100%;
  padding: 12px 0px 0px;
  display: flex;

  > li:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
  }
`;

const InfoItem = styled.li`
  width: calc(100% - 24px);
  background-color: ${({ theme }) => theme.grey};
  margin: 12px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const InfoItemText = styled(Box)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 8px;
  margin: 12px;
  border-radius: 5px;
`;

const Landing = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const onSubmit = e => {
    e.preventDefault();
    loginUser(formData);
  };

  const { email, password } = formData;
  return (
    <>
      <Container as="section">
        <LoginRow>
          <ImageContainer>
            <StyledImage src="./assets/duotone.png" alt="Weights" />
          </ImageContainer>
          <LoginContainer as="form" onSubmit={onSubmit}>
            <H3 color="primary">Gymie</H3>
            <Divider color="grey" />
            <InputContainer>
              <TextInput
                type="text"
                id="email"
                label="email"
                onChange={onChange}
                value={email}
              />
              <TextInput
                type="password"
                id="password"
                label="password"
                onChange={onChange}
                value={password}
              />
            </InputContainer>
            <Divider color="grey" />
            <Button href="/">
              <Copy>Log In</Copy>
            </Button>
            <StyledCopy>
              Don't have an account? &nbsp;
              <TextLink to="/sign-up" routerLink>
                Sign Up
              </TextLink>
            </StyledCopy>
          </LoginContainer>
        </LoginRow>
      </Container>

      <InfoContainer>
        <InfoGroup>
          <InfoItem>
            <Icon className="fas fa-users" fontSize="40px"></Icon>
            <InfoItemText>
              <Copy>
                Join a community to train and see your continued growth foster
                together.
              </Copy>
            </InfoItemText>
          </InfoItem>
          <InfoItem>
            <Icon className="fas fa-running" fontSize="40px"></Icon>
            <InfoItemText>
              <Copy>
                Create your workouts, see what others have listed as their
                workouts, and count the calories you burn.
              </Copy>
            </InfoItemText>
          </InfoItem>
          <InfoItem>
            <Icon className="fas fa-list-ul" fontSize="40px"></Icon>
            <InfoItemText>
              <Copy>
                Track your progress, create and edit your workout routines.
              </Copy>
            </InfoItemText>
          </InfoItem>
        </InfoGroup>
      </InfoContainer>
    </>
  );
};

Landing.propTypes = {
  loginUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapState = state => ({
  isAuthenticated: state?.user.isAuthenticated,
});

export default connect(mapState, { loginUser: loginUserAction })(Landing);
