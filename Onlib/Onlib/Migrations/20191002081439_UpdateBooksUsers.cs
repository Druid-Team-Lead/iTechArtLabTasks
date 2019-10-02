using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Onlib.Migrations
{
    public partial class UpdateBooksUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookUserModel_Books_BookId",
                table: "BookUserModel");

            migrationBuilder.DropForeignKey(
                name: "FK_BookUserModel_Users_UserId",
                table: "BookUserModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BookUserModel",
                table: "BookUserModel");

            migrationBuilder.RenameTable(
                name: "BookUserModel",
                newName: "BooksUsers");

            migrationBuilder.RenameIndex(
                name: "IX_BookUserModel_UserId",
                table: "BooksUsers",
                newName: "IX_BooksUsers_UserId");

            migrationBuilder.AddColumn<string>(
                name: "BookStatus",
                table: "BooksUsers",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StatusActivateTime",
                table: "BooksUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_BooksUsers",
                table: "BooksUsers",
                columns: new[] { "BookId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BooksUsers_Books_BookId",
                table: "BooksUsers",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BooksUsers_Users_UserId",
                table: "BooksUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BooksUsers_Books_BookId",
                table: "BooksUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_BooksUsers_Users_UserId",
                table: "BooksUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BooksUsers",
                table: "BooksUsers");

            migrationBuilder.DropColumn(
                name: "BookStatus",
                table: "BooksUsers");

            migrationBuilder.DropColumn(
                name: "StatusActivateTime",
                table: "BooksUsers");

            migrationBuilder.RenameTable(
                name: "BooksUsers",
                newName: "BookUserModel");

            migrationBuilder.RenameIndex(
                name: "IX_BooksUsers_UserId",
                table: "BookUserModel",
                newName: "IX_BookUserModel_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BookUserModel",
                table: "BookUserModel",
                columns: new[] { "BookId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BookUserModel_Books_BookId",
                table: "BookUserModel",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BookUserModel_Users_UserId",
                table: "BookUserModel",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
