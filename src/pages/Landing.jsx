import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="bg-[#f5efe6]">
    <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <Badge className="mb-4" variant="secondary">Jan-Samadhan</Badge>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">Report. Track. Resolve. Together.</h1>
        <p className="text-muted-foreground text-base md:text-lg mb-6">A transparent, citizen-first platform to report civic issues and watch them get resolved on a live city map.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/citizen/login"><Button size="lg">Citizen Login</Button></Link>
          <Link to="/authority/login"><Button size="lg" variant="outline">Authority Login</Button></Link>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="aspect-[4/3] rounded-xl border bg-card flex items-center justify-center">
            <MapPin className="h-10 w-10 text-primary" />
            {/* Replace with India map outline illustration/SVG later */}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="bg-background">
    <div className="container mx-auto px-4 py-14 grid md:grid-cols-3 gap-4">
      {[{
        title: 'Report Issue',
        desc: 'Upload photos, pick location on map, submit with a tap.'
      },{
        title: 'Track Progress',
        desc: 'See real-time pins: Red, Yellow, Green across your city.'
      },{
        title: 'Verified Closure',
        desc: 'Issue closes only after your OTP verification.'
      }].map((item) => (
        <Card key={item.title} className="civic-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

const CTA = () => (
  <section className="bg-[#f5efe6]">
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold">Ready to make your city better?</h3>
        <p className="text-sm text-muted-foreground">Join Jan-Samadhan and start reporting issues today.</p>
      </div>
      <div className="flex gap-3">
        <Link to="/citizen/login"><Button>Get Started <ArrowRight className="h-4 w-4 ml-2" /></Button></Link>
        <Link to="/home"><Button variant="outline">Explore Demo</Button></Link>
      </div>
    </div>
  </section>
);

const Landing = () => (
  <main className="min-h-screen">
    <Hero />
    <HowItWorks />
    <CTA />
  </main>
);

export default Landing;
