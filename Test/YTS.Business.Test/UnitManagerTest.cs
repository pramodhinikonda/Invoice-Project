using NUnit.Framework;
using System;
using YTS.BusinessObject;

namespace YTS.Business.Test
{
    [TestFixture]
    public class UnitManagerTest
    {
        [TestCase]
        public void GetUnitTest()
        {
            UnitManager unitManager = new UnitManager(Guid.NewGuid(), Guid.NewGuid());
            Unit unit = unitManager.GetUnit("Test");
            Assert.IsNotNull(unit);
            Assert.IsTrue(unit.Name == "Test");
        }

        [TestCase]
        public void GetNullUnitTest()
        {
            UnitManager unitManager = new UnitManager(Guid.Empty, Guid.Empty);
            Assert.Catch<ArgumentNullException>(() => unitManager.GetUnit(null));
        }
    }
}
