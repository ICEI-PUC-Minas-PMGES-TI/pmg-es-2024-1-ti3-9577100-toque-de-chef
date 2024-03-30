using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<Context>
    (options =>
                options.UseSqlServer("Data Source=localhost,1433;Initial Catalog=DB_TOQUE_DE_CHEF;Integrated Security=false;User ID=sa;Password=Easg#4560;Connect Timeout=15;Encrypt=false;TrustServerCertificate=false"));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");

    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
