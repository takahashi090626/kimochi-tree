import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ProfileInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
`;

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <ProfileContainer>
      <h2>プロフィール</h2>
      <ProfileInfo>
        <p>Email: {currentUser.email}</p>
        <p>登録日: {new Date(currentUser.createdAt.toDate()).toLocaleDateString()}</p>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;