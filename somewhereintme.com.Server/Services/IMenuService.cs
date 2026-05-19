using somewhereintme.Server.Models.ServiceData;

namespace somewhereintme.Server.Services;

public interface IMenuService
{
    Task<MenuOptions> GetMenuAsync();
}
