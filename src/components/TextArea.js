import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useController } from 'react-hook-form';

function TextArea(props) {
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
    <div className=' w-72 mb-8 '>
      <label
        className='block lg:h-10 text-gray-700 text-sm font-bold mb-2'
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
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

TextArea.defaultProps = {
  type: 'text',
  defaultValue: '',
};

export default TextArea;
