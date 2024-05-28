// import { DownloadBookModal } from "./DownloadBookModal.jsx";
// import Modal from "react-modal";
// import { useState } from "react";
//
// export const PurchasedBookCard = ({
//   image,
//   author,
//   title,
//   genre,
//   price,
//   description,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//
//   const handleDownloadClick = () => {
//     setIsModalOpen(true);
//   };
//
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//
//   return (
//     <>
//       <div className="self-stretch mt-6 max-md:max-w-full">
//         <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
//           <div className="flex flex-col items-stretch w-1/5 max-md:w-full max-md:ml-0">
//             <img
//               loading="lazy"
//               src={image}
//               className="aspect-[0.73] object-contain object-center w-[202px] shadow-lg overflow-hidden shrink-0 max-w-full grow max-md:mt-3"
//             />
//           </div>
//           <div className="flex flex-col items-stretch w-4/5 max-md:w-full max-md:ml-0">
//             <span className="flex grow flex-col max-md:max-w-full max-md:mt-3">
//               <div className="text-neutral-800 text-2xl font-semibold leading-8 self-stretch max-md:max-w-full">
//                 {title}
//               </div>
//               <div className="text-neutral-500 text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
//                 by {author}
//               </div>
//               <div className="text-black text-sm leading-5 self-stretch mt-2 max-md:max-w-full">
//                 {description}
//               </div>
//               <span className="items-stretch flex gap-3 mt-2 pr-9 self-start max-md:pr-5">
//                 <div className="text-neutral-500 text-sm leading-5 grow whitespace-nowrap">
//                   {genre}
//                 </div>
//                 <div className="text-neutral-500 text-sm leading-5">
//                   {genre}
//                 </div>
//                 <div className="text-neutral-500 text-sm leading-5 grow whitespace-nowrap">
//                   {genre}
//                 </div>
//               </span>
//               <div className="text-neutral-800 text-base font-bold leading-6 self-stretch mt-2 max-md:max-w-full">
//                 {price}
//               </div>
//               <div className="flex gap-2.5 mt-6 self-start items-start max-md:max-w-full max-md:flex-wrap">
//                 <span
//                   className="hover:bg-green-600 hover:text-white cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch bg-white grow px-8 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
//                   onClick={handleDownloadClick}
//                 >
//                   DOWNLOAD now
//                 </span>
//                 <Modal
//                   isOpen={isModalOpen}
//                   onRequestClose={handleCloseModal}
//                   style={{
//                     overlay: {
//                       backgroundColor: "rgba(0, 0, 0, 0.5)",
//                       zIndex: 1000,
//                     },
//                     content: {
//                       maxWidth: "400px",
//                       maxHeight: "500px",
//                       margin: "auto",
//                       background: "white",
//                       borderRadius: "8px",
//                       padding: "20px",
//                     },
//                   }}
//                 >
//                   <DownloadBookModal
//                     onCancel={handleCloseModal}
//                     onContinue={() => {
//                       // Handle continue logic here
//                       handleCloseModal();
//                     }}
//                   />
//                 </Modal>
//                 <span className="hover:bg-green-600 hover:text-white cursor-pointer text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow px-12 py-5 rounded-md border-[1.174px] border-solid border-green-600 max-md:px-5">
//                   READ ONLINE
//                 </span>
//               </div>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };