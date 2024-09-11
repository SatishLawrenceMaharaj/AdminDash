// "use client";
// import dynamic from 'next/dynamic';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Use router for navigation
// import { allData } from '../../../public/data';
// import { User } from '../UserDash/User';

// // Dynamic import of react-leaflet with SSR disabled
// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
// const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// // Avoid loading Leaflet during SSR
// const MapModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   // Ensure the component is rendered only on the client side
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleUserClick = (user: User) => {
//     router.push(`/UserDashboard/${user.id}`); // Redirect to user profile page with userId as a URL parameter
//   };

//   if (!isOpen || !isClient) return null;

//   // Configure the default marker icon only on the client side
//   const L = require('leaflet');
//   delete L.Icon.Default.prototype._getIconUrl;

//   const DefaultIcon = L.icon({
//     iconUrl: '/marker-icon.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//     shadowAnchor: [12, 41],
//   });

//   L.Marker.prototype.options.icon = DefaultIcon;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop with blur effect */}
//       <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-800 backdrop-blur-sm z-40"></div>

//       {/* Modal content */}
//       <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 h-[90vh] z-50">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">User Locations</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 dark:text-gray-300 hover:text-red-500"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//           </button>
//         </div>
//         <div className="h-full w-full">
//           <MapContainer center={[20, 0]} zoom={3} style={{ height: '60%', width: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {allData.map(user => (
//               <Marker key={user.id} position={[user.location.lat, user.location.lng]} eventHandlers={{ click: () => handleUserClick(user) }}>
//                 <Popup>{user.name}</Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapModal;

"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use router for navigation
import { allData } from '../../../public/data';
import { User } from '../UserDash/User';

// Dynamic import of react-leaflet with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MapModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isClient, setIsClient] = useState(false);
  const [L, setLeaflet] = useState<typeof import('leaflet') | null>(null); // Use correct Leaflet type
  const router = useRouter();

  // Ensure the component is rendered only on the client side
  useEffect(() => {
    setIsClient(true);

    // Dynamically import Leaflet on client-side
    const loadLeaflet = async () => {
      const leaflet = await import('leaflet');
      setLeaflet(leaflet);
    };

    loadLeaflet();
  }, []);

  const handleUserClick = (user: User) => {
    router.push(`/UserDashboard/${user.id}`); // Redirect to user profile page with userId as a URL parameter
  };

  if (!isOpen || !isClient || !L) return null;

  // Configure the default marker icon only on the client side
  delete L.Icon.Default.prototype._getIconUrl;

  const DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-800 backdrop-blur-sm z-40"></div>

      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 h-[90vh] z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">User Locations</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="h-full w-full">
          <MapContainer center={[20, 0]} zoom={3} style={{ height: '60%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {allData.map(user => (
              <Marker key={user.id} position={[user.location.lat, user.location.lng]} eventHandlers={{ click: () => handleUserClick(user) }}>
                <Popup>{user.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
