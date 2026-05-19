using System.Text.Json;
using somewhereintme.Server.Services;
using somewhereintme.ServiceDefaults;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add shared defaults from the ServiceDefaults project
builder.AddServiceDefaults();

// Response compression for production (gzip and brotli)
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});
builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = System.IO.Compression.CompressionLevel.Fastest;
});
builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = System.IO.Compression.CompressionLevel.Fastest;
});

// Add services to the container.

// Enable CORS for development to allow direct requests from the Vite dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.PropertyNameCaseInsensitive = true;
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton(MenuService.LoadFromFile(builder.Environment));
builder.Services.AddSingleton<IMenuService, MenuService>();

var app = builder.Build();

var logger = app.Services.GetRequiredService<ILoggerFactory>().CreateLogger("Program");
logger.LogInformation("Starting somewhereintme.com.Server (Environment: {env})", app.Environment.EnvironmentName);

// Map default endpoints (health checks) from ServiceDefaults
app.MapDefaultEndpoints();

// Ensure static files and default document support so the client build can be served
app.UseResponseCompression();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapStaticAssets();

// If the client has been built (dist folder exists), serve its files from /
var clientDist = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "somewhereintme.com.client", "dist"));
if (Directory.Exists(clientDist))
{
    var provider = new PhysicalFileProvider(clientDist);
    app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = provider });
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = provider,
        OnPrepareResponse = ctx =>
        {
            // Cache static assets for 30 days
            var headers = ctx.Context.Response.GetTypedHeaders();
            headers.CacheControl = new Microsoft.Net.Http.Headers.CacheControlHeaderValue
            {
                Public = true,
                MaxAge = TimeSpan.FromDays(30)
            };
        }
    });

    // Fallback to dist/index.html for SPA routes
    app.MapWhen(ctx => !Path.HasExtension(ctx.Request.Path.Value ?? string.Empty) && ctx.Request.Method == "GET", builder =>
    {
        builder.Run(async ctx =>
        {
            var file = provider.GetFileInfo("index.html");
            if (file.Exists)
            {
                ctx.Response.ContentType = "text/html; charset=utf-8";
                // no-cache for index.html to allow updates; other static assets will be cached
                ctx.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.CacheControl] = "no-cache, no-store, must-revalidate";
                await ctx.Response.SendFileAsync(file);
                return;
            }

            ctx.Response.StatusCode = 404;
        });
    });
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Enable CORS early in the pipeline for dev
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

try
{
    app.Run();
}
catch (Exception ex)
{
    logger.LogCritical(ex, "Host terminated unexpectedly");
    throw;
}
finally
{
    logger.LogInformation("Shutting down somewhereintme.com.Server");
}
