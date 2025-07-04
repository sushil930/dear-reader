import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        name: fullName, // Send fullName as 'name'
        email,
        password,
      });
      navigate('/login'); // Redirect to login page on successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <section className="h-auto flex items-center justify-center px-6 py-8 relative overflow-hidden bg-cream" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>

      {/* Enhanced decorative elements */}
      <div className="ink-blot absolute top-12 left-16 opacity-25 w-4 h-4"></div>
      <div className="ink-blot absolute top-32 right-20 opacity-20 w-3 h-3"></div>
      <div className="ink-blot absolute bottom-24 left-24 opacity-15 w-5 h-5"></div>
      
      {/* Vintage corner flourishes */}
      <div className="absolute top-8 left-8 w-16 h-16 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10,10 Q50,30 90,10 Q70,50 90,90 Q50,70 10,90 Q30,50 10,10 Z" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-16 h-16 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10,10 Q50,30 90,10 Q70,50 90,90 Q50,70 10,90 Q30,50 10,10 Z" 
                fill="none" stroke="#8B7355" strokeWidth="2"/>
        </svg>
      </div>

      <div className="vintage-card w-full max-w-lg p-8 rounded-2xl shadow-2xl paper-texture relative overflow-hidden border-2 border-muted-brown/20">
        
        {/* Decorative header ornament */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-6 opacity-20">
          <svg viewBox="0 0 120 30" className="w-full h-full">
            <path d="M10,15 Q30,5 60,15 Q90,25 110,15" 
                  fill="none" stroke="#8B7355" strokeWidth="1.5"/>
            <circle cx="60" cy="15" r="3" fill="#8B7355"/>
            <circle cx="35" cy="12" r="1.5" fill="#8B7355"/>
            <circle cx="85" cy="18" r="1.5" fill="#8B7355"/>
          </svg>
        </div>

        <div className="mt-6">
          <h2 className="elegant-heading text-4xl md:text-5xl font-garamond font-medium text-ink-blue mb-6 text-center relative">
            Create Your Journal
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-muted-brown/40 to-transparent"></div>
          </h2>
          
          <p className="text-center text-lg font-garamond italic text-muted-brown mb-6 leading-relaxed">
            "Every journey begins with a single word"
          </p>
          
          <div className="ornamental-divider mb-6"></div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="fullName" className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
                Full Name
              </label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="Enter your full name" 
                className="mt-1 h-12 bg-cream/50 border-2 border-muted-brown/30 rounded-xl font-garamond text-base placeholder:text-muted-brown/60 focus:border-ink-blue focus:ring-ink-blue/20 transition-all duration-300" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="mt-1 h-12 bg-cream/50 border-2 border-muted-brown/30 rounded-xl font-garamond text-base placeholder:text-muted-brown/60 focus:border-ink-blue focus:ring-ink-blue/20 transition-all duration-300" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                className="mt-1 h-12 bg-cream/50 border-2 border-muted-brown/30 rounded-xl font-garamond text-base placeholder:text-muted-brown/60 focus:border-ink-blue focus:ring-ink-blue/20 transition-all duration-300" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block font-garamond text-lg text-ink-blue mb-2 font-medium">
                Confirm Password
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                className="mt-1 h-12 bg-cream/50 border-2 border-muted-brown/30 rounded-xl font-garamond text-base placeholder:text-muted-brown/60 focus:border-ink-blue focus:ring-ink-blue/20 transition-all duration-300" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <Button 
              type="submit" 
              className="w-full vintage-button text-cream font-garamond text-lg py-4 rounded-full mt-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Start My Journey</span>
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-base text-muted-brown font-garamond">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-ink-blue hover:text-forest-green font-medium underline decoration-wavy decoration-muted-brown/40 underline-offset-4 transition-all duration-300 hover:decoration-forest-green/60"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative footer ornament */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 opacity-15">
          <svg viewBox="0 0 80 20" className="w-full h-full">
            <path d="M5,10 Q20,5 40,10 Q60,15 75,10" 
                  fill="none" stroke="#8B7355" strokeWidth="1"/>
            <circle cx="40" cy="10" r="2" fill="#8B7355"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
