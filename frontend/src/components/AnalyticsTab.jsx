// /* eslint-disable react/no-unknown-property */

import OrderOverview from "./analytics/OrderOverview"


// const AnalyticsTab = () => {
 

 

//   return (
//     <div className="flex  justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)] relative overflow-hidden">
//       <div className="absolute inset-0  opacity-30" />
//       <div className="relative z-10 text-center text-white">
       
//           <h1 className="text-4xl text-yellow-400 font-bold animate-bounce mt-20">Coming Soon!</h1>
        
//       </div>
//       <style jsx>{`
//         .loader {
//           border: 8px solid rgba(255, 255, 255, 0.3);
//           border-top: 8px solid rgba(255, 255, 255, 1);
//           border-radius: 50%;
//           width: 60px;
//           height: 60px;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes fadeIn {
//           0% {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes bounce {
//           0%, 20%, 50%, 80%, 100% {
//             transform: translateY(0);
//           }
//           40% {
//             transform: translateY(-10px);
//           }
//           60% {
//             transform: translateY(-5px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AnalyticsTab;



const AnalyticsTab = () => {
  return (
    <div><OrderOverview /></div>
  )
}

export default AnalyticsTab
