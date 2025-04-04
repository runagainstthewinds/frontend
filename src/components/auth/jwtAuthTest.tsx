import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { testAuthEndpoint } from '@/api/auth';

interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  data?: any;
}

const JWTAuthTest: React.FC = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testEndpoint = async () => {
    if (!token) {
      setError('No authentication token available. Please log in first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log('Testing authentication with token');
      const result = await testAuthEndpoint();
      setResponse(result);
      console.log('API response:', result);
    } catch (err: any) {
      console.error('API error:', err);
      setError(err.message || 'Failed to test authentication');
    } finally {
      setLoading(false);
    }
  };

  return (  
      <button
        onClick={testEndpoint}
        disabled={loading || !token}
        className={`px-4 py-2 mt-6 rounded-md font-medium ${
          !token 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : loading 
              ? 'bg-teal-100 text-teal-800 cursor-wait' 
              : 'bg-teal-600 text-white hover:bg-teal-700'
        } transition-colors`}
      >
        {loading ? 'Testing...' : 'Test JWT Authentication'}
      </button>
  );
};

export default JWTAuthTest;
