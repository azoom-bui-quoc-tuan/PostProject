importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyBZgtTy-8Mb5s4plixevPy-CxTavWwMlCg",
    authDomain: "social-565bd.firebaseapp.com",
    projectId: "social-565bd",
    storageBucket: "social-565bd.appspot.com",
    messagingSenderId: "738158655740",
    appId: "1:738158655740:web:f3ae4fd7615e97fd5abf79",
    measurementId: "G-19KFSPTNEX",
});

const messaging = firebase.messaging();