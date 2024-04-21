using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("TRANSACTION_STOCK_OPERATIONS")]
    public class TransactionStockOperation
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Required]
        [Column("OperationType")]
        public string OperationType { get; set; } 

        [Required]
        [Column("OperationDate")]
        public DateTime OperationDate { get; set; } 

  
        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public User User { get; set; }

        public Stock Stock { get; set; }

    }
}
