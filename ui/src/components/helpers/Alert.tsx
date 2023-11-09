// 'use client';

// import { cloneElement, useState } from 'react';

// export default function Alert({ type, message }) {
//   const [showAlert, setShowAlert] = useState(true);
//   //   const renderAlert = function () {
//   //     return cloneElement(children);
//   //   };
//   return (
//     <div
//       className={`border px-4 py-2 rounded-md flex items-center justify-between flex-row-reverse fixed left-1/2 w-[90vw] top-24 ml-[-45vw] ${
//         type === 'error' && 'text-[#842029] bg-[#f8d7da] border-[#f5c2c7] block'
//       } ${type === 'success' && 'text-[#0f5132] bg-[#d1e7dd] block'} `}>
//       <button
//         className='text-white font-bold text-2xl cursor-pointer transition-colors hover:text-black'
//         onClick={() => setShowAlert(false)}>
//         &times;
//       </button>
//       <p>{message}</p>
//     </div>
//   );
// }
