import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import styled from 'styled-components';

const EcosystemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  height: 30vh;
  overflow-y: auto;
`;

const EmotionCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const SharedEcosystem = () => {
  const [publicEntries, setPublicEntries] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'emotions'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPublicEntries(entries);
    });

    return () => unsubscribe();
  }, []);

  return (
    <EcosystemContainer>
      {publicEntries.map((entry) => (
        <EmotionCard key={entry.id} style={{ backgroundColor: entry.color }}>
          <h3>{entry.emotionType}</h3>
          <p>{entry.text}</p>
        </EmotionCard>
      ))}
    </EcosystemContainer>
  );
};

export default SharedEcosystem;