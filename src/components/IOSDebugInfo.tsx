
import React, { useState, useEffect } from 'react';
import { useFlowContext } from '@/context/FlowContext';

const IOSDebugInfo = () => {
  const { currentScreen } = useFlowContext();
  const [debugInfo, setDebugInfo] = useState<any>({});
  
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      const info = {
        screen: currentScreen,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
        orientation: screen.orientation?.type || 'unknown',
        timestamp: new Date().toLocaleTimeString(),
        conversationVisible: currentScreen === 5,
        navigationHistory: window.navigationHistory || []
      };
      
      setDebugInfo(info);
      console.log('📱 iOS Debug Update:', info);
    }
  }, [currentScreen]);
  
  // Only show on iOS and when conversation screen should be visible
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!isIOS || currentScreen !== 5) {
    return null;
  }
  
  return (
    <div className="ios-debug-info">
      <div>Screen: {debugInfo.screen}</div>
      <div>Conv: {debugInfo.conversationVisible ? 'YES' : 'NO'}</div>
      <div>VP: {debugInfo.viewport}</div>
      <div>Time: {debugInfo.timestamp}</div>
      <div>Nav: [{debugInfo.navigationHistory?.slice(-3).join(',')}]</div>
    </div>
  );
};

export default IOSDebugInfo;
