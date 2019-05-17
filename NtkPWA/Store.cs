using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NtkPWA
{
    public class Store
    {
        public static ConcurrentBag<Subscription> Subscriptions = new ConcurrentBag<Subscription>();

        public static ConcurrentBag<Message> Messages = new ConcurrentBag<Message>();
    }
}
