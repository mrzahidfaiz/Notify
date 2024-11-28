"use client";
import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { firebaseCloudMessaging } from "../../utils/firebase";

function PushNotificationLayout({ children }: any) {
  const router = useRouter();
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
          // getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url: any) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = firebase.messaging();
    // console.log("messaging:", messaging)
    messaging.onMessage((message) => {
      console.log("message:", message);
      // toast(
      //   <div onClick={() => handleClickPushNotification(message?.data?.url)}>
      //     <h5>{message?.notification?.title}</h5>
      //     <h6>{message?.notification?.body}</h6>
      //   </div>,
      // );
    });
  }

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

export default PushNotificationLayout;
