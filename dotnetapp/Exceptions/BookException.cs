using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Exceptions
{
    public class BookException : Exception
    {
        public BookException(string message) :base(message){
            
        }
    }
}