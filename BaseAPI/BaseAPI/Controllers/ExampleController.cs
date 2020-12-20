using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BaseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        private readonly IExampleRepository _exampleRepository;


        public ExampleController(IExampleRepository exampleRepository)
        {
            _exampleRepository = exampleRepository;
        }

        [HttpGet]
        public IEnumerable<Example> Get()
        {
            return _exampleRepository.GetAll();
        }

        [HttpGet("{id}")]
        public Example Get(int id)
        {
            return _exampleRepository.Get(id);
        }

        [HttpPost]
        public void Post([FromBody]Example model)
        {
            _exampleRepository.Add(model);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Example model)
        {
            _exampleRepository.Update(model);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _exampleRepository.Remove(
                _exampleRepository.Get(id)
            );
        }
    }
}
