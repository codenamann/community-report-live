import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';

const AuthorityLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate real auth
    navigate('/authority/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold">Authority Login</h1>
            <p className="text-sm text-muted-foreground">Manage and assign city complaints.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="text-xs text-muted-foreground">
            Citizen? <Link to="/citizen/login" className="underline">Citizen Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorityLogin;
