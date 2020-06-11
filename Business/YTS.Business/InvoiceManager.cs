using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
    public class InvoiceManager : IDisposable
    {
        private bool disposed = false;
        private Guid organizationID;
        private IInvoiceRepository invoiceRepository;

        public InvoiceManager(Guid clientID, Guid organizationID)
        {
            this.organizationID = organizationID;
            invoiceRepository = new InvoiceRepository(new ClientConnectionProvider(clientID));
        }

        public List<Invoice> GetInvoices()
        {
            List<Data.Models.Invoice> invoices = invoiceRepository.GetInvoices(organizationID);
            return invoices.Select(t => new Invoice
            {
                BoreType = t.BoreType,
                City = t.City,
                ContactID = t.ContactID,
                EndRPM = t.EndRPM,
                InvoiceDate = t.InvoiceDate,
                InvoiceID = t.InvoiceID,
                InvoiceNumber = t.InvoiceNumber,
                OrderNumber = t.OrderNumber,
                OrganizationID = t.OrganizationID,
                Remarks = t.Remarks,
                SalesPersonID = t.SalesPersonID,
                StartRPM = t.StartRPM,
                Status = t.Status,
                TotalAmount = t.TotalAmount,
                TotalDrill = t.TotalDrill,
                TotalRPM = t.TotalRPM,
                VehicleID = t.VehicleID
            }).ToList();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    invoiceRepository.Dispose();
                }
            }

            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
