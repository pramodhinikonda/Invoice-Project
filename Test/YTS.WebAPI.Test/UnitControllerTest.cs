using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class UnitControllerTest
    {
        private readonly UnitController unitController;
        private bool disposed = false;

        public UnitControllerTest()
        {
            unitController = new UnitController
            {
                Request = new System.Net.Http.HttpRequestMessage(),
                Configuration = new System.Web.Http.HttpConfiguration()
            };
            unitController.Request.Headers.Add("User", "eyJDbGllbnRJRCI6IjY2YzYxN2Q4LWIxNWItNDEwZi1iZWU5LWQ1MzhhZmMwMDhkNSIsIlVzZXJJRCI6ImNlNGRjM2Y3LTc5MmItNDEzYi04ZThkLWM1NTk1OWUyZTJhMSIsIk9yZ2FuaXphdGlvbklEIjoiNDJiNzRkYmYtNGNjOC00NjZkLWI1YmYtMmJkNGQ4YTNkMDBmIn0=");
        }

        [Test]
        public void GetTest()
        {
            OkNegotiatedContentResult<Unit> message = unitController.GetUnit("Test") as OkNegotiatedContentResult<Unit>;
            Assert.IsTrue(message.Content.Name == "Test");
        }

        [Test]
        public void SaveTest()
        {
            OkNegotiatedContentResult<Unit> message = unitController.Save(new Unit
            {
                IsDeleted = false,
                Name = "Sample",
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Type = UnitType.KGS,
                UnitID = Guid.Empty
            }) as OkNegotiatedContentResult<Unit>;

            Assert.IsTrue(message.Content.Name == "Sample" && message.Content.UnitID != Guid.Empty);

            message = unitController.Save(new Unit
            {
                IsDeleted = true,
                Name = "Sample",
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Type = UnitType.KGS,
                UnitID = message.Content.UnitID
            }) as OkNegotiatedContentResult<Unit>;
        }

        [Test]
        public void GetNullTest()
        {
            Assert.Catch<ArgumentNullException>(() => unitController.GetUnit(null));
        }

        [Test]
        public void GetUnitsTest()
        {
            OkNegotiatedContentResult<List<Unit>> message = unitController.GetUnits() as OkNegotiatedContentResult<List<Unit>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (unitController != null)
                    {
                        if (unitController.Request != null)
                        {
                            unitController.Request.Dispose();
                        }

                        if (unitController.Configuration != null)
                        {
                            unitController.Configuration.Dispose();
                        }

                        unitController.Dispose();
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
