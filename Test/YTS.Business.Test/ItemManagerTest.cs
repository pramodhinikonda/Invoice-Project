using NUnit.Framework;
using System;
using YTS.BusinessObject;

namespace YTS.Business.Test
{
    [TestFixture]
    public class ItemManagerTest
    {
        [TestCase]
        public void GetItemTest()
        {
            ItemManager itemManager = new ItemManager(Guid.NewGuid(), Guid.NewGuid());
            Item item = itemManager.GetItem("Test");
            Assert.IsNotNull(item);
            Assert.IsTrue(item.Name == "Test");
        }

        [TestCase]
        public void GetNullItemTest()
        {
            ItemManager itemManager = new ItemManager(Guid.Empty, Guid.Empty);
            Assert.Catch<ArgumentNullException>(() => itemManager.GetItem(null));
        }
    }
}
