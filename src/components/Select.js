import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useController } from 'react-hook-form';

export default function Select(props) {
  const {
    label,
    control,
    options,
    defaultValue,
    rules,
    placeholder,
    name,
    multiple,
  } = props;
  const {
    field: { ref, onBlur, ...mainProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules,
  });
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  const selectedItem = options.find((op) => op.value === mainProps.value);
  return (
    <div className=' w-72  mb-4 '>
      <Listbox {...mainProps} multiple={multiple}>
        <Listbox.Label className='block text-gray-700 text-sm font-bold mb-2'>
          {label}
        </Listbox.Label>
        <div className='relative mt-1'>
          <Listbox.Button className=' h-9 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm'>
            <span className='block truncate'>{selectedItem?.label}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {options.map((option, index) => {
                const selected = mainProps.value === option.value;
                return (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active || selected
                          ? 'bg-blue-100 text-blue-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {(props) => {
                      return (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error?.type === 'required' && (
        <p className='text-red-500'>This field is required</p>
      )}
    </div>
  );
}
