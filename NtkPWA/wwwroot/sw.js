
self.addEventListener('push', async function (event) {
    event.waitUntil(onPush(event));
});

async function onPush(event) {
    var message = event.data.json();

    var clients = await self.clients.matchAll();
    if (clients && clients.length > 0) {
        clients.forEach(client => {
            client.postMessage(message);
        });
    } else {
        await this.registration.showNotification(message.Sender, {
            body: message.Text
        });

    } 
}

//offline
const CACHE = "offline-cache";

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;
    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                // If request was success, add or update it in the cache
                event.waitUntil(updateCache(event.request, response.clone()));
                return response;
            })
            .catch(function (error) {
                return fromCache(event.request);
            })
    );
});

function fromCache(request) {
    return caches.open(CACHE).then(cache => {
        return cache.match(request).then(function (matching) {
            if (!matching || matching.status === 404) {
                return Promise.reject("no-match");
            }
            return matching;
        });
    });
}

function updateCache(request, response) {
    return caches.open(CACHE).then(function (cache) {
        return cache.put(request, response);
    });
}
