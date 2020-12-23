﻿using BaseAPI.Helpers;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BaseAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserRepository _userRepository;
        private readonly AppSettings _appSettings;

        public UsersController(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateRequest model)
        {
            var response = _userRepository.Authenticate(model, _appSettings.Secret);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("Register")]
        public IActionResult Register([FromBody]User user)
        {
            _userRepository.Add(user);
            return Ok("Success");
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var users = _userRepository.GetAll();
            return Ok(users);
        }
    }
}