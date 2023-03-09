import { ArrowLeftCircleIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { groupBy, mapValues } from 'lodash';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import DateInput from '../components/Date';
import Input from '../components/Input';
import RadioGroupCustom from '../components/RadioGroup';
import Select from '../components/Select';
import Tabs from '../components/Tab';

function FormDetail(props) {
  const { data, loading } = props;
  const params = useParams();
  const navigate = useNavigate();
  const formFields = data.filter((item) => item.idform === params.formId);
  console.log('formFields', formFields);
  const formName = formFields[0]?.name_form;
  console.log('formName', formName);
  const onBack = () => {
    navigate('/');
  };
  var grouped = mapValues(groupBy(formFields, 'steps'), (clist) => clist);
  console.log('grouped :>> ', grouped);
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (value) => {
    console.log('value :>> ', value);
  };

  const renderForm = () => {};
  return (
    !loading && (
      <>
        <div>
          <button className='bg-transparent font-semibold ' onClick={onBack}>
            <ArrowLeftIcon className='h-6 w-6 text-black' />
          </button>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <p className='mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {formName}
            </p>
          </div>
        </div>
        {/* <Select />
        <Input />

        <Tabs />
        <RadioGroupCustom />
        <DateInput /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name='userName' control={control} rules={{ required: true }} />
          <Select
            name='data'
            control={control}
            multiple={true}
            options={[
              {
                label: 'Value1',
                value: 1,
              },
              {
                label: 'Value1',
                value: 2,
              },
              {
                label: 'Value1',
                value: 3,
              },
              {
                label: 'Value1',
                value: 4,
              },
            ]}
            rules={{ required: true }}
          />

          <input type='submit' />
        </form>
      </>
    )
  );
}

export default FormDetail;
