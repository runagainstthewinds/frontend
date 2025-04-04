import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasUppercase: false,
    hasNumber: false,
    noSpaces: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const toggleView = () => {
    setError(null);
    setIsLoginView(!isLoginView);
  };

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8 && password.length <= 32,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      noSpaces: !/\s/.test(password),
    });
  };

  const isPasswordValid =
    passwordValidation.length &&
    passwordValidation.hasUppercase &&
    passwordValidation.hasNumber &&
    passwordValidation.noSpaces;

  const isUsernameValid = (username: string) => {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return (
      username.length > 0 &&
      username.length <= 12 &&
      alphanumericRegex.test(username)
    );
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "username" && value !== loginForm.username) {
      processedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (name === "password" && value !== loginForm.password) {
      processedValue = value.replace(/\s/g, "");
    }

    setLoginForm({
      ...loginForm,
      [name]: processedValue,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "username" && value !== registerForm.username) {
      processedValue = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (name === "password" && value !== registerForm.password) {
      processedValue = value.replace(/\s/g, "");
      validatePassword(processedValue);
    }

    setRegisterForm({
      ...registerForm,
      [name]: processedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLoginView) {
      if (loginForm.username.trim() === "" || loginForm.password === "") {
        setError("Please enter both username and password");
        return;
      }
    } else {
      if (!isUsernameValid(registerForm.username)) {
        if (registerForm.username.length === 0) {
          setError("Username is required");
        } else if (registerForm.username.length > 12) {
          setError("Username must be 12 characters or less");
        } else {
          setError("Username can only contain letters and numbers");
        }
        return;
      }

      if (!isPasswordValid) {
        setError("Password does not meet all requirements");
        return;
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setLoading(true);

    try {
      if (isLoginView) {
        await login({
          username: loginForm.username,
          password: loginForm.password,
        });
      } else {
        await register({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
        });
      }
      onClose();
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLoginView ? "Sign In" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.includes("Username already exists") ? (
              <div className="flex flex-col">
                <span className="font-medium">Username already exists</span>
                <span className="text-sm">
                  Please choose a different username
                </span>
              </div>
            ) : (
              error
            )}
          </div>
        )}

        {isLoginView ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="login-username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="login-username"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={12}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="login-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="register-username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="register-username"
                name="username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={12}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="register-email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={32}
                required
              />
              <div className="mt-2 space-y-1 text-sm">
                <p className="font-medium text-gray-700">
                  Password requirements:
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 mr-2 rounded-full ${
                      passwordValidation.length ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={
                      passwordValidation.length
                        ? "text-teal-700"
                        : "text-gray-500"
                    }
                  >
                    Between 8 and 32 characters
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 mr-2 rounded-full ${
                      passwordValidation.hasUppercase
                        ? "bg-teal-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={
                      passwordValidation.hasUppercase
                        ? "text-teal-700"
                        : "text-gray-500"
                    }
                  >
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 mr-2 rounded-full ${
                      passwordValidation.hasNumber
                        ? "bg-teal-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={
                      passwordValidation.hasNumber
                        ? "text-teal-700"
                        : "text-gray-500"
                    }
                  >
                    At least one number
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-confirm-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={toggleView}
            className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
          >
            {isLoginView
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
