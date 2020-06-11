using YTS.Data.Models;

namespace YTS.Data
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUser(string email);
    }
}
