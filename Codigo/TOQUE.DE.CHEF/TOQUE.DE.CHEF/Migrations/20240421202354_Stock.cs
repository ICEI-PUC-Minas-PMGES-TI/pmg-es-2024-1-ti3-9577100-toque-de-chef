using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class Stock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StockId",
                table: "TRANSACTION_STOCK_OPERATIONS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "STOCKS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    QUANTITY = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_STOCKS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_STOCKS_PRODUCTS_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCTS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TRANSACTION_STOCK_OPERATIONS_StockId",
                table: "TRANSACTION_STOCK_OPERATIONS",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_STOCKS_ProductId",
                table: "STOCKS",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_STOCK_OPERATIONS_STOCKS_StockId",
                table: "TRANSACTION_STOCK_OPERATIONS",
                column: "StockId",
                principalTable: "STOCKS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_STOCK_OPERATIONS_STOCKS_StockId",
                table: "TRANSACTION_STOCK_OPERATIONS");

            migrationBuilder.DropTable(
                name: "STOCKS");

            migrationBuilder.DropIndex(
                name: "IX_TRANSACTION_STOCK_OPERATIONS_StockId",
                table: "TRANSACTION_STOCK_OPERATIONS");

            migrationBuilder.DropColumn(
                name: "StockId",
                table: "TRANSACTION_STOCK_OPERATIONS");
        }
    }
}
