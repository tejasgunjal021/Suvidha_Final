

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      {/* Spinner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="loader"></div>
        <div className="loader-text mt-4">Suvidha</div>
      </div>

      {/* Spinner Styling */}
      <style>{`
        .loader {
          width: 100px; /* Increase size of the spinner */
          aspect-ratio: 1;
          display: grid;
        }
        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1/1;
          --c: no-repeat radial-gradient(farthest-side, #9333ea 92%, #0000); /* Purple tone */
          background: 
            var(--c) 50%  0, 
            var(--c) 50%  100%, 
            var(--c) 100% 50%, 
            var(--c) 0    50%;
          background-size: 24px 24px;
          animation: l12 1.5s infinite;
        }
        .loader::before {
          margin: 8px;
          filter: hue-rotate(270deg); /* Adjusting color to match indigo/purple */
          background-size: 16px 16px;
          animation-timing-function: linear;
        }

        /* Text below spinner */
        .loader-text {
          font-size: 1.25rem;
          font-weight: bold;
          color: #9333ea; /* Text color matches purple theme */
          text-align: center;
        }

        @keyframes l12 {
          100% {
            transform: rotate(0.5turn);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
