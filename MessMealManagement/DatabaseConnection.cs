using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessMealManagement
{
    internal class DatabaseConnection
    {
        private string connectionString =
           @"Data Source=.\SQLEXPRESS;Initial Catalog=MessMealManagement;Integrated Security=True;TrustServerCertificate=True";

        public SqlConnection GetConnection()
        {
            return new SqlConnection(connectionString);
        }
    }
}
