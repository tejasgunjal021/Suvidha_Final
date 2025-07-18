const LoadingSpinner = () => {
return (
  <div className="flex items-center justify-center h-screen">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-t-4 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{
        borderColor: 'rgba(128,0,128,0.8)',  // Purple color
        borderTopColor: 'rgba(75,0,130,0.8)', // Indigo for top
        boxShadow: '0 0 15px rgba(75,0,130,0.5)',
      }}></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-4 border-r-transparent border-b-transparent border-l-transparent opacity-30" style={{
        borderColor: 'rgba(128,0,128,0.5)', // Lower opacity for the background
        borderTopColor: 'rgba(75,0,130,0.5)',
        transform: 'scale(0.9)',
      }}></div>
    </div>
  </div>
);
};

export default LoadingSpinner;
