using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("TRANSACTION_PURCHASE_OPERATIONS")]
    public class TransactionPurchaseOperation
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Required]
        [Column("OperationType")]
        public OperationType OperationType { get; set; } 

        [Required]
        [Column("OperationDate")]
        public DateTime OperationDate { get; set; }

        [Column("StockItemIds")]
        public int[] StockItemIds { get; set; }

        public Purchase Purchase { get; set; }

    }
}
