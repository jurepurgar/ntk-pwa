var sender = null;

function showDiv(name) {
    document.getElementById("nameDiv").style.display = 'none';
    document.getElementById("loadingDiv").style.display = 'none';
    document.getElementById("mainDiv").style.display = 'none';
    document.getElementById(name).style.display = 'block';
}

async function init() {
    showDiv('loadingDiv');

    await window.Notification.requestPermission();

    var swRegistration = await navigator.serviceWorker.register('sw.js');
    const applicationServerKey = await urlB64ToUint8Array('BED4o4WbZLiEwE7DRKRs8UeJho3wYe91U_VddfzMrd4YWQOQ0QBiE5_kd69Ti1n6QRXl14UPqLY-dqNQRC2OBZo');
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await swRegistration.pushManager.subscribe(options);
    await saveSubscription(subscription);

    navigator.serviceWorker.addEventListener('message', event => {
        console.log("Message from SW received: ", event);
        var message = event.data;
        addMessage(message);
    });

    showDiv('nameDiv');
}

async function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function saveSubscription(subscription) {
    await fetch('api/Subscriptions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    });
}

async function sendMessage() {
    const text = document.getElementById("messageText").value;
    var message = {
        "sender": sender,
        "text": text
    };

    await fetch('api/Messages', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
}

function setName() {
    sender = document.getElementById("messageSender").value;
    showDiv('mainDiv');
}

function addMessage(message) {
    var messagesDiv = document.getElementById('messagesDiv');
    var msg = '<div><strong>' + message.Sender + ': </strong>' + message.Text + '</div>';
    messagesDiv.insertAdjacentHTML('beforebegin', msg);
}

init();