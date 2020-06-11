using System;
using System.Web.Http;
using YTS.Business;
using YTS.BusinessObject;

namespace YTS.WebAPI.Core.Controllers
{
    public class ItemController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetItem(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null.");
            }

            using (ItemManager itemManager = new ItemManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(itemManager.GetItem(name));
            }
        }

        [HttpGet]
        public IHttpActionResult GetItems()
        {
            using (ItemManager itemManager = new ItemManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(itemManager.GetItems());
            }
        }

        [HttpPost]
        public IHttpActionResult Save(Item item)
        {
            if (item == null)
            {
                throw new ArgumentNullException($"{nameof(item)} is null.");
            }

            using (ItemManager itemManager = new ItemManager(UserInfo.ClientID, UserInfo.UserID))
            {
                return Ok(itemManager.Save(item));
            }
        }
    }
}
