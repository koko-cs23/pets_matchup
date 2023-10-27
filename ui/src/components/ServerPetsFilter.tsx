// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { places, cat } from '@/utils/jsons';
// import { FilterPetSchema, FilterPetSchemaType } from '../utils/schemas';
// import { apiAddress } from '../utils/variables';

// function PetsFilter() {
//   let place: string[] = [];

//   if (fields.state && places?.[fields?.state]?.cities) {
//     place = places?.[fields.state]?.cities;
//   }

//   let breeds: string[] = [];
//   if (fields.category && cat?.[fields.category]?.breeds) {
//     breeds = cat?.[fields.category]?.breeds;
//   }

//   return (
//     <div className='md:border-r md:pr-6 py-11'>
//       {/* TODO: use grid instead of max-height  */}
//       <div
//         className={`grid transition-all ${
//           showFilter ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] md:grid-rows-[1fr]'
//         }`}>
//         <form
//           className='md:w-72 flex gap-6 flex-col overflow-hidden'
//           aria-hidden={showFilter}>
//           <select id='' name='category'>
//             <option value={-1} disabled></option>
//             {cat.map((value, i) => (
//               <option key={i} value={i}>
//                 {value.name}
//               </option>
//             ))}
//           </select>
//           <SelectInput
//             required={false}
//             top={cat}
//             register={register('category')}
//             errors={errors.category?.message}
//             fields={fields.category! > -1}
//             placeholder='select category'
//           />

//           <SelectInput
//             required={false}
//             disabled={!(fields.category! > -1)}
//             items={breeds}
//             register={register('breed')}
//             errors={errors.breed?.message}
//             fields={fields?.breed?.length! > 0}
//             placeholder='select breed'
//           />
//           <SelectInput
//             required={false}
//             items={['male', 'female']}
//             register={register('gender')}
//             errors={errors.gender?.message}
//             fields={fields?.gender?.length! > 0}
//             placeholder='select gender'
//           />
//           <SelectInput
//             required={false}
//             items={['Nigeria']}
//             register={register('country')}
//             errors={errors.country?.message}
//             fields={fields?.country?.length! > 0}
//             placeholder='select country'
//           />
//           <SelectInput
//             required={false}
//             top={places}
//             register={register('state')}
//             errors={errors.state?.message}
//             fields={+fields?.state! > -1}
//             placeholder='select state'
//           />
//           <SelectInput
//             required={false}
//             disabled={!(+fields?.state! > -1)}
//             items={place}
//             register={register('city')}
//             errors={errors.city?.message}
//             fields={fields?.city?.length! > 0}
//             placeholder='select City'
//           />
//           <button type='submit' disabled={isSubmitting} className='btn'>
//             Filter
//           </button>
//         </form>
//       </div>
//       <button
//         className={`text-2xl border-2 w-10 h-10 flex items-center justify-center absolute right-3 md:hidden ${
//           !showFilter && 'rotate-180'
//         }`}
//         onClick={() => setShowFilter(!showFilter)}>
//         &uarr;
//       </button>
//     </div>
//   );
// }

// export default PetsFilter;
