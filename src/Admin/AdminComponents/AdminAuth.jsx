import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Assuming this path is correct
import './AdminAuth.css'; // Import the new CSS file

// Simple Lock Icon component (optional, if you want to keep icons)
const LockClosedIcon = (props) => (
  <svg
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
      clipRule="evenodd"
    />
  </svg>
);

// Simple Email Icon component (optional)
const EnvelopeIcon = (props) => (
  <svg
    className="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm12 2L10 9 5 6h10z" />
    <path d="M3 13.075V6.925l6.418 3.851a.75.75 0 00.916-.001L17 6.925v6.15L3 13.075z" />
  </svg>
);

export default function AdminAuth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Attempting login with:', { email, password });

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      console.log('Login response:', { data, error: authError });

      if (authError) {
        throw new Error(
          authError.message || 'Login failed. Please check your credentials.'
        );
      }

      if (!data?.user || !data?.session) {
        throw new Error(
          'Authentication successful, but no user or session data was returned.'
        );
      }

      console.log('Login successful, user:', data.user);
      onLogin(data.session); // Pass session to parent
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unknown error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container bg-gray-900">
      <div className="login-card">
        <div className="login-header">
          {/* You can add a logo image here if you like */}
          {/* <img src="/path-to-your-logo.png" alt="Logo" className="logo-image" /> */}
          <h2>Admin Portal</h2>
          <p>Securely access your image gallery dashboard.</p>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <strong>Login Error:</strong> {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin} noValidate>
          <div className="input-field-group">
            <label htmlFor="email" className="sr-only">
              {' '}
              {/* sr-only class for screen readers only */}
              Email address
            </label>
            <div className="input-wrapper">
              {' '}
              {/* Wrapper for input and potential icon */}
              <EnvelopeIcon aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="input-field-group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="input-wrapper">
              <LockClosedIcon aria-hidden="true" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Optional: Remember me & Forgot Password */}
          {/*
          <div className="form-options">
            <div className="remember-me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="forgot-password-link">Forgot your password?</a>
          </div>
          */}

          {/*  bg-gray-300 */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <svg
                  className="spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Optional: Footer links */}
        {/*
        <div className="login-footer">
          <p>Not a member? <a href="#" className="create-account-link">Create an account</a></p>
        </div>
        */}
      </div>
    </div>
  );
}
