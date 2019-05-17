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

self.addEventListener('activate', async () => {
    try {
        const applicationServerKey = await urlB64ToUint8Array('BED4o4WbZLiEwE7DRKRs8UeJho3wYe91U_VddfzMrd4YWQOQ0QBiE5_kd69Ti1n6QRXl14UPqLY-dqNQRC2OBZo');
        const options = { applicationServerKey, userVisibleOnly: true };
        const subscription = await self.registration.pushManager.subscribe(options);
        
        await saveSubscription(subscription);
    } catch (err) {
        console.log('Error', err);
    }
});

self.addEventListener('push', async function (event) {
    if (event.data) {
        console.log('Push event!! ', event.data.text());
    } else {
        console.log('Push event but no data');
    }

    var clients = await self.clients.matchAll();

    if (clients && clients.length > 0)
    {
        clients.forEach(client => {
            client.postMessage({
                client: "test",
                message: "test"
            });
        });

    } else {
            showLocalNotification("test", "test");
    }
});


function showLocalNotification(title, body) {
    const options = {
        body
    };
    this.registration.showNotification(title, options);
}