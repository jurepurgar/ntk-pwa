
self.addEventListener('push', async function (event) {
    var message = event.data.json();
    var clients = await self.clients.matchAll();

    if (clients && clients.length > 0)
    {
        clients.forEach(client => {
            client.postMessage(message);
        });
    } else {
        showLocalNotification(message);
    }
});


function showLocalNotification(message) {
    this.registration.showNotification(message.Sender, {
        body: message.Text
    });
}