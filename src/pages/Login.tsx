import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className="flex items-center justify-center px-6 py-9 relative overflow-hidden bg-cream">

      {/* Decorative ink blots */}
      <div className="ink-blot absolute top-8 left-12 opacity-20"></div>
      <div className="ink-blot absolute top-24 right-16 opacity-15"></div>

      <div className="vintage-card w-full max-w-md p-10 rounded-xl shadow-lg paper-texture relative overflow-hidden">
        <h2 className="elegant-heading text-4xl md:text-5xl font-garamond font-medium text-ink-blue mb-6 text-center">
          Login to Your Account
        </h2>
        <div className="ornamental-divider mb-6"></div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-inter text-base text-ink-blue mb-1">
              Email
            </label>
            <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block font-inter text-base text-ink-blue mb-1">
              Password
            </label>
            <Input id="password" type="password" placeholder="Enter your password" className="mt-1" />
          </div>
          <Button type="submit" className="w-full vintage-button text-cream font-inter py-3 rounded-full mt-4">
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-brown">
          Don't have an account?{' '}
          <Link to="/register" className="text-ink-blue hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
