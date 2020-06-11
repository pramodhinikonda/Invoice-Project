using System.Data;

namespace YTS.Data
{
    public interface IConnectionProvider
    {
        IDbConnection GetConnection();
    }
}
