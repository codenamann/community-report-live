import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';

const CitizenLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = phone entry, 2 = otp entry
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: call backend → /auth/citizen/send-otp { phone }
      console.log("Sending OTP to", phone);
      setStep(2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: call backend → /auth/citizen/verify-otp { phone, otp }
      console.log("Verifying OTP for", phone, "with", otp);

      // If success → get JWT → save in localStorage
      localStorage.setItem("token", "dummy-jwt-token");

      navigate('/citizen/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-xl font-bold">Citizen Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your phone number and OTP to continue.
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send OTP</Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Verify OTP</Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Change Phone
              </Button>
            </form>
          )}

          <div className="text-xs text-muted-foreground">
            Admin?{" "}
            <Link to="/authority/login" className="underline">
              Authority Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenLogin;
