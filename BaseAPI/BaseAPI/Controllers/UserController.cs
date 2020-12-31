using BaseAPI.Helpers;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

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

        [HttpPost("Register")]
        public IActionResult Register([FromBody]User user)
        {
            _userRepository.Add(user);
            return Ok("Success");
        }

        [HttpGet("RecoverAccount")]
        public IActionResult RecoverAccount([FromBody]string email)
        {
            var user = _userRepository.RecoverAccountByEmail(email);

            if (user != null)
            {
                //Smtp find user
                SMTPMailHelper mail = new SMTPMailHelper();
                mail.SendMail(
                    new List<string>() { user.Email },
                    "Account Recover", 
                    "You are receiving this e-mail because you requested a new password. Your new password is as follows: " + user.Password + ".", 
                    null, 
                    null);

                return Ok("Your new login information was sent to your e-mail.");
            }
            else
                return StatusCode(500, "User not found.");
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