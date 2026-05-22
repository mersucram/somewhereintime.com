using somewhereintime.Server.Models.ServiceData;

namespace somewhereintime.Server.Services;

public interface IMenuService
{
    Task<MenuOptions> GetMenuAsync();
}
