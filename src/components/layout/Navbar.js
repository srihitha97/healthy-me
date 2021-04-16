import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppWrapper from './AppWrapper';
import { TextLink } from '../link/TextLink';
import { H3 } from '../typography/Headings';
import { Icon } from '../typography/Icon';
import { Copy } from '../typography/Copy';
import { ButtonLink } from '../link/ButtonLink';
import { Row } from '../grid/Row';
import { logout as logoutAction } from '../../actions/user';

const Header = styled.header`
  background-color: ${({ theme }) => theme.primaryColor};
`;

const NavRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  padding: 12px 0px;
`;

const LinkList = styled.ul`
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  display: flex;
  align-content: center;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    a {
      margin: 6px;
    }
  }
`;

const NavLinkCopy = styled(Copy)`
  padding-top: 4px;
  padding-left: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledButtonLink = styled(ButtonLink)`
  display: flex;
  align-items: center;
`;

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onClick = () => {
    logout();
  };
  return (
    <Header>
      <AppWrapper>
        <NavRow>
          <LogoContainer>
            <TextLink to="/" routerLink color="#3A3A3A">
              <Icon
                className="fas fa-dumbbell"
                fontSize="40px"
                color="#3A3A3A"
              ></Icon>
              <H3>Gymie</H3>
            </TextLink>
          </LogoContainer>
          {!loading && !isAuthenticated ? (
            <LinkList>
              <LinkItem>
                <StyledButtonLink to="/users" primary="true" routerLink>
                  <Icon className="fas fa-user-friends" fontSize="16px"></Icon>
                  <NavLinkCopy>Users</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
              <LinkItem>
                <StyledButtonLink
                  to="/community-workouts"
                  primary="true"
                  routerLink
                >
                  <Icon className="fas fa-users" fontSize="16px"></Icon>
                  <NavLinkCopy>Community</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
            </LinkList>
          ) : (
            <LinkList>
              <LinkItem>
                <StyledButtonLink to="/users" primary="true" routerLink>
                  <Icon className="fas fa-user-friends" fontSize="16px"></Icon>
                  <NavLinkCopy>Users</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
              <LinkItem>
                <StyledButtonLink
                  to="/community-workouts"
                  primary="true"
                  routerLink
                >
                  <Icon className="fas fa-users" fontSize="16px"></Icon>
                  <NavLinkCopy>Community</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
              <LinkItem>
                <StyledButtonLink to="/profile" primary="true" routerLink>
                  <Icon className="fas fa-user" fontSize="16px"></Icon>
                  <NavLinkCopy>Profile</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
              <LinkItem>
                <StyledButtonLink to="/dashboard" primary="true" routerLink>
                  <Icon className="fas fa-edit" fontSize="16px"></Icon>
                  <NavLinkCopy>Dashboard</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
              <LinkItem>
                <StyledButtonLink onClick={onClick} href="#!" primary="true">
                  <Icon className="fas fa-sign-out-alt" fontSize="16px"></Icon>
                  <NavLinkCopy>Log Out</NavLinkCopy>
                </StyledButtonLink>
              </LinkItem>
            </LinkList>
          )}
        </NavRow>
      </AppWrapper>
    </Header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
};

const mapState = state => ({
  auth: state.user,
});

export default connect(mapState, { logout: logoutAction })(Navbar);
