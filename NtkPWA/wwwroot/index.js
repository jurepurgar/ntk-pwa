

//sw push: https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679



/*
document.querySelector('#show').addEventListener('click', () => {
    const iconUrl = document.querySelector('select').selectedOptions[0].value;
    let imgElement = document.createElement('img');
    imgElement.src = iconUrl;
    document.querySelector('#container').appendChild(imgElement);
});

*/


async function init() {
    await navigator.serviceWorker.register('sw.js');
    await window.Notification.requestPermission();
}

async function sendMessage() {
    const sender = document.getElementById("messageSender").value;
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

init();