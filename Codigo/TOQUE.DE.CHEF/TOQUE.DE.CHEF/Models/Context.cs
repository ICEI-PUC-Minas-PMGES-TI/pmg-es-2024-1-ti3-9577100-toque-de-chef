using Microsoft.EntityFrameworkCore;

namespace TOQUE.DE.CHEF.Models
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options):base(options) {
        
        }

        public DbSet<User> users { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Suplyer> suplyers { get; set; }
        public DbSet<Purchase> purchases { get; set; }
        public DbSet<PurchaseItem> purchaseItems { get; set; }
        public DbSet<TransactionStockOperation> transactionStockOperations { get; set; }

    }
}
