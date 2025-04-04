export interface User {
    userId: string;
    username: string;
    email: string | null;
    password: string;
    googleCalendarToken: string | null;
    stravaToken: string | null;
    userDetails: any | null;
    trainingPlan: any | null;
    trainingSessions: any | null;
    shoes: any | null;
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export interface RegisterResponse {
    userId: string;
    username: string;
    email: string | null;
    password: string;
    googleCalendarToken: string | null;
    stravaToken: string | null;
    userDetails: any | null;
    trainingPlan: any | null;
    trainingSessions: any | null;
    shoes: any | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
  }