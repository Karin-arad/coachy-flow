
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ConversationPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden p-6">
      <motion.div 
        className="max-w-md mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="flex items-center text-gray-600 mb-6 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-2xl font-bold mb-4 text-center">Conversation Page</h1>
        
        <div className="bg-mint-50 rounded-xl p-6 shadow-sm border border-mint-100">
          <p className="text-center mb-6">
            Welcome to the Conversation Page! This is a simple standalone page.
          </p>
          
          <p className="text-sm text-gray-600 italic text-center">
            Ready to start your wellness journey?
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationPage;
