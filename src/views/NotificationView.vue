<template>
    <div>
        <h1>Welcome to chat app</h1>
        <v-btn @click='subscribe()'>Subscribe</v-btn>
        <h3>Your id: {{ id }}</h3>
        <h2>Notification</h2>
        <h3>{{ notify }}
        </h3>
    </div>
</template>
<script>

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



const firebaseConfig = {
    apiKey: "AIzaSyBZgtTy-8Mb5s4plixevPy-CxTavWwMlCg",
    authDomain: "social-565bd.firebaseapp.com",
    projectId: "social-565bd",
    storageBucket: "social-565bd.appspot.com",
    messagingSenderId: "738158655740",
    appId: "1:738158655740:web:f3ae4fd7615e97fd5abf79",
    measurementId: "G-19KFSPTNEX",
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
export default {
    name: "NotificationView",
    data() {
        return {
            id: "",
            notify: ""
        }
    },
    methods: {
        subscribe: subscribe
    },
    created() {
        onMessage(messaging, payload => {
            console.log(payload);
            this.notify = payload
        })
    }
}

function subscribe() {
    Notification.requestPermission().then((permission) => {
        console.log("hi" + permission);
        if (permission = "granted") {
            getToken(messaging, {
                vapidKey:
                    "BBmQl-k0GiQfrtZpa8A5TK_0JHUmKcZlQ3HDHuXHYyX_CBuoU-6KA7p8Dcd6iW8jGFXc9HnQkMcU0hIzKmNfV8I",
            })
                .then((token) => {
                    console.log(token);
                    this.id = token
                });
        }
    });
}


</script>
<style></style>