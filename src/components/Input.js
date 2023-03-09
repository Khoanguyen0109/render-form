import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useController } from 'react-hook-form';

function Input(props) {
  const { label, type, control, defaultValue, rules, placeholder, name } =
    props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules,
  });
  return (
    <div className=' w-72 mb-4 '>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
      </label>
      <input
        // className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        className='w-full border-none cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-nonefocus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm '
        {...field}
        type={type}
        placeholder={placeholder}
      />
      {error?.type === 'required' && (
        <p className='text-red-500'>This field is required</p>
      )}
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  defaultValue: '',
};

export default Input;
