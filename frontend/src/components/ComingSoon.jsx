/* eslint-disable react/no-unknown-property */
import  { useEffect, useState } from 'react';

const ComingSoon = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
      <div className="relative z-10 text-center text-white">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader mb-4"></div>
            <h1 className="text-4xl font-bold animate-bounce">Loading...</h1>
          </div>
        ) : (
          <h1 className="text-4xl font-bold">Coming Soon!</h1>
        )}
      </div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid rgba(255, 255, 255, 1);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
