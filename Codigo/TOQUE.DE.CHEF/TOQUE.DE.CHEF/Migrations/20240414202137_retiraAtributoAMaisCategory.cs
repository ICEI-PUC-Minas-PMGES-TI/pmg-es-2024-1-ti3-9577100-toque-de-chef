using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class retiraAtributoAMaisCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CATEGORY_ID",
                table: "PRODUCTS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CATEGORY_ID",
                table: "PRODUCTS",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
