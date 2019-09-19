using System;
using System.Data;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc.Filters;


namespace Onlib
{
    public class TransactionFilter : IAsyncActionFilter
    {
        private TransactionScope _transaction;
        private IDbConnection _connection;
        public TransactionFilter(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context,
            ActionExecutionDelegate next)
        {
            ActionExecutedContext resultContext;
            _transaction = new TransactionScope();
            _connection.Open();
            try
            {
                resultContext = await next();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                _connection.Close();
                _transaction.Dispose();
                return;
            }

            if (resultContext.Exception != null)
            {
                _connection.Close();
                _transaction.Dispose();
                return;
            }
            _connection.Close();
            _transaction.Complete();
            _transaction.Dispose();
        }
    }
}