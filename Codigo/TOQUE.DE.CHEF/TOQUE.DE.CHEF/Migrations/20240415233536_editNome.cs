using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class editNome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PURCHASES_SUPLyERS_SuplyerId",
                table: "PURCHASES");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SUPLyERS",
                table: "SUPLyERS");

            migrationBuilder.RenameTable(
                name: "SUPLyERS",
                newName: "SUPLYERS");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SUPLYERS",
                table: "SUPLYERS",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PURCHASES_SUPLYERS_SuplyerId",
                table: "PURCHASES",
                column: "SuplyerId",
                principalTable: "SUPLYERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PURCHASES_SUPLYERS_SuplyerId",
                table: "PURCHASES");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SUPLYERS",
                table: "SUPLYERS");

            migrationBuilder.RenameTable(
                name: "SUPLYERS",
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
    }
}
