using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DAL
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Example> Example { get; set; }
        public DbSet<User> User { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            const string priceDecimalType = "decimal(18,2)";

            builder.Entity<Example>().Property(c => c.Id).IsRequired();
            builder.Entity<Example>().Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Entity<Example>().Property(c => c.PhoneNumber).IsUnicode(false).HasMaxLength(30);
            builder.Entity<Example>().Property(c => c.City).HasMaxLength(50);
            builder.Entity<Example>().Property(p => p.Payment).HasColumnType(priceDecimalType);

            builder.Entity<User>().Property(c => c.Email).IsRequired().HasMaxLength(100);
            builder.Entity<User>().Property(c => c.Username).IsRequired().HasMaxLength(50);
            builder.Entity<User>().Property(c => c.Password).IsRequired().HasMaxLength(100);
            builder.Entity<User>().Property(c => c.FirstName).IsRequired().HasMaxLength(100);
            builder.Entity<User>().Property(c => c.LastName).IsRequired().HasMaxLength(100);
        }


        public override int SaveChanges()
            => base.SaveChanges();

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
            => base.SaveChanges(acceptAllChangesOnSuccess);

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
            => base.SaveChangesAsync(cancellationToken);

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
            => base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}
