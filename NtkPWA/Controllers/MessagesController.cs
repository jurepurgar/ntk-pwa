using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebPush;

namespace NtkPWA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly WebPushClient _pushClient = new WebPushClient();
        private readonly VapidDetails _vapid = new VapidDetails("mailto:jure@purgar.net", "BED4o4WbZLiEwE7DRKRs8UeJho3wYe91U_VddfzMrd4YWQOQ0QBiE5_kd69Ti1n6QRXl14UPqLY-dqNQRC2OBZo", "BF4CE2Bv5kyKEIrXbDcpFdCtLV1D3k1GGhPXtZNWMJo");

        // GET: api/Messages
        [HttpGet]
        public IEnumerable<Message> Get()
        {
            return null;
        }

        // GET: api/Messages/5
        [HttpGet("{id}", Name = "Get")]
        public Message Get(int id)
        {
            return new Message() { };
        }

        // POST: api/Messages
        [HttpPost]
        public void Post([FromBody] Message message)
        {
            Store.Messages.Add(message);
            NotifySubscribers(message);
        }

        private Task NotifySubscribers(Message message)
        {
            return Task.WhenAll(Store.Subscriptions.Select(x => NotifySubscriber(message, x)));
        }

        private async Task NotifySubscriber(Message message, Subscription subscription)
        {
            var sub = new PushSubscription(subscription.Endpoint, subscription.Keys.P256Dh, subscription.Keys.Auth);
            var payload = "test";
            try
            {
                await _pushClient.SendNotificationAsync(sub, payload, _vapid);
            }
            catch (Exception e)
            {
                Debug.WriteLine($"Push error: {e.Message}");
            }
        }
    }
}
