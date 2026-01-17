using System;
using System.Collections.Generic;
using System.Linq;
using dotnetapp.Data;
using dotnetapp.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class BookService
    {
        public readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book> GetBookById(int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if(book != null)
            {
                return book;
            }
            throw new BookException("Book not found");
        }

        public async Task<bool> AddBook(Book book)
        {
            var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title);
            if(existingBook != null)
            {
                throw new BookException("Book already exists");
            }
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateBook(int bookId, Book book)
        {
            var existingBook = await _context.Books.FindAsync(bookId);
            if(existingBook == null)
            {
                return false;
            }
            var duplicateBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title && b.BookId != bookId);
            if(duplicateBook != null)
            {
                throw new BookException("Book with same title already exists");
            }
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Genre = book.Genre;
            existingBook.PublishedDate = book.PublishedDate;
            existingBook.CoverImage = book.CoverImage;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteBook(int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if(book == null)
            {
                return false;
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}