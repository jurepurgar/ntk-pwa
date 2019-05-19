using System;

namespace NtkPWA
{
    public partial class Subscription
    {
        public string Endpoint { get; set; }

        public Keys Keys { get; set; }
    }

    public partial class Keys
    {
        public string P256Dh { get; set; }

        public string Auth { get; set; }
    }

}
