using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class TabelasUserPurchaseCategoryT : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "PRODUCTS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "PURCHASES",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PURCHASE_DATE = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SUPPLIER_ID = table.Column<int>(type: "int", nullable: false),
                    SuplyerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PURCHASES", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PURCHASES_SUPPLIERS_SuplyerId",
                        column: x => x.SuplyerId,
                        principalTable: "SUPPLIERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionPurchaseOperations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OperationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionPurchaseOperations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TransactionPurchaseOperations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionStockOperations",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OperationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionStockOperations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TransactionStockOperations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTS_CategoryId",
                table: "PRODUCTS",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PURCHASES_SuplyerId",
                table: "PURCHASES",
                column: "SuplyerId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionPurchaseOperations_UserId",
                table: "TransactionPurchaseOperations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionStockOperations_UserId",
                table: "TransactionStockOperations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_PRODUCTS_CATEGORIES_CategoryId",
                table: "PRODUCTS",
                column: "CategoryId",
                principalTable: "CATEGORIES",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PRODUCTS_CATEGORIES_CategoryId",
                table: "PRODUCTS");

            migrationBuilder.DropTable(
                name: "PURCHASES");

            migrationBuilder.DropTable(
                name: "TransactionPurchaseOperations");

            migrationBuilder.DropTable(
                name: "TransactionStockOperations");

            migrationBuilder.DropIndex(
                name: "IX_PRODUCTS_CategoryId",
                table: "PRODUCTS");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "PRODUCTS");
        }
    }
}
