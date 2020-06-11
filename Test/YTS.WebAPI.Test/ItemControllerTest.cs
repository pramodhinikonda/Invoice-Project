using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class ItemControllerTest
    {
        private readonly ItemController itemController;
        private bool disposed = false;

        public ItemControllerTest()
        {
            itemController = new ItemController
            {
                Request = new System.Net.Http.HttpRequestMessage(),
                Configuration = new System.Web.Http.HttpConfiguration()
            };
            itemController.Request.Headers.Add("User", "eyJDbGllbnRJZCI6NDAsIkNsaWVudE5hbWUiOiJGb3JlIFJlc2VhcmNoIiwiQ2xpZW50U2hvcnRDb2RlIjoiRlJTSCJ9");
        }

        [Test]
        public void GetTest()
        {
            OkNegotiatedContentResult<Item> message = itemController.GetItem("Test") as OkNegotiatedContentResult<Item>;
            Assert.IsTrue(message.Content.Name == "Test");
        }

        [Test]
        public void SaveTest()
        {
            OkNegotiatedContentResult<Item> message = itemController.Save(new Item
            {
                IsDeleted = false,                
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                UnitID = Guid.Parse("415ADD7E-7DD7-4A42-A7A3-00B25E21F635"),
                Code = "001",
                Name = "Sample item",
                Description = "",
                Type = 1,
                SellingRate = 100.50M,
                HsnSac = "",
                IsTaxable = true,
                GST = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                ItemID = Guid.Empty
            }) as OkNegotiatedContentResult<Item>;

            Assert.IsTrue(message.Content.Name == "Sample item" && message.Content.ItemID != Guid.Empty);

            message = itemController.Save(new Item
            {
                IsDeleted = true,               
                OrganizationID = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                UnitID = Guid.Parse("415ADD7E-7DD7-4A42-A7A3-00B25E21F635"),
                Code = "001",
                Name = "Sample item",
                Description = "",
                Type = 1,
                SellingRate = 100.50M,
                HsnSac = "",
                IsTaxable = true,
                GST = Guid.Parse("FAC2B632-AA44-4F54-B495-41CF6B3DD05A"),
                ItemID = message.Content.ItemID
            }) as OkNegotiatedContentResult<Item>;
        }

        [Test]
        public void GetNullTest()
        {
            Assert.Catch<ArgumentNullException>(() => itemController.GetItem(null));
        }

        [Test]
        public void GetItemsTest()
        {
            OkNegotiatedContentResult<List<Item>> message = itemController.GetItems() as OkNegotiatedContentResult<List<Item>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (itemController != null)
                    {
                        if (itemController.Request != null)
                        {
                            itemController.Request.Dispose();
                        }

                        if (itemController.Configuration != null)
                        {
                            itemController.Configuration.Dispose();
                        }

                        itemController.Dispose();
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
