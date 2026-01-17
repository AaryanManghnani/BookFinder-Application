using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class LoggerService
    {
        public readonly ApplicationDbContext _context;
        public readonly IHttpContextAccessor _httpContextAccessor;
        public LoggerService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task LogErrorAsync(Exception ex)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var log = new ErrorLog
            {
                Timestamp = DateTime.UtcNow,
                ExceptionType = ex.GetType().Name,
                Message = ex.Message,
                StackTrace = ex.StackTrace,
                RequestPath = httpContext?.Request?.Path ?? "Unknown",
                RequestMethod = httpContext?.Request?.Method ?? "Unknown"
            };
            try
            {
                await _context.ErrorLogs.AddAsync(log);
                await _context.SaveChangesAsync();
            }
            catch(Exception logEx)
            {
                Console.WriteLine($"Critical: Failed to log exception to database. Error: {logEx.Message}");
            }
        }
        public async Task LogOperationAsync(string operationType, object changedData)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var user = httpContext?.User;
            var email = user?.Claims.FirstOrDefault(c => c.Type == "Email")?.Value ?? "Unknown";
            var username = user?.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Name)?.Value ?? "Unknown";
            var log = new OperationLog
            {
                Timestamp = DateTime.UtcNow,
                OperationType = operationType,
                ChangedData = JsonSerializer.Serialize(changedData),
                Email = email,
                Username = username,
            };
            try
            {
                await _context.OperationLogs.AddAsync(log);
                await _context.SaveChangesAsync();
            }
            catch(Exception logEx)
            {
                Console.WriteLine($"Critical: Failed to log operation to database. Error: {logEx.Message}");
            }
        }
    }
}