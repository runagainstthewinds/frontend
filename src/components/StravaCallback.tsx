import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { getUserByUsername } from '@/api/user';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface TokenExchangeResponse {
  status: string;
  message: string;
  athleteName?: string;
}

interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

const StravaCallback: React.FC = () => {
  const [status, setStatus] = useState<string>('Processing...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const exchangeCompleted = useRef(false);

  const updateUserCache = async () => {
    try {
      if (!token || !user) return;

      const decoded = jwtDecode<JwtPayload>(token);
      const username = decoded.sub;

      const updatedUser = await getUserByUsername(username);

      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setTimeout(() => {
        sessionStorage.setItem('redirect_after_refresh', '/dashboard');

        // clean up guard caca
        localStorage.removeItem('strava_flow_initiated');
        localStorage.removeItem('strava_flow_expires');

        window.location.href = window.location.origin + '/dashboard?refresh=true';
      }, 3000);
      
    } catch (error) {
      console.error('Failed to update user cache:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');

    if (exchangeCompleted.current) {
      return () => {
          localStorage.removeItem('strava_flow_initiated');
          localStorage.removeItem('strava_flow_expires');
      };
    }

    if (error) {
      setStatus(`Authorization failed: ${error}`);
      setIsError(true);
      setIsLoading(false);
      exchangeCompleted.current = true;
      return () => {
        localStorage.removeItem('strava_flow_initiated');
        localStorage.removeItem('strava_flow_expires');
      };
    }

    if (!code) {
      setStatus('No authorization code received');
      setIsError(true);
      setIsLoading(false);
      exchangeCompleted.current = true;
      return () => {
          localStorage.removeItem('strava_flow_initiated');
          localStorage.removeItem('strava_flow_expires');
      };
    }

    exchangeToken(code, state);

    exchangeCompleted.current = true;

    
    
  }, [location, navigate]);

  const exchangeToken = async (code: string, state: string | null) => {
    try {
      if (!token) {
        setStatus('Not authenticated. Please log in.');
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const response = await axios.post<TokenExchangeResponse>(
        '/api/strava/exchange-token',
        { code, state },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setIsSuccess(true);
      setStatus(`Successfully connected Strava account!${
        response.data.athleteName ? ` Welcome, ${response.data.athleteName}!` : ''
      }`);

      if (response.data.status === 'success') {
        await updateUserCache();
      }
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatus(`Error connecting Strava: ${error.response.data.message || error.message}`);
      } else {
        setStatus('An unexpected error occurred');
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Strava Connection
          </h2>
          
          <div className="mb-6">
            {isLoading && (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-orange-500 animate-spin mb-4" />
                <p className="text-gray-600">{status}</p>
              </div>
            )}
            
            {isSuccess && (
              <div className="flex flex-col items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-green-600 font-medium">{status}</p>
                <p className="text-gray-500 mt-2">Redirecting to dashboard shortly...</p>
              </div>
            )}
            
            {isError && (
              <div className="flex flex-col items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-600 font-medium">{status}</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              You can manage your connected accounts in your profile settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StravaCallback;
