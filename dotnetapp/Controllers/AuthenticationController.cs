using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly LoggerService _logger;
        public AuthenticationController(IAuthService authService, LoggerService logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }
            try
            {
                var (status, message) = await _authService.Registration(model, model.UserRole);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return StatusCode(201, message);
            }
            catch(Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }
            try
            {
                var (status, result) = await _authService.Login(model);
                if (status == 0)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch(Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}