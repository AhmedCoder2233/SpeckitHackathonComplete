// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import LoginForm from '../components/Auth/LoginForm';
import { LoginData } from '../types/user';
import { authService } from '../services/authService';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleLogin = async (data: LoginData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔐 Attempting login with:', data);
      const response = await authService.login(data);
      console.log('✅ Login successful:', response);
      history.push('/');
      window.location.reload();
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Login" description="Login to your account">
      <div style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'radial-gradient(ellipse at top, #1a0000 0%, #000000 50%, #0a0000 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(185, 28, 28, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'pulse 5s ease-in-out infinite'
        }}></div>

        <div style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '50px 40px',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(220, 38, 38, 0.3), 0 0 1px rgba(220, 38, 38, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          position: 'relative',
          zIndex: 1
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

          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #dc2626 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            textShadow: '0 0 30px rgba(220, 38, 38, 0.5)'
          }}>
            Welcome Back! 👋
          </h1>
          
          <p style={{
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '15px',
            fontWeight: '400',
            letterSpacing: '0.3px'
          }}>
            Sign in to continue your journey
          </p>
          
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />

          <div style={{
            marginTop: '32px',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '400'
          }}>
            Don't have an account?{' '}
            <a 
              href="/signup" 
              style={{ 
                color: '#dc2626', 
                fontWeight: '700',
                textDecoration: 'none',
                position: 'relative',
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
              Sign Up Now →
            </a>
          </div>

          {/* Decorative Corner Elements */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(220, 38, 38, 0.3)',
            borderRight: '2px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '0 12px 0 0'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(220, 38, 38, 0.3)',
            borderLeft: '2px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '0 0 0 12px'
          }}></div>
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
}