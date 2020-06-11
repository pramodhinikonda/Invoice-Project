using NUnit.Framework;
using System;
using YTS.BusinessObject;

namespace YTS.Business.Test
{
    [TestFixture]
    public class SalesPersonManagerTest
    {
        [TestCase]
        public void GetSalesPersonTest()
        {
            SalesPersonManager salespersonManager = new SalesPersonManager(Guid.NewGuid(), Guid.NewGuid());
            SalesPerson salesperson = salespersonManager.GetSalesPerson("Test");
            Assert.IsNotNull(salesperson);
            Assert.IsTrue(salesperson.Name == "Test");
        }

        [TestCase]
        public void GetNullSalesPersonTest()
        {
            SalesPersonManager salespersonManager = new SalesPersonManager(Guid.Empty, Guid.Empty);
            Assert.Catch<ArgumentNullException>(() => salespersonManager.GetSalesPerson(null));
        }
    }
}
