using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;
namespace YTS.Business
{
    public class SalesPersonManager : IDisposable
    {
        private Guid clientID;
        private Guid organizationID;
        private Guid userID;
        private ISalesPersonRepository salespersonRepository;
        private bool disposed = false;

        public SalesPersonManager(Guid clientID, Guid organizationID)
        {
            this.clientID = clientID;
            this.organizationID = organizationID;
            salespersonRepository = new SalesPersonRepository(new ClientConnectionProvider(clientID));
        }

        public SalesPersonManager(Guid clientID, Guid organizationID, Guid userID)
            : this(clientID, organizationID)
        {
            this.userID = userID;
        }

        public SalesPerson GetSalesPerson(string name)
        {
            if (clientID == default(Guid))
            {
                throw new ArgumentException($"{nameof(clientID)} is invalid");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null");
            }

            Data.Models.SalesPerson salesPerson = salespersonRepository.GetSalesPerson(name);
            if (salesPerson == null)
            {
                return null;
            }

            return new SalesPerson
            {
                Name = salesPerson.Name,
                OrganizationID = salesPerson.OrganizationID,                
                Mobile = salesPerson.Mobile,
                SalesPersonID = salesPerson.SalesPersonID
            };
        }

        public SalesPerson Save(SalesPerson salesperson)
        {
            if (salesperson == null)
            {
                throw new ArgumentNullException($"{nameof(salesperson)} is null.");
            }

            Data.Models.SalesPerson c;
            if (salesperson.SalesPersonID != Guid.Empty)
            {
                c = salespersonRepository.Find(salesperson.SalesPersonID);
                c.IsDeleted = salesperson.IsDeleted;
                c.ModifiedBy = userID;
                c.ModifiedDate = DateTime.UtcNow;
                c.Name = salesperson.Name;
                c.OrganizationID = organizationID;                
                c.Mobile = salesperson.Mobile;
                c.SalesPersonID = salesperson.SalesPersonID;
                salespersonRepository.Update(c);
            }
            else
            {
                c = salespersonRepository.Create(new Data.Models.SalesPerson
                {
                    IsDeleted = salesperson.IsDeleted,
                    ModifiedBy = userID,
                    ModifiedDate = DateTime.UtcNow,
                    Name = salesperson.Name,
                    OrganizationID = organizationID,                    
                    Mobile = salesperson.Mobile,
                    SalesPersonID = Guid.NewGuid()
                });

                salesperson.SalesPersonID = c.SalesPersonID;
            }

            salespersonRepository.Save();
            return salesperson;
        }

        public List<SalesPerson> GetSalesPersons()
        {
            List<Data.Models.SalesPerson> salespersons = salespersonRepository.GetSalesPersons(organizationID);
            return salespersons.Select(t => new SalesPerson
            {
                IsDeleted = t.IsDeleted,
                Name = t.Name,
                OrganizationID = t.OrganizationID,                
                Mobile = t.Mobile,
                SalesPersonID = t.SalesPersonID
            }).ToList();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    salespersonRepository.Dispose();
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
