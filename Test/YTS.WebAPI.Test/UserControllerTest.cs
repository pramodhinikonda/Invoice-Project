using NUnit.Framework;
using System.Web.Http.Results;
using YTS.BusinessObject;
using YTS.WebAPI.Core.Controllers;

namespace YTS.WebAPI.Test
{
    [TestFixture]
    public class UserControllerTest
    {
        [Test]
        public void GetTest()
        {
            using (UserController userController = new UserController())
            {
                OkNegotiatedContentResult<User> message = userController.GetByEmail("vivekchandran555@gmail.com") as OkNegotiatedContentResult<User>;
                Assert.IsNotNull(message.Content);
                Assert.AreEqual(message.Content.Email, "vivekchandran555@gmail.com");
            }
        }
    }
}
