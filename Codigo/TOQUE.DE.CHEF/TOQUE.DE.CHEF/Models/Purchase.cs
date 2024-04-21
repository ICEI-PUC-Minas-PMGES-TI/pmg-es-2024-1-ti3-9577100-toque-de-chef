using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("PURCHASES")]
    public class Purchase
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Chave primária e coluna de identidade
        [Column("ID")]
        public int Id { get; set; }

        [Column("PURCHASE_DATE")]
        public DateTime PurchaseDate { get; set; }

        [ForeignKey("Suplyer")]
        public int SuplyerId { get; set; }

        public Suplyer Suplyer { get; set; }

        public ICollection<PurchaseItem> PurchaseItems { get; set; }
    }
}
