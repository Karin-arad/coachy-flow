
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ConversationPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white overflow-auto" style={{
      aspectRatio: 'unset',
      maxWidth: 'none',
      minWidth: 'unset',
      height: 'auto',
      minHeight: '100vh'
    }}>
      <motion.div 
        className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="flex items-center text-gray-600 mb-6 hover:text-gray-800 self-start">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-6 text-center">New Conversation</h1>
          
          <div className="bg-mint-50 rounded-xl p-6 shadow-sm border border-mint-100">
            <p className="text-center mb-6">
              Welcome to your fresh conversation! This is where we'll have our chat to help you find the perfect workout for today.
            </p>
            
            <p className="text-sm text-gray-600 italic text-center mb-6">
              Ready to start your wellness journey?
            </p>
            
            <div className="flex justify-center">
              <Button 
                variant="rainbow" 
                className="px-8 py-3 text-lg font-medium"
                onClick={() => window.location.href = '/'}
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationPage;
