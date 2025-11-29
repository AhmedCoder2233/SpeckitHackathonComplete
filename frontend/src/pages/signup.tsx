// frontend/src/pages/signup.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import SignupForm from '../components/Auth/SignupForm';
import { authService } from '../services/authService';
import { SignupData } from '../types/user';

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signup(data);
      history.push('/');
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signup.');
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Sign Up"
      description="Sign up for an account to personalize your Docusaurus experience."
    >
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'radial-gradient(ellipse at bottom, #1a0000 0%, #000000 50%, #0a0000 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'pulse 5s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(185, 28, 28, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 6s ease-in-out infinite'
        }}></div>

        <div style={{
          maxWidth: '520px',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Icon Circle */}
          <div style={{
            width: '90px',
            height: '90px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '42px',
            boxShadow: '0 15px 40px rgba(220, 38, 38, 0.4), 0 0 60px rgba(220, 38, 38, 0.2)',
            border: '3px solid rgba(220, 38, 38, 0.3)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-4px',
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.4), transparent)',
              borderRadius: '50%',
              filter: 'blur(10px)',
              zIndex: -1
            }}></div>
            🤖
          </div>

          {/* Main Card */}
          <div style={{
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '50px 40px',
            borderRadius: '24px',
            boxShadow: '0 25px 80px rgba(220, 38, 38, 0.3), 0 0 1px rgba(220, 38, 38, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            position: 'relative'
          }}>
            {/* Glow Effect */}
            <div style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.1), rgba(127, 29, 29, 0.2))',
              borderRadius: '24px',
              zIndex: -1,
              filter: 'blur(8px)',
              opacity: 0.6
            }}></div>

            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '36px'
            }}>
              <h1 style={{
                fontSize: '36px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
                letterSpacing: '-0.5px',
                textShadow: '0 0 30px rgba(220, 38, 38, 0.5)'
              }}>
                Join Us Today! 🚀
              </h1>
              <p style={{
                fontSize: '15px',
                color: '#9ca3af',
                margin: 0,
                fontWeight: '400',
                letterSpacing: '0.3px'
              }}>
                Create your account and start your journey
              </p>
            </div>

            {/* Form */}
            <SignupForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              error={error} 
            />

            {/* Decorative Corner Elements */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              borderTop: '2px solid rgba(220, 38, 38, 0.3)',
              borderLeft: '2px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '12px 0 0 0'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '40px',
              height: '40px',
              borderBottom: '2px solid rgba(220, 38, 38, 0.3)',
              borderRight: '2px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '0 0 12px 0'
            }}></div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: '32px'
          }}>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              Already have an account?{' '}
              <a 
                href="/login"
                style={{
                  color: '#dc2626',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.textShadow = '0 0 20px rgba(220, 38, 38, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#dc2626';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                Sign In Now
              </a>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.5;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default SignupPage;