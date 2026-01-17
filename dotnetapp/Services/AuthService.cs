using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using dotnetapp.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        public readonly ApplicationDbContext _context;
        public readonly IConfiguration _configuration;
        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var emailExists = await _context.Users.AnyAsync(u => u.Email == model.Email);
            if(emailExists)
            {
                return (0, "Email already registered");
            }
            var usernameExists = await _context.Users.AnyAsync(u => u.Username == model.Username);
            if(usernameExists)
            {
                return (0, "Username already taken");
            }
            var passwordHasher = new PasswordHasher<User>();
            model.Password = passwordHasher.HashPassword(model, model.Password);
            model.UserRole = role;
            _context.Users.Add(model);
            await _context.SaveChangesAsync();
            return (1, "Registration successful");
        }

        public async Task<(int, object)> Login(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if(user == null)
            {
                return (0, "Invalid email");
            }
            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, model.Password);
            if(result == PasswordVerificationResult.Failed)
            {
                return (0, "Invalid password");
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.UserRole),
                new Claim("Email", user.Email)
            };
            string Token = GenerateToken(claims);
            return (1, new { Status = "Success", token = Token, Role = user.UserRole , Email = user.Email, username = user.Username });
        }
        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}