using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _service;
        private readonly LoggerService _logger;
        public BookController(BookService service, LoggerService logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = UserRoles.BookRecommender + ", " + UserRoles.BookReader)]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            try
            {
                var books = await _service.GetAllBooks();
                return Ok(books);
            }
            catch(Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{bookId}")]
        [Authorize(Roles = UserRoles.BookRecommender + ", " + UserRoles.BookReader)]
        public async Task<ActionResult<Book>> GetBookById(int bookId)
        {
            try
            {
                var book = await _service.GetBookById(bookId);
                return Ok(book);
            }
            catch(BookException ex)
            {
                await _logger.LogErrorAsync(ex);
                return NotFound(ex.Message);
            }
            catch(Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.BookRecommender)]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new {message="Validation Failed", errors = ModelState});
            }
            try
            {
                await _service.AddBook(book);
                await _logger.LogOperationAsync("Add", book);
                return CreatedAtAction(nameof(GetBookById), new { bookId = book.BookId }, book);
            }
            catch (BookException ex)
            {
                await _logger.LogErrorAsync(ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{bookId}")]
        [Authorize(Roles = UserRoles.BookRecommender)]
        public async Task<IActionResult> UpdateBook(int bookId, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updated = await _service.UpdateBook(bookId, book);
                if (!updated)
                {
                    return NotFound("Book not found");
                }
                await _logger.LogOperationAsync("Update", book);
                return Ok("Book updated successfully.");
            }
            catch (Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{bookId}")]
        [Authorize(Roles = UserRoles.BookRecommender)]
        public async Task<IActionResult> DeleteBook(int bookId)
        {
            try
            {
                var deleted = await _service.DeleteBook(bookId);
                if (!deleted)
                {
                    return NotFound("Book not found");
                }
                await _logger.LogOperationAsync("Delete", new Book { BookId = bookId });
                return Ok("Book deleted successfully.");
            }
            catch (Exception ex)
            {
                await _logger.LogErrorAsync(ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}