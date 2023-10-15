'use client';

import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner, ImUser } from 'react-icons/im';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterPetSchema, FilterPetSchemaType } from '../utils/schemas';
import { apiAddress } from '../utils/variables';
import { DefaultInput, SelectInput } from '@/components/helpers/InputFields';

function PetsFilter() {
  const [nkita, setNkita] = useState('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const sug = ['German Shepard', 'Lhasa Apso', 'Cane Corso', 'Eskimo', 'Ekuke'];

  const getPredictions = (value: string) =>
    sug.filter(
      (item) =>
        item.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) !== -1 &&
        item !== value
    );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNkita(val);
    val.length > 0 ? setPredictions(getPredictions(val)) : setPredictions([]);
  };

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FilterPetSchemaType>({
    mode: 'all',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(FilterPetSchema)
  });

  const fields = watch();

  console.log(errors);

  const filterPets = async ({}) => {};

  return (
    <div>
      {/* <form>
        <SelectInput />
        <DefaultInput errors={errors.breed} />
        <label>
          Select Gender:
          <select name='gender'>
            <option value='msle'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </label>
        <label>
          Breed
          <input
            type='text'
            value={breed}
            onChange={handleChange}
            className='border-black border'
          />
        </label>
        <label>
          Select State
          <input
            type='text'
            value={breed}
            onChange={handleChange}
            className='border-black border'
          />
        </label>
        <label>
          Select City
          <input
            type='text'
            value={breed}
            onChange={handleChange}
            className='border-black border'
          />
        </label>
        <div
          onClick={(e: any) => {
            setNkita(e.target.lastChild.data);
            setPredictions([]);
          }}>
          {predictions.map((item, i) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </form> */}
    </div>
  );
}

export default PetsFilter;
