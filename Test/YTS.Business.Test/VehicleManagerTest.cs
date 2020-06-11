using NUnit.Framework;
using System;
using YTS.BusinessObject;

namespace YTS.Business.Test
{
    [TestFixture]
    public class VehicleManagerTest
    {
        [TestCase]
        public void GetVehicleTest()
        {
            VehicleManager vehicleManager = new VehicleManager(Guid.NewGuid(), Guid.NewGuid());
            Vehicle vehicle = vehicleManager.GetVehicle("Test");
            Assert.IsNotNull(vehicle);
            Assert.IsTrue(vehicle.Name == "Test");
        }

        [TestCase]
        public void GetNullVehicleTest()
        {
            VehicleManager vehicleManager = new VehicleManager(Guid.Empty, Guid.Empty);
            Assert.Catch<ArgumentNullException>(() => vehicleManager.GetVehicle(null));
        }
    }
}
