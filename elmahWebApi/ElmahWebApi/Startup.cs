using ElmahBusiness.Mapper;
using ElmahBusiness.Services;
using ElmahBusiness.Services.Interfaces;
using ElmahDataAccess.DataContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;


namespace ElmahWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        readonly string ElmahError = "_ElmahError";

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddScoped<IElmahErrorService, ElmahErrorService>();
            services.AddDbContext<SIS_ElmahContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString")));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ElmahWebApi", Version = "v1" });
            });
            services.AddCors(options =>
            {
                options.AddPolicy(name: ElmahError,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4200")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod()
                                            .WithExposedHeaders("Content-Disposition")
                                            .SetIsOriginAllowed((host) => true);
                                  });
            });
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });
            services.AddAutoMapper(typeof(MappingProfile));

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ElmahWebApi v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors(ElmahError);

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
