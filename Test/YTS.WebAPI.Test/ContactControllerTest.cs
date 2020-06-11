using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class ContactControllerTest
    {
        private readonly ContactController contactController;
        private bool disposed = false;

        public ContactControllerTest()
        {
            contactController = new ContactController
            {
                Request = new System.Net.Http.HttpRequestMessage(),
                Configuration = new System.Web.Http.HttpConfiguration()
            };
            contactController.Request.Headers.Add("User", "eyJDbGllbnRJRCI6IjY2YzYxN2Q4LWIxNWItNDEwZi1iZWU5LWQ1MzhhZmMwMDhkNSIsIlVzZXJJRCI6ImNlNGRjM2Y3LTc5MmItNDEzYi04ZThkLWM1NTk1OWUyZTJhMSIsIk9yZ2FuaXphdGlvbklEIjoiNDJiNzRkYmYtNGNjOC00NjZkLWI1YmYtMmJkNGQ4YTNkMDBmIn0=");
        }

        [Test]
        public void GetTest()
        {
            OkNegotiatedContentResult<Contact> message = contactController.GetContact("Test") as OkNegotiatedContentResult<Contact>;
            Assert.IsTrue(message.Content.Name == "Test");
        }

        [Test]
        public void SaveTest()
        {
            OkNegotiatedContentResult<Contact> message = contactController.Save(new Contact
            {
                IsDeleted = false,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                Email = "success@gmail.com",
                Mobile = "99407",
                ContactID = Guid.Empty
            }) as OkNegotiatedContentResult<Contact>;

            Assert.IsTrue(message.Content.Name == "Sample" && message.Content.ContactID != Guid.Empty);

            message = contactController.Save(new Contact
            {
                IsDeleted = true,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                Email = "success@gmail.com",
                Mobile = "99407",
                ContactID = message.Content.ContactID
            }) as OkNegotiatedContentResult<Contact>;
        }

        [Test]
        public void GetNullTest()
        {
            Assert.Catch<ArgumentNullException>(() => contactController.GetContact(null));
        }

        [Test]
        public void GetContactsTest()
        {
            OkNegotiatedContentResult<List<Contact>> message = contactController.GetContacts() as OkNegotiatedContentResult<List<Contact>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (contactController != null)
                    {
                        if (contactController.Request != null)
                        {
                            contactController.Request.Dispose();
                        }

                        if (contactController.Configuration != null)
                        {
                            contactController.Configuration.Dispose();
                        }

                        contactController.Dispose();
                    }
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
