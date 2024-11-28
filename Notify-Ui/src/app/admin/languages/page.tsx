import React from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import { Metadata } from 'next';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

export const metadata: Metadata = {
  title: "Languages",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Languages' />
    <div>Languages</div>
    </DefaultLayout>
  )
}

export default page