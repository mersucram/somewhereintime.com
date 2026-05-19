namespace somewhereintme.Server.Models.ServiceData;

public class MenuOptions
{
    public NavigationOptions Navigation { get; set; } = new();
}

public class NavigationOptions
{
    public string Home { get; set; } = string.Empty;

    public string About { get; set; } = string.Empty;

    public string Contact { get; set; } = string.Empty;

    public string RecentAquisitions { get; set; } = string.Empty;

    public ArtAndCollectablesOptions ArtAndCollectables { get; set; } = new();
}

public class ArtAndCollectablesOptions
{
    public string Collectables { get; set; } = string.Empty;

    public string FineArt { get; set; } = string.Empty;

    public string Antiques { get; set; } = string.Empty;

    public string Jewelry { get; set; } = string.Empty;

    public string Literature { get; set; } = string.Empty;
}
