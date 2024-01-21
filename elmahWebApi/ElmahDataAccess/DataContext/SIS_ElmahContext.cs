using System;
using ElmahDataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ElmahDataAccess.DataContext
{
    public partial class SIS_ElmahContext : DbContext
    {
        public SIS_ElmahContext()
        {
        }

        public SIS_ElmahContext(DbContextOptions<SIS_ElmahContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ElmahError> ElmahErrors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ElmahError>(entity =>
            {
                entity.HasKey(e => e.ErrorId)
                    .IsClustered(false);

                entity.ToTable("ELMAH_Error");

                entity.HasIndex(e => new { e.Application, e.TimeUtc, e.Sequence }, "IX_ELMAH_Error_App_Time_Seq");

                entity.Property(e => e.ErrorId).ValueGeneratedNever();

                entity.Property(e => e.AllXml).IsRequired();

                entity.Property(e => e.Application)
                    .IsRequired()
                    .HasMaxLength(60);

                entity.Property(e => e.Host)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Sequence).ValueGeneratedOnAdd();

                entity.Property(e => e.Source)
                    .IsRequired()
                    .HasMaxLength(60);

                entity.Property(e => e.TimeUtc).HasColumnType("datetime");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.User)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
