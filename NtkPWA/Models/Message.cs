using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NtkPWA
{
    public class Message
    {
        public Guid id { get; set; }

        public string sender { get; set; }

        public string text { get; set; }
    }
}
