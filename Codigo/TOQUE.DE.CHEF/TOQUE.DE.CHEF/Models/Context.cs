using Microsoft.EntityFrameworkCore;

namespace TOQUE.DE.CHEF.Models
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options):base(options) {
        
        }

        public DbSet<Category> categories { get; set; }
        public DbSet<Suplyer>  suppliers { get; set; }
        public DbSet<User> users { get; set; }
    }
}
