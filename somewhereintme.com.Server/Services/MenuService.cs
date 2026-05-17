using System.Text.Json;
using somewhereintme.com.Server.Models.ServiceData;

namespace somewhereintme.com.Server.Services;

public class MenuService : IMenuService
{
    internal static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        ReadCommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true,
    };

    private readonly MenuOptions _menuOptions;

    public MenuService(MenuOptions menuOptions)
    {
        _menuOptions = menuOptions;
    }

    public Task<MenuOptions> GetMenuAsync() => Task.FromResult(_menuOptions);

    internal static MenuOptions LoadFromFile(IHostEnvironment environment)
    {
        foreach (var path in GetCandidatePaths(environment))
        {
            if (!File.Exists(path))
            {
                continue;
            }

            var json = File.ReadAllText(path);
            var options = JsonSerializer.Deserialize<MenuOptions>(json, JsonOptions) ?? new MenuOptions();

            if (string.IsNullOrEmpty(options.Navigation.Home))
            {
                throw new InvalidDataException(
                    $"Menu options at '{path}' did not deserialize correctly. Check JSON property names match the MenuOptions model.");
            }

            return options;
        }

        throw new FileNotFoundException(
            "menuoptions.json was not found. Expected it under Properties/ in the content root or output directory.",
            "menuoptions.json");
    }

    private static IEnumerable<string> GetCandidatePaths(IHostEnvironment environment)
    {
        yield return Path.Combine(environment.ContentRootPath, "Properties", "menuoptions.json");
        yield return Path.Combine(AppContext.BaseDirectory, "Properties", "menuoptions.json");
    }
}
