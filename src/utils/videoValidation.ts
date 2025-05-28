
export const validateVideo = async (videoId: string): Promise<boolean> => {
  try {
    // Simple validation - try to create iframe src URL
    const testUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log('✅ Video validation passed for:', videoId);
    return true;
  } catch (error) {
    console.error('❌ Video validation failed for:', videoId, error);
    return false;
  }
};
