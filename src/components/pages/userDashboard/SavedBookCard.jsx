// export const SavedBookCard = ({
//   image,
//   author,
//   title,
//   genre,
//   price,
//   description,
// }) => {
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
//               <span className="items-stretch flex justify-between gap-5 mt-6 self-start max-md:max-w-full max-md:flex-wrap">
//                 <span className="hover:bg-green-600 hover:text-white cursor-pointer text-green-500 text-base font-medium leading-5 uppercase justify-center items-stretch grow px-11 py-5 rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5">
//                   ADD TO CART
//                 </span>
//                 <div className="hover:bg-red-600 hover:text-white cursor-pointer text-red-500 text-sm font-semibold leading-5 my-auto px-11 py-5 rounded-md border-[1.145px] border-solid border-red-600 max-md:px-5">
//                   Remove From Wishlist
//                 </div>
//               </span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
