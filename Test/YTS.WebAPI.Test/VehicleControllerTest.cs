using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class VehicleControllerTest
    {
        private readonly VehicleController vehicleController;
        private bool disposed = false;

        public VehicleControllerTest()
        {
            vehicleController = new VehicleController
            {
                Request = new System.Net.Http.HttpRequestMessage(),
                Configuration = new System.Web.Http.HttpConfiguration()
            };
            vehicleController.Request.Headers.Add("User", "eyJDbGllbnRJRCI6IjY2YzYxN2Q4LWIxNWItNDEwZi1iZWU5LWQ1MzhhZmMwMDhkNSIsIlVzZXJJRCI6ImNlNGRjM2Y3LTc5MmItNDEzYi04ZThkLWM1NTk1OWUyZTJhMSIsIk9yZ2FuaXphdGlvbklEIjoiNDJiNzRkYmYtNGNjOC00NjZkLWI1YmYtMmJkNGQ4YTNkMDBmIn0=");
        }

        [Test]
        public void GetTest()
        {
            OkNegotiatedContentResult<Vehicle> message = vehicleController.GetVehicle("Test") as OkNegotiatedContentResult<Vehicle>;
            Assert.IsTrue(message.Content.Name == "Test");
        }

        [Test]
        public void SaveTest()
        {
            OkNegotiatedContentResult<Vehicle> message = vehicleController.Save(new Vehicle
            {
                IsDeleted = false,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                RegistrationNumber = "TN88Z8910",
                RPM = 0.00M,
                VehicleID = Guid.Empty
            }) as OkNegotiatedContentResult<Vehicle>;

            Assert.IsTrue(message.Content.Name == "Sample" && message.Content.VehicleID != Guid.Empty);

            message = vehicleController.Save(new Vehicle
            {
                IsDeleted = true,
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                Name = "Sample",
                RegistrationNumber = "TN88Z8910",
                RPM = 0.00M,
                VehicleID = message.Content.VehicleID
            }) as OkNegotiatedContentResult<Vehicle>;
        }

        [Test]
        public void GetNullTest()
        {
            Assert.Catch<ArgumentNullException>(() => vehicleController.GetVehicle(null));
        }

        [Test]
        public void GetVehiclesTest()
        {
            OkNegotiatedContentResult<List<Vehicle>> message = vehicleController.GetVehicles() as OkNegotiatedContentResult<List<Vehicle>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (vehicleController != null)
                    {
                        if (vehicleController.Request != null)
                        {
                            vehicleController.Request.Dispose();
                        }

                        if (vehicleController.Configuration != null)
                        {
                            vehicleController.Configuration.Dispose();
                        }

                        vehicleController.Dispose();
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
