'use client';

import React from 'react';
import Layout from '@/components/Layout';
import UploadForm from '@/components/UploadForm';

export default function Upload() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Music</h1>
        
        <p className="mb-8 text-foreground/70">
          Share your music with other users. Your uploads are anonymous and will be available in the library for everyone to enjoy.
        </p>
        
        <UploadForm />
      </div>
    </Layout>
  );
} 