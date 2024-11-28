import React from 'react';
import { Metadata } from 'next';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Users from '../../../components/Forms/userPage';

export const metadata: Metadata = {
  title: "Users",
};

const page = () => {
  return (
    <DefaultLayout>
        <Users />
    </DefaultLayout>
  )
}

export default page