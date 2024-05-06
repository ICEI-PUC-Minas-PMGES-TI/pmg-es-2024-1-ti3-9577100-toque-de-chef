using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class qtdStockProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "STOCK",
                table: "PRODUCTS",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "STOCK",
                table: "PRODUCTS");
        }
    }
}
