import React from 'react'
import { Metadata } from 'next';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import Inbox from '../../../../components/Forms/inboxPage';

export const metadata: Metadata = {
  title: "Inbox",
};

const page = () => {
  return (
    <DefaultLayout>
        <Inbox />
    </DefaultLayout>
    
  )
}

export default page