import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginProps {
  theme: 'light' | 'dark';
  onLogin: (email: string, pin: string) => void;
}

export function Login({ theme, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [pinFocused, setPinFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && pin.length === 6) {
      onLogin(email, pin);
    }
  };

  const isValidForm = email.trim() !== '' && pin.length === 6;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #0B0F0E 0%, #121212 100%)'
          : 'linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)',
      }}
    >
      {/* Background Glow Effects */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          opacity: theme === 'dark' ? 0.3 : 0.15,
        }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 182, 134, 0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 182, 134, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Glass Card */}
      <div
        className="relative w-full max-w-md"
        style={{
          animation: 'fadeIn 0.6s ease-out',
        }}
      >
        <div
          className="rounded-3xl p-8 sm:p-10 relative"
          style={{
            background: theme === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(30px)',
            border: theme === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: theme === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Logo & Branding */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #00B686 0%, #00D69E 100%)',
                boxShadow: '0 8px 24px rgba(0, 182, 134, 0.3)',
              }}
            >
              <span className="text-2xl text-white">DHi</span>
            </div>
            <h1
              className={`text-3xl mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              Welcome to DHi Dashboard
            </h1>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Enter your secure PIN to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300"
                style={{
                  color: emailFocused
                    ? '#00B686'
                    : theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                }}
              >
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="Email or Student ID"
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm transition-all duration-300 focus:outline-none ${
                  theme === 'dark'
                    ? 'text-white placeholder-gray-500'
                    : 'text-gray-900 placeholder-gray-400'
                }`}
                style={{
                  background: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.03)',
                  border: emailFocused
                    ? '2px solid #00B686'
                    : theme === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.12)'
                    : '2px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: emailFocused
                    ? '0 0 0 4px rgba(0, 182, 134, 0.1)'
                    : 'none',
                }}
              />
            </div>

            {/* PIN Input */}
            <div className="relative">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300"
                style={{
                  color: pinFocused
                    ? '#00B686'
                    : theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                }}
              >
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setPin(value);
                  }
                }}
                onFocus={() => setPinFocused(true)}
                onBlur={() => setPinFocused(false)}
                placeholder="6-digit PIN"
                maxLength={6}
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm transition-all duration-300 focus:outline-none ${
                  theme === 'dark'
                    ? 'text-white placeholder-gray-500'
                    : 'text-gray-900 placeholder-gray-400'
                }`}
                style={{
                  background: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.03)',
                  border: pinFocused
                    ? '2px solid #00B686'
                    : theme === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.12)'
                    : '2px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: pinFocused
                    ? '0 0 0 4px rgba(0, 182, 134, 0.1)'
                    : 'none',
                  letterSpacing: pin.length > 0 ? '0.3em' : 'normal',
                }}
              />
              {pin.length > 0 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span
                    className="text-xs"
                    style={{
                      color: pin.length === 6 ? '#00B686' : theme === 'dark' ? '#6B7280' : '#9CA3AF',
                    }}
                  >
                    {pin.length}/6
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValidForm}
              className="w-full py-4 rounded-xl text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
              style={{
                background: isValidForm
                  ? 'linear-gradient(135deg, #00B686 0%, #00D69E 100%)'
                  : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                boxShadow: isValidForm
                  ? '0 8px 24px rgba(0, 182, 134, 0.3)'
                  : 'none',
                cursor: isValidForm ? 'pointer' : 'not-allowed',
                opacity: isValidForm ? 1 : 0.5,
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                if (isValidForm) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 182, 134, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isValidForm
                  ? '0 8px 24px rgba(0, 182, 134, 0.3)'
                  : 'none';
              }}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Secondary Links */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              type="button"
              className={`text-xs transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Forgot PIN?
            </button>
            <span
              className={theme === 'dark' ? 'text-gray-700' : 'text-gray-300'}
            >
              •
            </span>
            <button
              type="button"
              className={`text-xs transition-all duration-300 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-6 left-0 right-0 text-center"
        style={{
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
          fontSize: '11px',
          letterSpacing: '0.05em',
        }}
      >
        Powered by DHi AI System
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
