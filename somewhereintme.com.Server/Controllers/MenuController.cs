using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using somewhereintme.Server.Services;

namespace somewhereintme.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet("get-menu")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [AllowAnonymous]
    public async Task<IActionResult> GetMenu()
    {
        var menu = await _menuService.GetMenuAsync();
        return Ok(menu);
    }

    [HttpGet("ping")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [AllowAnonymous]
    public IActionResult Ping()
    {
        return Ok(new { status = "ok", service = "somewhereintme.com.Server" });
    }
}
