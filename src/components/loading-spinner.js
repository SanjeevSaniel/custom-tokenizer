'use client';

export function LoadingSpinner({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full animate-spin`}>
          <div className='absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full'></div>
        </div>

        {/* Inner ring */}
        <div
          className={`absolute inset-2 border-2 border-purple-200 rounded-full animate-spin animate-reverse`}>
          <div className='absolute inset-0 border-2 border-transparent border-t-purple-600 rounded-full'></div>
        </div>

        {/* Center dot */}
        <div className='absolute inset-1/2 w-1 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse'></div>
      </div>
    </div>
  );
}
