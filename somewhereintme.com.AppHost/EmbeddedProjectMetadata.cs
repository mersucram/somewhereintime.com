using System;
using System.Collections.Generic;
using System.Linq;
using Aspire.Hosting;

namespace somewhereintme.com.AppHost
{
    // Embedded metadata implementation used by AppHost at compile-time.
    public sealed class EmbeddedProjectMetadata : IProjectMetadata
    {
        private static string Env(string name, string? fallback = null)
            => Environment.GetEnvironmentVariable(name) is string v && !string.IsNullOrEmpty(v) ? v : fallback ?? string.Empty;

        public string Id => Env("APP_PROJECT_ID", "somewhereintme-com-server");

        public string DisplayName => Env("APP_PROJECT_DISPLAY_NAME", "somewhereintme.com Server");

        public string Version => Env("APP_PROJECT_VERSION", "1.0.0");

        public IReadOnlyList<string> Tags
        {
            get
            {
                var raw = Env("APP_PROJECT_TAGS", string.Empty);
                return string.IsNullOrWhiteSpace(raw)
                    ? Array.Empty<string>()
                    : raw.Split(',').Select(t => t.Trim()).Where(t => !string.IsNullOrEmpty(t)).ToArray();
            }
        }

        public Uri? BaseAddress
        {
            get
            {
                var raw = Env("APP_PROJECT_BASE_ADDRESS", string.Empty);
                if (Uri.TryCreate(raw, UriKind.Absolute, out var u)) return u;
                return null;
            }
        }

        // ProjectPath is required by Aspire at runtime to locate and launch the server project.
        // Walks up from BaseDirectory to the solution root so it works whether running from
        // the IDE (BaseDirectory = project folder) or from the bin output folder (dotnet run).
        public string ProjectPath
        {
            get
            {
                // Allow full override via environment variable (useful in containers / CI).
                var envPath = Environment.GetEnvironmentVariable("APPHOST_PROJECT_PATH");
                if (!string.IsNullOrWhiteSpace(envPath) && System.IO.File.Exists(envPath))
                    return envPath!;

                // Walk up from BaseDirectory looking for the solution root (contains .slnx / .sln),
                // then resolve the server csproj relative to it.
                var dir = new System.IO.DirectoryInfo(AppContext.BaseDirectory);
                while (dir != null)
                {
                    if (dir.GetFiles("*.slnx").Length > 0 || dir.GetFiles("*.sln").Length > 0)
                    {
                        var candidate = System.IO.Path.Combine(
                            dir.FullName,
                            "somewhereintme.com.Server",
                            "somewhereintme.Server.csproj");
                        if (System.IO.File.Exists(candidate))
                            return candidate;
                    }
                    dir = dir.Parent;
                }

                return string.Empty;
            }
        }

        public string ProjectAssemblyName => Env("APP_PROJECT_ASSEMBLY", "somewhereintme.com.Server");

        public IReadOnlyDictionary<string, string> Properties
        {
            get
            {
                var dict = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
                {
                    ["Environment"] = Env("ASPNETCORE_ENVIRONMENT", "Production"),
                    ["BuildVersion"] = Env("APP_PROJECT_BUILD", Version)
                };

                return dict;
            }
        }
    }
}
