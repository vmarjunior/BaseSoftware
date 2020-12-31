using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string secret);
        User RecoverAccountByEmail(string email);
    }
}
