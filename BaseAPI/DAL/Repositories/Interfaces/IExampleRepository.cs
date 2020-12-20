using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{
    public interface IExampleRepository : IRepository<Example>
    {
        IEnumerable<Example> GetExampleByIdGreaterThanFilter(int filter);
    }
}
