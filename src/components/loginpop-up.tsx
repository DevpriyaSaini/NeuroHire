"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner';
import axios from 'axios';

export interface AuthData {
  username?: string;
  email: string;
  password: string;
}

function AuthDialog() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthData>({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (isLogin) {
      // Handle sign in
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        toast.success('Logged in successfully');
        router.refresh();
      }
    } else {
      // Handle sign up
      try {
        const response = await axios.post('/api/signup', formData);
        
        if (response.status === 200 || response.status === 201) {
          toast.success('Account created successfully! Please sign in.');
          setIsLogin(true);
          // Clear form
          setFormData({
            username: '',
            email: '',
            password: ''
          });
        } else {
          toast.error('Registration failed');
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'Registration failed');
        } else {
          toast.error('An error occurred during registration');
        }
      }
    }
    setIsLoading(false);
  };

  return (
    
      <div className='z-50'>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Sign In' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {isLogin ? 'Enter your credentials to access your account.' : 'Fill in your details to create a new account.'}
          </DialogDescription>
        </DialogHeader>
    
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {!isLogin && (
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            
            <button 
              type="button"
              className="text-sm text-muted-foreground hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 
                "Don't have an account? Sign Up" : 
                "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
      </div>
   
  );
}

export default AuthDialog;