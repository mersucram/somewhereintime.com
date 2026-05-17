using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using somewhereintme.com.Server.Services;

namespace somewhereintme.com.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class MenuController(IMenuService menuService) : ControllerBase
{
    private readonly IMenuService _menuService = menuService;

    [HttpGet("get-menu")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [AllowAnonymous]
    public async Task<IActionResult> GetMenu()
    {
        var menu = await _menuService.GetMenuAsync();
        return Ok(menu);
    }
}
