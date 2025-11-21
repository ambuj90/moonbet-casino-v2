import { useState } from 'react';
import axios from 'axios';

const AuthTest = () => {
  const [email, setEmail] = useState('sharmaashtavinayak555@gmail.com');
  const [password, setPassword] = useState('Password@1234');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await axios.post('/auth-service/api/auth/login', {
        email,
        password
      });

      console.log('✅ Login Response:', result.data);
      setResponse(result.data);
    } catch (err) {
      // Extract detailed error information
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Login failed';
      
      const errorDetails = {
        status: err.response?.status,
        message: errorMsg,
        data: err.response?.data
      };
      
      setError(JSON.stringify(errorDetails, null, 2));
      console.error('❌ Login Error:', err);
      console.error('❌ Error Response:', err.response?.data);
      console.error('❌ Error Status:', err.response?.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Authentication Test
          </h1>
          <p className="text-purple-300 text-sm sm:text-base">
            Testing /auth-service/api/auth/login
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-purple-300 focus:outline-none focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-purple-300 focus:outline-none focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white 
                       font-semibold rounded-lg transition-all duration-300 
                       hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Test Login'
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <strong className="font-bold block mb-1">Login Failed</strong>
                <pre className="text-sm bg-slate-900/50 p-3 rounded mt-2 overflow-auto max-h-64">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Success Response */}
        {response && (
          <div className="space-y-4">
            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500 text-green-200 px-6 py-4 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="font-bold block mb-1">{response.message}</strong>
                  <span className="text-sm">Authentication successful!</span>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                User Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-purple-300 text-sm">User ID</span>
                  <span className="text-white font-mono text-sm">{response.user.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-purple-300 text-sm">Username</span>
                  <span className="text-white font-medium">{response.user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-purple-300 text-sm">Email</span>
                  <span className="text-white font-medium">{response.user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-purple-300 text-sm">Display Name</span>
                  <span className="text-white font-medium">{response.user.displayName}</span>
                </div>
              </div>
            </div>

            {/* Token Card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
                Access Token
              </h2>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                <code className="text-purple-200 text-xs break-all font-mono">
                  {response.token}
                </code>
              </div>
              <p className="text-purple-300 text-xs mt-2">
                Token is valid and can be used for authenticated requests
              </p>
            </div>

            {/* Raw Response */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-white font-semibold text-lg mb-4">Raw Response</h2>
              <pre className="bg-slate-900/50 rounded-lg p-4 text-purple-200 text-xs overflow-auto max-h-64 border border-purple-500/20">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTest;

