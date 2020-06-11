using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
    public class ContactRepository : Repository<Contact>, IContactRepository
    {
        public ContactRepository(IConnectionProvider provider)
           : base(provider)
        {
        }

        public ContactRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<Contact> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Contact Create(Contact contact)
        {
            UnitOfWork.Connection.ExecuteScalar<int>(
               sql: $"INSERT INTO org.Contact(ContactID, OrganizationID, Name, Email, Mobile, ModifiedDate, ModifiedBy, IsDeleted) VALUES(@ContactID, @OrganizationID, @Name, @Email, @Mobile, @ModifiedDate, @ModifiedBy, @IsDeleted)",
               param: new { contact.ContactID, contact.OrganizationID, contact.Name, contact.Email, contact.Mobile, contact.ModifiedDate, contact.ModifiedBy, contact.IsDeleted },
               transaction: UnitOfWork.Transaction);

            return contact;
        }

        public override Contact Delete(Contact contact)
        {
            throw new NotImplementedException();
        }

        public override Contact Find(params object[] keys)
        {
            return UnitOfWork.Connection.QuerySingleOrDefault<Contact>(
                sql: "SELECT * FROM org.Contact WHERE ContactID = @ContactID",
                param: new { ContactID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public Contact GetContact(string name)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<Contact>(
                sql: "SELECT * FROM org.Contact WHERE Name = @Name",
                param: new { Name = name },
                transaction: UnitOfWork.Transaction);
        }

        public List<Contact> GetContacts(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<Contact>(
                sql: "SELECT * FROM org.Contact WHERE OrganizationID = @OrganizationID AND IsDeleted = 0",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Contact Update(Contact contact)
        {
            UnitOfWork.Connection.Execute(
                sql: "UPDATE org.Contact SET OrganizationID = @OrganizationID, Name = @Name, Email = @Email, Mobile = @Mobile, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy, IsDeleted = @IsDeleted WHERE ContactID = @ContactID",
                param: new { contact.ContactID, contact.OrganizationID, contact.Name, contact.Email, contact.Mobile, contact.ModifiedDate, contact.ModifiedBy, contact.IsDeleted },
                transaction: UnitOfWork.Transaction);

            return contact;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
