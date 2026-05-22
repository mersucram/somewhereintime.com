using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Reflection;

var builder = DistributedApplication.CreateBuilder(args);

// Register embedded project metadata (does not require external generated files).
builder.AddProject<somewhereintime.com.AppHost.EmbeddedProjectMetadata>("somewhereintime-com-server");

using var host = builder.Build();
var loggerFactory = host.Services.GetService<ILoggerFactory>();
var logger = loggerFactory?.CreateLogger("AppHost");

// Using embedded project metadata for registration; no runtime project path resolution.

try
{
    logger?.LogInformation("Starting AppHost");
    host.Run();
}
catch (Exception ex)
{
    logger?.LogCritical(ex, "AppHost terminated unexpectedly");
    throw;
}
finally
{
    logger?.LogInformation("AppHost shutting down");
}
