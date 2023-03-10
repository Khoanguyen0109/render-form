import React from 'react';
import { useForm } from 'react-hook-form';
import DateInput from './Date';
import Input from './Input';
import RadioGroupCustom from './RadioGroup';
import Select from './Select';

function FormTab(props) {
  const { items, idx, isLast, onSubmit } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const switchItem = (i, index) => {
    const showLabel = index === 0;
    const itemProps = {
      label: showLabel && i.name_field,
      name: showLabel
        ? i.name_field.replaceAll(',', '').replaceAll(' ', '_')
        : i.name_field.replaceAll(',', '').replaceAll(' ', '_') + index,
      control,
      className: i.style,
      rules: { required: i.require === 'TRUE' },
    };
    switch (i.field) {
      case 'input':
        return (
          <Input {...itemProps} placeholder={i.placeholder} type={i.type} />
        );
      case 'select':
        return (
          <Select
            {...itemProps}
            options={i.option.split('/').map((option) => ({
              label: option,
              value: option,
            }))}
            multiple={i.type === 'multi'}
          />
        );
      case 'date':
        return <DateInput {...itemProps} placeholder={i.placeholder} />;
      case 'radio':
        return (
          <RadioGroupCustom
            {...itemProps}
            options={i.option.split('/').map((option) => ({
              label: option,
              value: option,
            }))}
          />
        );
      default:
        break;
    }
  };
  const renderItem = (item) => {
    console.log('item', item);
    if (item.length > 1) {
      return (
        <div>
          {item.map((i, index) => {
            return switchItem(i, index);
          })}
        </div>
      );
    } else {
      return item.map((i, index) => {
        return switchItem(i, index);
      });
    }
  };
  console.log('Object.values(items).map()', Object.values(items));
  return (
    <form key={idx} onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-wrap gap-x-24 gap-y-5 '>
        {Object.values(items).map((item) => renderItem(item))}
      </div>

      <div className='flex justify-end mt-12'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white sm:text-4xl lg:text-sm font-bold sm:py-6 lg:py-4 sm:px-10 lg:px-6 rounded'
          type='submit'
        >
          {isLast ? 'Submit' : 'Next'}
        </button>
      </div>
    </form>
  );
}

export default FormTab;
