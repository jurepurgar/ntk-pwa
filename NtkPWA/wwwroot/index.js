if ('serviceWorker' in navigator) {
    console.log("registering Service Worker");
    navigator.serviceWorker.register('sw.js');
}

//sw push: https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679



/*
document.querySelector('#show').addEventListener('click', () => {
    const iconUrl = document.querySelector('select').selectedOptions[0].value;
    let imgElement = document.createElement('img');
    imgElement.src = iconUrl;
    document.querySelector('#container').appendChild(imgElement);
});

*/