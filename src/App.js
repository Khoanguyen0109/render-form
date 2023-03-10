import { Fragment, useEffect, useState } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import Layout from './layout/Layout';
import ListForm from './container/ListForm';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import FormDetail from './container/FormDetail';
import axios from 'axios';

export function App() {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://script.google.com/macros/s/AKfycbwc6zsfumMrVjMwaSnku8NZxL2t5WJjtBK2LlXSkzx1CGptTvtjc4EBl5sBxnYqXJdgXQ/exec'
      );
      setData(res.data.data);
      const unique = [
        ...new Map(
          res.data.data.map((item) => [item['idform'], item])
        ).values(),
      ];
      setList(unique);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <BrowserRouter>
      <Layout>
      {/* <ListForm list={list} loading={loading} /> */}
        <Routes>
          <Route
            path={'/'}
            element={<ListForm list={list} loading={loading} />}
          />
          <Route
            path={'/:formId'}
            element={<FormDetail data={data} loading={loading} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
