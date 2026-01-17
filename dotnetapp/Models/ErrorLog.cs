using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ErrorLog
    {
        [Key]
        public int Id{get; set; }
        public DateTime Timestamp{ get; set; }
        public string ExceptionType{ get; set; }
        public string Message{ get; set; }
        public string StackTrace{ get; set; }
        public string RequestPath{ get; set; }
        public string RequestMethod{ get; set; }
    }
}