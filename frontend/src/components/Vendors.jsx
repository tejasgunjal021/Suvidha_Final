// // import  { useEffect, useState } from 'react';
// // import VendorCard from './VendorCard';

// // const Vendors = () => {
// //   const [vendors, setVendors] = useState([]);

// //   useEffect(() => {
// //     // Fetch the vendor data from the backend (example API endpoint)
// //     fetch('/api/vendors')
// //       .then((response) => response.json())
// //       .then((data) => setVendors(data))
// //       .catch((error) => console.error('Error fetching vendor data:', error));
// //   }, []);

// //   return (
// //     <section className="py-12 bg-gray-100">
// //       <div className="container mx-auto">
// //         <h2 className="text-3xl font-bold text-center">How We Can Help?</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
// //           {vendors.map((vendor) => (
// //             <VendorCard
// //               key={vendor.id}
// //               name={vendor.name}
// //               address={vendor.address}
// //               image={vendor.image}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Vendors;











// import VendorCard from './VendorCard';

// const Vendors = () => {
//   // Hardcoded vendor data
//   const vendors = [
//     {
//       id: 1,
//       name: "Vendor Example 1",
//       address: "123 Colaba Causeway, Mumbai, Maharashtra 400005 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 2,
//       name: "Vendor Example 2",
//       address: "456 Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 3,
//       name: "Vendor Example 3",
//       address: "789 Lamington Road, Grant Road, Mumbai, Maharashtra 400007 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 4,
//       name: "Vendor Example 4",
//       address: "101 Hill Road, Bandra West, Mumbai, Maharashtra 400050 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 1,
//       name: "Vendor Example 1",
//       address: "123 Colaba Causeway, Mumbai, Maharashtra 400005 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 2,
//       name: "Vendor Example 2",
//       address: "456 Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 3,
//       name: "Vendor Example 3",
//       address: "789 Lamington Road, Grant Road, Mumbai, Maharashtra 400007 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     {
//       id: 4,
//       name: "Vendor Example 4",
//       address: "101 Hill Road, Bandra West, Mumbai, Maharashtra 400050 India",
//       image: "https://via.placeholder.com/300x200"
//     },
//     // Add more vendor data as needed
//   ];

//   return (
//     <section className="py-12 bg-gray-100">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center">How We Can Help?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
//           {vendors.map((vendor) => (
//             <VendorCard
//               key={vendor.id}
//               name={vendor.name}
//               address={vendor.address}
//               image={vendor.image}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Vendors;



const Vendors = () => {
  return (
    <div>Vendors</div>
  )
}

export default Vendors
