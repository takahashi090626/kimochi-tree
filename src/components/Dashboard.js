import React from 'react';
import styled from 'styled-components';
import EmotionSphere from './EmotionSphere';
import SharedEcosystem from './SharedEcosystem';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <EmotionSphere />
      <SharedEcosystem />
    </DashboardContainer>
  );
};

export default Dashboard;