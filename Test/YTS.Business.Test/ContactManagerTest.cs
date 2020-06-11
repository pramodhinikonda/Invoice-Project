using NUnit.Framework;
using System;
using YTS.BusinessObject;

namespace YTS.Business.Test
{
    [TestFixture]
    public class ContactManagerTest
    {
        [TestCase]
        public void GetContactTest()
        {
            ContactManager contactManager = new ContactManager(Guid.NewGuid(), Guid.NewGuid());
            Contact contact = contactManager.GetContact("Test");
            Assert.IsNotNull(contact);
            Assert.IsTrue(contact.Name == "Test");
        }

        [TestCase]
        public void GetNullContactTest()
        {
            ContactManager contactManager = new ContactManager(Guid.Empty, Guid.Empty);
            Assert.Catch<ArgumentNullException>(() => contactManager.GetContact(null));
        }
    }
}
