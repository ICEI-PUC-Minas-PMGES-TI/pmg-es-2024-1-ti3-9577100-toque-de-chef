using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    /// <inheritdoc />
    public partial class alteraNomesParaMaiusculos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionPurchaseOperations_Users_UserId",
                table: "TransactionPurchaseOperations");

            migrationBuilder.DropForeignKey(
                name: "FK_TransactionStockOperations_Users_UserId",
                table: "TransactionStockOperations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransactionStockOperations",
                table: "TransactionStockOperations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransactionPurchaseOperations",
                table: "TransactionPurchaseOperations");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "USERS");

            migrationBuilder.RenameTable(
                name: "TransactionStockOperations",
                newName: "TRANSACTION_STOCK_OPERATIONS");

            migrationBuilder.RenameTable(
                name: "TransactionPurchaseOperations",
                newName: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.RenameIndex(
                name: "IX_TransactionStockOperations_UserId",
                table: "TRANSACTION_STOCK_OPERATIONS",
                newName: "IX_TRANSACTION_STOCK_OPERATIONS_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TransactionPurchaseOperations_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                newName: "IX_TRANSACTION_PURCHASE_OPERATIONS_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_USERS",
                table: "USERS",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TRANSACTION_STOCK_OPERATIONS",
                table: "TRANSACTION_STOCK_OPERATIONS",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TRANSACTION_PURCHASE_OPERATIONS",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS",
                column: "UserId",
                principalTable: "USERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TRANSACTION_STOCK_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_STOCK_OPERATIONS",
                column: "UserId",
                principalTable: "USERS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_PURCHASE_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.DropForeignKey(
                name: "FK_TRANSACTION_STOCK_OPERATIONS_USERS_UserId",
                table: "TRANSACTION_STOCK_OPERATIONS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_USERS",
                table: "USERS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TRANSACTION_STOCK_OPERATIONS",
                table: "TRANSACTION_STOCK_OPERATIONS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TRANSACTION_PURCHASE_OPERATIONS",
                table: "TRANSACTION_PURCHASE_OPERATIONS");

            migrationBuilder.RenameTable(
                name: "USERS",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "TRANSACTION_STOCK_OPERATIONS",
                newName: "TransactionStockOperations");

            migrationBuilder.RenameTable(
                name: "TRANSACTION_PURCHASE_OPERATIONS",
                newName: "TransactionPurchaseOperations");

            migrationBuilder.RenameIndex(
                name: "IX_TRANSACTION_STOCK_OPERATIONS_UserId",
                table: "TransactionStockOperations",
                newName: "IX_TransactionStockOperations_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TRANSACTION_PURCHASE_OPERATIONS_UserId",
                table: "TransactionPurchaseOperations",
                newName: "IX_TransactionPurchaseOperations_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransactionStockOperations",
                table: "TransactionStockOperations",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransactionPurchaseOperations",
                table: "TransactionPurchaseOperations",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionPurchaseOperations_Users_UserId",
                table: "TransactionPurchaseOperations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionStockOperations_Users_UserId",
                table: "TransactionStockOperations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
