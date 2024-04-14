﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TOQUE.DE.CHEF.Models;

#nullable disable

namespace TOQUE.DE.CHEF.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20240414205309_addDeletedatInProducts")]
    partial class addDeletedatInProducts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("DESCRIPTION");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NAME");

                    b.HasKey("Id");

                    b.ToTable("CATEGORIES");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("DESCRIPTION");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NAME");

                    b.Property<double>("Unit_Price")
                        .HasColumnType("float")
                        .HasColumnName("UNIT_PRICE");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("PRODUCTS");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Purchase", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("PurchaseDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("PURCHASE_DATE");

                    b.Property<int>("SuplyerId")
                        .HasColumnType("int");

                    b.Property<int>("SupplierId")
                        .HasColumnType("int")
                        .HasColumnName("SUPPLIER_ID");

                    b.HasKey("Id");

                    b.HasIndex("SuplyerId");

                    b.ToTable("PURCHASES");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Suplyer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("DESCRIPTION");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("EMAIL");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NAME");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PHONE");

                    b.HasKey("Id");

                    b.ToTable("SUPPLIERS");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.TransactionPurchaseOperation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("OperationDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("OperationDate");

                    b.Property<string>("OperationType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("OperationType");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TRANSACTION_PURCHASE_OPERATIONS");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.TransactionStockOperation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("OperationDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("OperationDate");

                    b.Property<string>("OperationType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("OperationType");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TRANSACTION_STOCK_OPERATIONS");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Active")
                        .HasColumnType("bit")
                        .HasColumnName("ACTIVE");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("EMAIL");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("NAME");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("PASSWORD");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("TYPE");

                    b.HasKey("Id");

                    b.ToTable("USERS");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Product", b =>
                {
                    b.HasOne("TOQUE.DE.CHEF.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Purchase", b =>
                {
                    b.HasOne("TOQUE.DE.CHEF.Models.Suplyer", "Suplyer")
                        .WithMany("Purchases")
                        .HasForeignKey("SuplyerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Suplyer");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.TransactionPurchaseOperation", b =>
                {
                    b.HasOne("TOQUE.DE.CHEF.Models.User", "User")
                        .WithMany("TransactionalPurchaseOperations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.TransactionStockOperation", b =>
                {
                    b.HasOne("TOQUE.DE.CHEF.Models.User", "User")
                        .WithMany("TransactionStockOperations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.Suplyer", b =>
                {
                    b.Navigation("Purchases");
                });

            modelBuilder.Entity("TOQUE.DE.CHEF.Models.User", b =>
                {
                    b.Navigation("TransactionStockOperations");

                    b.Navigation("TransactionalPurchaseOperations");
                });
#pragma warning restore 612, 618
        }
    }
}
