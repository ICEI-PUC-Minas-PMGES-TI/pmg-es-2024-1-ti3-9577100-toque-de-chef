using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class renomeiaSuplyer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PURCHASES_SUPPLIERS_SuplyerId",
                table: "PURCHASES");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SUPPLIERS",
                table: "SUPPLIERS");

            migrationBuilder.RenameTable(
                name: "SUPPLIERS",
                newName: "SUPLyERS");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SUPLyERS",
                table: "SUPLyERS",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PURCHASES_SUPLyERS_SuplyerId",
                table: "PURCHASES",
                column: "SuplyerId",
                principalTable: "SUPLyERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PURCHASES_SUPLyERS_SuplyerId",
                table: "PURCHASES");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SUPLyERS",
                table: "SUPLyERS");

            migrationBuilder.RenameTable(
                name: "SUPLyERS",
                newName: "SUPPLIERS");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SUPPLIERS",
                table: "SUPPLIERS",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PURCHASES_SUPPLIERS_SuplyerId",
                table: "PURCHASES",
                column: "SuplyerId",
                principalTable: "SUPPLIERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
