import "firebase/messaging";
import firebase from 'firebase/app';
import localforage from "localforage";

const firebaseCloudMessaging = {
    init: async () => {
        if (!firebase?.apps?.length) {

            // Initialize the Firebase app with the credentials
            firebase?.initializeApp({
                apiKey: "AIzaSyDSqNCgSK7mtkPYoDA2CaDfz8ubO97CjSU",
                authDomain: "fir-project-9e7eb.firebaseapp.com",
                databaseURL: "https://fir-project-9e7eb-default-rtdb.firebaseio.com",
                projectId: "fir-project-9e7eb",
                storageBucket: "fir-project-9e7eb.appspot.com",
                messagingSenderId: "1010234250070",
                appId: "1:1010234250070:web:1c1358c0581acdf60e3cf7"
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await localforage.getItem("fcm_token");

                // Return the token if it is already in our local storage
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === "granted") {
                    // Get new token from Firebase
                    const fcm_token = await messaging.getToken({
                        vapidKey: "BAbVXdcped6hgfsgdHjULIIWcipUQ-ugdp05YjBgAzFjvUdXlqDNrrXgCsxqLg97e6F4ZvPTNE6bBBINQb-qIR8",
                    });

                    // Set token in our local storage
                    if (fcm_token) {
                        localforage.setItem("fcm_token", fcm_token);
                        return fcm_token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },
};
export { firebaseCloudMessaging };