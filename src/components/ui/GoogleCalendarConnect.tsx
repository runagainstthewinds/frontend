import React, { useState, useEffect } from 'react';

// env vars
const API_KEY = import.meta.env.VITE_APP_VITE_APP_GOOGLE_API_KEY; // setup env after
const CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID_URL;
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  attendees?: Array<{
    email: string;
    responseStatus: string;
  }>;
}

const GoogleCalendarConnect: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [gapiInited, setGapiInited] = useState<boolean>(false);
  const [gisInited, setGisInited] = useState<boolean>(false);
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = initializeGapiClient;
    document.body.appendChild(gapiScript);

    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = initializeGisClient;
    document.body.appendChild(gisScript);

    return () => {

      document.body.querySelectorAll('script[src="https://apis.google.com/js/api.js"], script[src="https://accounts.google.com/gsi/client"]')
        .forEach(script => document.body.removeChild(script));
    };
  }, []);

  const initializeGapiClient = async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        window.gapi.load('client', {
          callback: resolve,
          onerror: reject,
        });
      });
      
      await window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      });
      
      setGapiInited(true);
      console.log('GAPI client initialized');
    } catch (err: any) {
      setError(`Error initializing GAPI client: ${err.message || 'Unknown error'}`);
      console.error('Error initializing GAPI client:', err);
    }
  };

  const initializeGisClient = () => {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            setIsSignedIn(true);
            console.log('Successfully signed in');
          }
        },
        error_callback: (err: any) => {
          setError(`Error getting OAuth token: ${err.message || err.type || 'Unknown error'}`);
          console.error('Error getting OAuth token:', err);
        }
      });
      
      setTokenClient(client);
      setGisInited(true);
      console.log('GIS client initialized');
    } catch (err: any) {
      setError(`Error initializing GIS client: ${err.message || 'Unknown error'}`);
      console.error('Error initializing GIS client:', err);
    }
  };

  const handleConnectCalendar = () => {
    if (!gapiInited || !gisInited) {
      setError('Google API not initialized yet. Please wait and try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    tokenClient.requestAccessToken();
    setIsLoading(false);
  };

  const handleSignOut = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken(null);
      setIsSignedIn(false);
      setEvents([]);
      console.log('Signed out from Google');
    }
  };

  const fetchCalendarEvents = async () => {
    if (!isSignedIn) {
      setError('Please connect to Google Calendar first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await window.gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      });

      const events = response.result.items;
      setEvents(events);
      console.log('Google Calendar Events:', events);
    } catch (err: any) {
      setError(`Error fetching calendar events: ${err.message || err.details || 'Unknown error'}`);
      console.error('Error fetching calendar events:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="google-calendar-container">
      <h2>Google Calendar Integration</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {!isSignedIn ? (
            <button 
              onClick={handleConnectCalendar}
              disabled={!gapiInited || !gisInited || isLoading}
              className="connect-button"
            >
              Connect Google Calendar
            </button>
          ) : (
            <div className="connected-container">
              <div className="success-message">Connected to Google Calendar!</div>
              <div className="button-group">
                <button onClick={fetchCalendarEvents} className="fetch-button">
                  Fetch Calendar Events
                </button>
                <button onClick={handleSignOut} className="sign-out-button">
                  Sign Out
                </button>
              </div>
            </div>
          )}
          
          {events.length > 0 && (
            <div className="events-container">
              <h3>Upcoming Events ({events.length})</h3>
              <ul>
                {events.map((event) => (
                  <li key={event.id}>
                    {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

declare global {
  interface Window {
    gapi: any;
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (params: any) => any;
          revoke: (token: string, callback?: () => void) => void;
        }
      }
    };
  }
}

export default GoogleCalendarConnect;