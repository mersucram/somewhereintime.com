var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.somewhereintme_com_Server>("somewhereintme-com-server");

builder.Build().Run();
