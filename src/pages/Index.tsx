
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 px-6 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">CH</span>
            </div>
            <span className="font-bold text-lg">ClubHive</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>Log in</Button>
                <Button onClick={() => navigate('/register')}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 flex-1 flex items-center">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-primary">ClubHive</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Your central hub for managing and participating in club activities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button size="lg" onClick={() => navigate('/register')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-accent/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Club Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Club Membership</h3>
              <p className="text-muted-foreground">Join clubs, manage memberships, and connect with other members.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Event Management</h3>
              <p className="text-muted-foreground">Create, discover, and participate in club events and activities.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Achievement Tracking</h3>
              <p className="text-muted-foreground">Track club achievements, leaderboards, and personal awards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join ClubHive today and transform the way you manage club activities
          </p>
          {user ? (
            <Button size="lg" variant="secondary" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          ) : (
            <Button size="lg" variant="secondary" onClick={() => navigate('/register')}>
              Create Account
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2025 ClubHive Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
