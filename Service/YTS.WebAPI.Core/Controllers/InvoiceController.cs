using System.Web.Http;
using YTS.Business;

namespace YTS.WebAPI.Core.Controllers
{
    public class InvoiceController : BaseController
    {
        private readonly InvoiceManager invoiceManager;

        public InvoiceController()
        {
            invoiceManager = new InvoiceManager(UserInfo.ClientID, UserInfo.OrganizationID);
        }

        public IHttpActionResult GetInvoices()
        {
            return Ok(invoiceManager.GetInvoices());
        }
    }
}