
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConversationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect to the main flow
    navigate('/', { replace: true });
  }, [navigate]);

  // Return null since we're redirecting immediately
  return null;
};

export default ConversationPage;
