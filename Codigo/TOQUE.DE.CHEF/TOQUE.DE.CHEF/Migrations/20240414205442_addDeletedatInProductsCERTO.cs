using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class addDeletedatInProductsCERTO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DeletedAt",
                table: "PRODUCTS",
                newName: "DELETED_AT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DELETED_AT",
                table: "PRODUCTS",
                newName: "DeletedAt");
        }
    }
}
