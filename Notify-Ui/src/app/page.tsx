import { Metadata } from "next";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import PushNotificationLayout from "../components/PushNotification/pushNotificationLayout";
import ECommerce from "../components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title:
    "Notify Dashboard",
  description: "This is Notify App",
};

export default function Home() {

  return (
    <>
        <DefaultLayout>
          <PushNotificationLayout>
            <ECommerce />
          </PushNotificationLayout>
        </DefaultLayout>
    </>
  );
}
