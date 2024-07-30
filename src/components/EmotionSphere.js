import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const CanvasContainer = styled.div`
  width: 100%;
  height: 70vh;
`;

function EmotionParticle({ position, color }) {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function EmotionSphere() {
  const { currentUser } = useAuth();
  const [emotions, setEmotions] = React.useState([]);

  useEffect(() => {
    const fetchEmotions = async () => {
      if (currentUser) {
        const q = query(collection(db, 'emotions'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        setEmotions(querySnapshot.docs.map(doc => doc.data()));
      }
    };
    fetchEmotions();
  }, [currentUser]);

  return (
    <CanvasContainer>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere args={[3, 64, 64]}>
          <meshStandardMaterial color="#e94560" />
        </Sphere>
        {emotions.map((emotion, index) => (
          <EmotionParticle 
            key={index} 
            position={[
              Math.random() * 4 - 2,
              Math.random() * 4 - 2,
              Math.random() * 4 - 2
            ]} 
            color={emotion.color}
          />
        ))}
      </Canvas>
    </CanvasContainer>
  );
}

export default EmotionSphere;