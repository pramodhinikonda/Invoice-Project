using System;
using System.Web.Http;
using YTS.Business;
using YTS.BusinessObject;


namespace YTS.WebAPI.Core.Controllers
{
    public class ContactController : BaseController
    {
        [HttpGet]
        public IHttpActionResult GetContact(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null.");
            }

            using (ContactManager contactManager = new ContactManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(contactManager.GetContact(name));
            }
        }

        [HttpGet]
        public IHttpActionResult GetContacts()
        {
            using (ContactManager contactManager = new ContactManager(UserInfo.ClientID, UserInfo.OrganizationID))
            {
                return Ok(contactManager.GetContacts());
            }
        }

        [HttpPost]
        public IHttpActionResult Save(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException($"{nameof(contact)} is null.");
            }

            using (ContactManager contactManager = new ContactManager(UserInfo.ClientID, UserInfo.UserID))
            {
                return Ok(contactManager.Save(contact));
            }
        }
    }
}
