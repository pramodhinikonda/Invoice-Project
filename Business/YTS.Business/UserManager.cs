using System;
using YTS.BusinessObject;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
    public class UserManager : IDisposable
    {
        private IUserRepository userRepository;
        private bool disposed = false;

        public UserManager()
        {
            userRepository = new UserRepository(new MetadataConnectionProvider());
        }

        public User GetUser(string email)
        {
            Data.Models.User user = userRepository.GetUser(email);
            if (user == null)
            {
                return null;
            }

            return new User
            {
                ClientID = user.ClientID,
                Email = user.Email,
                Mobile = user.Mobile,
                Name = user.Name,
                UserID = user.UserID
            };
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    userRepository.Dispose();
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
