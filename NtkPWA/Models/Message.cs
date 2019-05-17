using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NtkPWA
{
    public class Message
    {
        public Guid Id { get; set; }

        public string Sender { get; set; }

        public string Text { get; set; }
    }
}
