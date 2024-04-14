using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("PURCHASES")]
    public class Purchase
    {
        public Purchase()
        {
            PurchaseDate = DateTime.UtcNow;
        }

        [Column("ID")]
        public int Id { get; set; }

        [Column("PURCHASE_DATE")]
        public DateTime PurchaseDate { get; set; }

        public Suplyer Suplyer { get; set; }

        public ICollection<PurchaseItem> PurchaseItens { get; set; }
    }
}
