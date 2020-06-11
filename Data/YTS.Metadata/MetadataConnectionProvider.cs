using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using YTS.Data;

namespace YTS.Metadata
{
    public class MetadataConnectionProvider : IConnectionProvider
    {
        public IDbConnection GetConnection()
        {
            return new SqlConnection(ConfigurationManager.ConnectionStrings["Metadata"].ConnectionString);
        }
    }
}
