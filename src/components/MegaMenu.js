// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const dummyMenus = [
//   {
//     label: "Domestic Holidays",
//     key: "domestic",
//     items: [
//       { id: 1, name: "Goa" },
//       { id: 2, name: "Kashmir" },
//       { id: 3, name: "Rajasthan" },
//       { id: 4, name: "Kerala" },
//       { id: 5, name: "Andaman" },
//     ],
//   },
//   {
//     label: "International Holidays",
//     key: "international",
//     items: [
//       { id: 1, name: "Dubai" },
//       { id: 2, name: "Thailand" },
//       { id: 3, name: "Singapore" },
//       { id: 4, name: "Maldives" },
//       { id: 5, name: "Bali" },
//     ],
//   },
//   {
//     label: "Activity",
//     key: "activity",
//     items: [
//       { id: 1, name: "Cruise" },
//       { id: 2, name: "Boat Tour" },
//       { id: 3, name: "Food Tour" },
//       { id: 4, name: "Seaplane" },
//       { id: 5, name: "Distillery Tour" },
//     ],
//   },
//   {
//     label: "Visa Query",
//     key: "visa",
//     items: [
//       { id: 1, name: "USA" },
//       { id: 2, name: "UK" },
//       { id: 3, name: "Canada" },
//       { id: 4, name: "Australia" },
//       { id: 5, name: "Schengen" },
//     ],
//   },
// ];

// const MegaMenu = () => {
//   const [openMenu, setOpenMenu] = useState(null);
//   const router = useRouter();

//   const handleMenuEnter = (key) => setOpenMenu(key);
//   const handleMenuLeave = () => setOpenMenu(null);

//   const handleItemClick = (menuKey, item) => {
//     let path = "/" + menuKey + "/" + item.id;
//     router.push(path);
//     setOpenMenu(null);
//   };

//   return (
//     <div className="flex space-x-8 relative bg-[#0a223a] py-2 px-6 rounded-lg shadow-lg">
//       {dummyMenus.map((menu) => (
//         <div
//           key={menu.key}
//           className="relative"
//           onMouseEnter={() => handleMenuEnter(menu.key)}
//           onMouseLeave={handleMenuLeave}
//         >
//           <button
//             className="text-white font-semibold px-3 py-2 rounded hover:bg-[#1a3350] transition-colors"
//             style={{ minWidth: 120 }}
//           >
//             {menu.label}
//           </button>
//           {openMenu === menu.key && (
//             <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl z-50 p-4 grid grid-cols-1 gap-2 animate-fade-in">
//               {menu.items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="cursor-pointer px-3 py-2 rounded hover:bg-[#e6f0fa] text-[#0a223a] font-medium"
//                   onClick={() => handleItemClick(menu.key, item)}
//                 >
//                   {item.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MegaMenu;
