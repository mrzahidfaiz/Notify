import React from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Subscription",
};

const page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Subscription" />
      <div>Subscription</div>
    </DefaultLayout>
  );
};

export default page;
