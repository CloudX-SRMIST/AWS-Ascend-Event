'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, AlertCircle } from 'lucide-react';
import certificateData from '@/lib/certificate-data.json';

type CertificateMap = {
  [key: string]: string;
};

export default function CertificatesPage() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCertificate = () => {
    setError(null);
    setIsLoading(true);

    const trimmedRegNo = registrationNumber.trim().toUpperCase();

    if (!trimmedRegNo) {
      setError('Please enter your registration number.');
      setIsLoading(false);
      return;
    }

    const links: CertificateMap = certificateData;
    const certificateUrl = links[trimmedRegNo];

    if (certificateUrl) {
      window.open(certificateUrl, '_blank', 'noopener,noreferrer');
    } else {
      setError('Certificate not found. Please double-check your registration number.');
    }
    
    setIsLoading(false);
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGetCertificate();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-slide-up-fade">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary">Download Your Certificate</CardTitle>
          <CardDescription className="text-center pt-2">
            Enter the registration number you used during the event to get your certificate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Enter your registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="text-center tracking-wider"
                  autoFocus
                />
            </div>
            
            {error && (
              <div className="flex items-center gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button onClick={handleGetCertificate} disabled={isLoading} className="w-full">
              {isLoading ? 'Searching...' : <><Download className="mr-2 h-4 w-4" /> Get Certificate</>}
            </Button>

            <p className="text-xs text-muted-foreground text-center pt-2">
                If you can't find your certificate, it might be because you didn't attend the event. If you believe this is an error, please contact us with proof of attendance and we'll look into it.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
