// import { useEffect, useState } from "react";
// import unseen from "../../../assets/images/adminImages/unseen.png";
// import Modal from "react-modal";
// import axios from "../../../api/axios.jsx";
//
// export const OrderProcessing = () => {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//
//   const openModal = () => {
//     setModalIsOpen(true);
//   };
//
//   const closeModal = () => {
//     setModalIsOpen(false);
//   };
//
//   return (
//     <div className="flex flex-col items-stretch max-md:max-w-full mt-20 ml-60">
//       <span className="items-center flex gap-2 ml-8 mt-7 self-start max-md:ml-2.5">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf4be3deae8d0d24f2a0336bc8a7a937de5df9ac4ac1e615aaa9d766e8d85e23?"
//           className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto"
//         />
//         <div className="text-zinc-900 text-2xl font-bold leading-8 self-stretch grow whitespace-nowrap">
//           All Uploaded Books
//         </div>
//       </span>
//       <div className="shadow-lg bg-white flex w-[755px] max-w-full flex-col ml-8 mt-8 pl-5 pr-20 pt-4 pb-7 self-start items-start max-md:pr-5">
//         <div className="w-[609px] max-w-full">
//           <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//             <div className="flex flex-col items-stretch w-[21%] max-md:w-full max-md:ml-0">
//               <img
//                 loading="lazy"
//                 srcSet={unseen}
//                 className="aspect-[0.78] object-contain object-center w-[129px] overflow-hidden shrink-0 max-w-full grow max-md:mt-2"
//               />
//             </div>
//             <div className="flex flex-col items-stretch w-[79%] ml-5 max-md:w-full max-md:ml-0">
//               <span className="flex grow flex-col max-md:max-w-full max-md:mt-2">
//                 <div className="self-stretch text-slate-900 text-base font-semibold leading-6 max-md:max-w-full">
//                   The BOOK of UNSEEN WORLD
//                 </div>
//                 <div className="self-stretch text-slate-600 text-sm leading-5 mt-1 max-md:max-w-full">
//                   by Jamilla Francis
//                 </div>
//                 <div className="text-slate-600 text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
//                   Lorem ipsum dolor sit amet consectetur. A ornare sem
//                   consectetur tristique ultrices nulla arcu at. Rhoncus ultrices
//                   fames dui donec sed mattis. In pulvinar elementum aliquam
//                   netus. Pellentesque magna at purus integer tempus.
//                 </div>
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d1ea423584557a106b458a9be2a68237f790d77d38a36a41a213fff22a2c672?"
//                   className="aspect-[6.78] object-contain object-center w-[122px] overflow-hidden max-w-full mt-3.5 self-start"
//                 />
//               </span>
//             </div>
//           </div>
//         </div>
//         <span className="items-stretch flex gap-2 mt-3 ml-[10rem] max-md:max-w-full max-md:flex-wrap">
//           <div className="text-black text-sm leading-5 grow whitespace-nowrap">
//             Sandra Bloyd
//           </div>
//           <div className="text-black text-sm leading-5">N5000</div>
//           <div className="text-black text-sm leading-5">
//             SandraBloys@gamial.com
//           </div>
//           <div className="text-black text-sm leading-5 grow whitespace-nowrap">
//             21st November,2023
//           </div>
//         </span>
//         <div className="self-center flex items-stretch gap-4 ml-5">
//           <span
//             className="transition hover:bg-red-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border bg-red-500 mt-4 px-10 py-4 rounded-md border-solid border-red-600 self-start max-md:px-5"
//             onClick={openModal}
//           >
//             Delete Book
//           </span>
//           <Modal
//             isOpen={modalIsOpen}
//             ariaHideApp={false}
//             className="absolute w-[30%] bg-transparent border-none top-[20%] left-[35%] justify-center items-center"
//             onRequestClose={closeModal}
//           >
//             <div className="justify-center shadow-lg bg-white flex max-w-[400px] flex-col pt-2 pb-4 rounded-xl items-end">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/81c2f27bcf96cd259caef0bbf69acd93889cc777b3fad5af7839f56613191486?"
//                 className="aspect-square object-contain object-center w-6 overflow-hidden max-w-full mr-6"
//                 onClick={closeModal}
//               />
//               <span className="self-stretch flex w-full flex-col items-stretch mt-5 px-6">
//                 <div className="text-gray-900 text-lg font-medium leading-7 whitespace-nowrap">
//                   Do you want to delete Book?
//                 </div>
//                 <div className="text-gray-500 text-sm leading-5 mt-4">
//                   Are you sure you want to delete this book? This action cannot
//                   be undone.
//                 </div>
//                 <div className="items-stretch flex justify-between gap-3 mt-5">
//                   <span
//                     className="text-slate-700 text-base font-medium leading-6 whitespace-nowrap justify-center items-center border border-[color:var(--Gray-300,#D0D5DD)] shadow-sm bg-white grow px-16 py-2.5 rounded-lg border-solid"
//                     onClick={closeModal}
//                   >
//                     No
//                   </span>
//                   <span className="text-white text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch border shadow-sm bg-red-600 grow px-16 py-2.5 rounded-lg border-solid border-red-600">
//                     Delete
//                   </span>
//                 </div>
//               </span>
//             </div>
//           </Modal>
//
//           <span className="transition hover:bg-green-600 cursor-pointer text-center text-white text-sm font-medium leading-5 uppercase whitespace-nowrap border bg-green-500 mt-4 px-10 py-4 rounded-md border-solid border-green-600 self-start max-md:px-5">
//             Hide Book
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
