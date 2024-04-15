using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class addDeletedatInCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropColumn(
                name: "SUPPLIER_ID",
                table: "PURCHASES");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "OperationType",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StockItemIds",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DELETED_AT",
                table: "CATEGORIES",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PURCHASE_ITENS",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QUANTITY = table.Column<int>(type: "int", nullable: false),
                    UNIT_PRICE = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    PurchaseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PURCHASE_ITENS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PURCHASE_ITENS_PRODUCTS_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCTS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PURCHASE_ITENS_PURCHASES_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "PURCHASES",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TRANSACTION_PURCHASE_OPERATIONS_PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_PURCHASE_ITENS_ProductId",
                table: "PURCHASE_ITENS",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PURCHASE_ITENS_PurchaseId",
                table: "PURCHASE_ITENS",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_PURCHASES_PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "PurchaseId",
                principalTable: "PURCHASES",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "UserId",
                principalTable: "USERS",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_PURCHASES_PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropTable(
                name: "PURCHASE_ITENS");

            migrationBuilder.DropIndex(
                name: "IX_TRANSACTION_PURCHASE_OPERATIONS_PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropColumn(
                name: "PurchaseId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropColumn(
                name: "StockItemIds",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropColumn(
                name: "DELETED_AT",
                table: "CATEGORIES");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OperationType",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SUPPLIER_ID",
                table: "PURCHASES",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "UserId",
                principalTable: "USERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
