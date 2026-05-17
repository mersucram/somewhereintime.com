using somewhereintme.com.Server.Models.ServiceData;

namespace somewhereintme.com.Server.Services;

public interface IMenuService
{
    Task<MenuOptions> GetMenuAsync();
}
