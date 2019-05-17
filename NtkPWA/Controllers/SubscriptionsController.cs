using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NtkPWA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController : ControllerBase
    {
        // POST: api/Subscriptions
        [HttpPost]
        public void Post([FromBody] Subscription subscription)
        {
            if (Store.Subscriptions.All(x => x.Endpoint != subscription.Endpoint))
            {
                Store.Subscriptions.Add(subscription);
            }
        }

    }
}
