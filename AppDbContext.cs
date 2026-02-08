using Microsoft.EntityFrameworkCore;
using EmployeeApp.Backend.Models;

namespace EmployeeApp.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
    }
}

