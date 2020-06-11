using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;
namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class SalesPersonControllerTest
    {
        private readonly SalesPersonController salespersonController;
        private bool disposed = false;

        public SalesPersonControllerTest()
        {
            salespersonController = new SalesPersonController
            {
                Request = new System.Net.Http.HttpRequestMessage(),
                Configuration = new System.Web.Http.HttpConfiguration()
            };
            salespersonController.Request.Headers.Add("User", "eyJDbGllbnRJRCI6IjY2YzYxN2Q4LWIxNWItNDEwZi1iZWU5LWQ1MzhhZmMwMDhkNSIsIlVzZXJJRCI6ImNlNGRjM2Y3LTc5MmItNDEzYi04ZThkLWM1NTk1OWUyZTJhMSIsIk9yZ2FuaXphdGlvbklEIjoiNDJiNzRkYmYtNGNjOC00NjZkLWI1YmYtMmJkNGQ4YTNkMDBmIn0=");
        }

        [Test]
        public void GetTest()
        {
            OkNegotiatedContentResult<SalesPerson> message = salespersonController.GetSalesPerson("Test") as OkNegotiatedContentResult<SalesPerson>;
            Assert.IsTrue(message.Content.Name == "Test");
        }

        [Test]
        public void SaveTest()
        {
            OkNegotiatedContentResult<SalesPerson> message = salespersonController.Save(new SalesPerson
            {
                IsDeleted = false,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                Mobile = "99407",
                SalesPersonID = Guid.Empty
            }) as OkNegotiatedContentResult<SalesPerson>;

            Assert.IsTrue(message.Content.Name == "Sample" && message.Content.SalesPersonID != Guid.Empty);

            message = salespersonController.Save(new SalesPerson
            {
                IsDeleted = true,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                Mobile = "99407",
                SalesPersonID = message.Content.SalesPersonID
            }) as OkNegotiatedContentResult<SalesPerson>;
        }

        [Test]
        public void GetNullTest()
        {
            Assert.Catch<ArgumentNullException>(() => salespersonController.GetSalesPerson(null));
        }

        [Test]
        public void GetSalesPersonsTest()
        {
            OkNegotiatedContentResult<List<SalesPerson>> message = salespersonController.GetSalesPersons() as OkNegotiatedContentResult<List<SalesPerson>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (salespersonController != null)
                    {
                        if (salespersonController.Request != null)
                        {
                            salespersonController.Request.Dispose();
                        }

                        if (salespersonController.Configuration != null)
                        {
                            salespersonController.Configuration.Dispose();
                        }

                        salespersonController.Dispose();
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
