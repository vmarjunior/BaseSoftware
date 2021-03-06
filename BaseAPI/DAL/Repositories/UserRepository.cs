﻿using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace DAL.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        //TEST LIST
        private List<User> _users = new List<User>
        {
            new User { 
                Id = 1, 
                FirstName = "Test", 
                LastName = "User", 
                Username = "test", 
                Password = "test", 
                Email = "test@test.com" 
            }
        };

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string secret)
        {
            var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = GenerateJwtToken(user, secret);

            return new AuthenticateResponse(user, token);
        }

        override
        public User Get(int id)
        {
            return _users.SingleOrDefault(x => x.Id == id);
        }

        private string GenerateJwtToken(User user, string secret)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public User RecoverAccountByEmail(string email)
        {
            email = email.ToLower().Trim();
            var user = _users.FirstOrDefault(x => x.Email == email);

            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
                stringChars[i] = chars[random.Next(chars.Length)];
            
            var finalString = new String(stringChars);

            user.Password = finalString;
            Update(user);
            
            return user;
        }
    }
}
