import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #e94560;
  color: white;
  border: none;
  cursor: pointer;
`;

const EmotionInput = () => {
  const [emotionType, setEmotionType] = useState('');
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'emotions'), {
        userId: currentUser.uid,
        emotionType,
        text,
        isPublic,
        createdAt: new Date(),
        color: getColorForEmotion(emotionType),
      });
      setEmotionType('');
      setText('');
      setIsPublic(false);
      alert('感情が記録されました');
    } catch (error) {
      console.error('Error adding emotion:', error);
    }
  };

  const getColorForEmotion = (emotion) => {
    const colors = {
      happy: '#FFD700',
      sad: '#4169E1',
      angry: '#FF4500',
      excited: '#32CD32',
      anxious: '#9932CC',
    };
    return colors[emotion] || '#FFFFFF';
  };

  return (
    <InputContainer>
      <h2>感情を記録</h2>
      <Form onSubmit={handleSubmit}>
        <Select value={emotionType} onChange={(e) => setEmotionType(e.target.value)} required>
          <option value="">感情を選択</option>
          <option value="happy">幸せ</option>
          <option value="sad">悲しい</option>
          <option value="angry">怒り</option>
          <option value="excited">興奮</option>
          <option value="anxious">不安</option>
        </Select>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="詳細を入力"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          公開する
        </label>
        <Button type="submit">記録</Button>
      </Form>
    </InputContainer>
  );
};

export default EmotionInput;