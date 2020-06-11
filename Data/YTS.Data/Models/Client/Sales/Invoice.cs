using System;

namespace YTS.Data.Models
{
    public class Invoice : Audit
    {
        public Guid InvoiceID { get; set; }

        public Guid OrganizationID { get; set; }

        public string InvoiceNumber { get; set; }

        public string OrderNumber { get; set; }

        public DateTime InvoiceDate { get; set; }

        public Guid ContactID { get; set; }

        public Guid VehicleID { get; set; }

        public decimal StartRPM { get; set; }

        public decimal EndRPM { get; set; }

        public decimal TotalRPM { get; set; }

        public Guid SalesPersonID { get; set; }

        public string City { get; set; }

        public int BoreType { get; set; }

        public int TotalDrill { get; set; }

        public decimal TotalAmount { get; set; }

        public string Remarks { get; set; }

        public int Status { get; set; }
    }
}
