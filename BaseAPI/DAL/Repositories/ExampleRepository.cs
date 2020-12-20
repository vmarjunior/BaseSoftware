using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.Repositories
{
    public class ExampleRepository : Repository<Example>, IExampleRepository
    {
        public ExampleRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Example> GetExampleByIdGreaterThanFilter(int filter)
        {
            return _appContext.Example
                .Where(x => x.Id > filter)
                .OrderBy(c => c.Name)
                .ToList();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
