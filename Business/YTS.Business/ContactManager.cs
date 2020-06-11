using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
   public class ContactManager : IDisposable
    {
        private Guid clientID;
        private Guid organizationID;
        private Guid userID;
        private IContactRepository contactRepository;
        private bool disposed = false;

        public ContactManager(Guid clientID, Guid organizationID)
        {
            this.clientID = clientID;
            this.organizationID = organizationID;
            contactRepository = new ContactRepository(new ClientConnectionProvider(clientID));
        }

        public ContactManager(Guid clientID, Guid organizationID, Guid userID)
            : this(clientID, organizationID)
        {
            this.userID = userID;
        }

        public Contact GetContact(string name)
        {
            if (clientID == default(Guid))
            {
                throw new ArgumentException($"{nameof(clientID)} is invalid");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null");
            }

            Data.Models.Contact contact = contactRepository.GetContact(name);
            if (contact == null)
            {
                return null;
            }

            return new Contact
            {
                Name = contact.Name,
                OrganizationID = contact.OrganizationID,
                Email = contact.Email,
                Mobile = contact.Mobile,
                ContactID = contact.ContactID
            };
        }

        public Contact Save(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException($"{nameof(contact)} is null.");
            }

            Data.Models.Contact c;
            if (contact.ContactID != Guid.Empty)
            {
                c = contactRepository.Find(contact.ContactID);
                c.IsDeleted = contact.IsDeleted;
                c.ModifiedBy = userID;
                c.ModifiedDate = DateTime.UtcNow;
                c.Name = contact.Name;
                c.OrganizationID = organizationID;
                c.Email = contact.Email;
                c.Mobile = contact.Mobile;
                c.ContactID = contact.ContactID;
                contactRepository.Update(c);
            }
            else
            {
                c = contactRepository.Create(new Data.Models.Contact
                {
                    IsDeleted = contact.IsDeleted,
                    ModifiedBy = userID,
                    ModifiedDate = DateTime.UtcNow,
                    Name = contact.Name,
                    OrganizationID = organizationID,
                    Email = contact.Email,
                    Mobile = contact.Mobile,
                    ContactID = Guid.NewGuid()
                });

                contact.ContactID = c.ContactID;
            }

            contactRepository.Save();
            return contact;
        }

        public List<Contact> GetContacts()
        {
            List<Data.Models.Contact> contacts = contactRepository.GetContacts(organizationID);
            return contacts.Select(t => new Contact
            {
                IsDeleted = t.IsDeleted,
                Name = t.Name,
                OrganizationID = t.OrganizationID,
                Email = t.Email,
                Mobile = t.Mobile,
                ContactID = t.ContactID
            }).ToList();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    contactRepository.Dispose();
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
