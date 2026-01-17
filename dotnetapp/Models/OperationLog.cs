using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class OperationLog
    {
        [Key]
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string OperationType { get; set; }
        public string ChangedData { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
    }
}