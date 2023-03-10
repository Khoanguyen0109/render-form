import { useState } from 'react';
import { Tab } from '@headlessui/react';
import FormTab from './FormTab';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs(props) {
  const { tabs, onSaveData, onSubmit } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onNextChangeTab = (value) => {
    console.log('value :>> ', value);
    onSaveData(value);
    setSelectedIndex((preState) => preState + 1);
  };
  console.log('selectedIndex :>> ', selectedIndex);
  return (
    <div className='w-full  px-2 py-16 sm:px-0'>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className='flex space-x-2 rounded-xl bg-blue-900/20 p-1'>
          {Object.keys(tabs).map((tab, index) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Tab {index + 1}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {Object.values(tabs).map((tab, idx) => {
            console.log('tab', tab);
            const isLast = idx === Object.values(tabs).length - 1;
            return (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3 mt-10',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <FormTab
                  idx={idx}
                  onSubmit={isLast ? onSubmit : onNextChangeTab}
                  items={tab}
                  onNextChangeTab={onNextChangeTab}
                />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
