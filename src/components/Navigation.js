import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1a1a2e;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
`;

const Navigation = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <Nav>
      <NavLink to="/">キモチツリー</NavLink>
      <div>
        {currentUser ? (
          <>
            <NavLink to="/input">感情入力</NavLink>
            <NavLink to="/profile">プロフィール</NavLink>
            <NavLink to="/" onClick={signOut}>ログアウト</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">ログイン</NavLink>
            <NavLink to="/register">登録</NavLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navigation;