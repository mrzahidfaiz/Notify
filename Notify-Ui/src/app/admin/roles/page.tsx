
import { Metadata } from "next";
import React from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Roles from "../../../components/Forms/rolePage";

export const metadata: Metadata = {
  title: "Roles",
};

const page = () => {
  return (
    <DefaultLayout>
      <Roles />
    </DefaultLayout>
  );
};

export default page;
