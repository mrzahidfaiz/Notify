import React from 'react';
import { Metadata } from 'next';
import DefaultLayout from '../../../../components/Layouts/DefaultLayout';
import Notification from '../../../../components/Forms/notificationsPage';


export const metadata: Metadata = {
  title: "Mass Notifications",
};

const page = () => {
  return (
    <DefaultLayout>
      <Notification />
    </DefaultLayout>
    
  )
}

export default page