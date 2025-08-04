// src/pages/NotFoundPage.jsx
import React from 'react';

export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-900">
        <h1 className="text-5xl md:text-5xl font-semibold text-gray-100">404</h1>
        <h1 className="text-2xl md:text-3xl font-semibold mt-6 text-white">Page Not Found</h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-500">The page you are looking for does not exist.</p>
      </div>
    );
  }