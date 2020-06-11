using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class OrganizationControllerTest
    {
        [Test]
        public void TestMethod1()
        {
            OrganizationController organizationController = new OrganizationController();
            OkNegotiatedContentResult<List<Organization>> message = organizationController.GetOrganizations(Guid.Parse("")) as OkNegotiatedContentResult<List<Organization>>;
            Assert.IsTrue(message.Content != null && message.Content.Count > 0);
        }
    }
}
