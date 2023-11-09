'use client';

import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Toast({ alert }: { alert: string | null }) {
  useEffect(() => {
    if (alert) {
      toast.success(alert);
    }
  }, []);
  return (
    <div>
      <Toaster />
    </div>
  );
}
