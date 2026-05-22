# Changelog

All notable project changes are documented here from the repository commit
history. Entries are grouped by commit because the project does not currently
use tagged releases.

## Unreleased

- Added this root changelog to make project history easier to review.
- Expanded the root `README.md` with project design, architecture, development,
  testing, build, publish, and deployment information.
- Refined home page hero overlay typography and image treatment for clearer
  text contrast.

## 2026-05-21 - Updated Image Content

Commit: `4f53627b0b46f58495d210817e47a741c7b657b0`  
Author: Jim `<jim@mergetech.net>`

### Summary

Updated home page image assets and adjusted related UI content for the
Somewhere In Time Collectibles site.

### Details

- Added optimized responsive hero images under
  `somewhereintime.com.client/src/assets`:
  - `hero_1034495517249721109_n_sm.jpg`
  - `hero_1034495517249721109_n_md.jpg`
  - `hero_1034495517249721109_n_lg.jpg`
- Removed older public asset copies from
  `somewhereintime.com.client/public/assets`.
- Updated `Home.jsx` to use the new imported hero image set.
- Adjusted home page hero markup and copy presentation around the new image
  content.
- Updated footer/header UI details related to the revised page treatment.
- Added project-server configuration changes in
  `somewhereintime.com.Server.csproj`.
- Added Continue MCP server YAML files under `.continue/mcpServers`.

### Impact

- Improves frontend asset bundling by importing hero images through the Vite
  pipeline instead of serving older public assets directly.
- Reduces stale image files in the public assets folder.
- Sets up the hero area for better responsive image delivery.

### Commit Stats

- 12 files changed.
- 59 insertions.
- 28 deletions.
- 3 image files added.
- 3 old image files removed.

## 2026-05-18 - Navigation and Menu API Service Updates

Commit: `390ee893a21630448d5d9c85c9f4d460e79040c4`  
Author: Jim `<jim@mergetech.net>`

### Summary

Expanded the site from a generated starter application into a richer business
site with routed pages, dynamic navigation, menu API support, Aspire metadata,
CI configuration, and improved server/client integration.

### Backend and API

- Expanded `Program.cs` with broader application hosting concerns:
  - service defaults,
  - response compression,
  - development CORS,
  - JSON casing configuration,
  - OpenAPI in development,
  - static file serving,
  - client `dist` hosting,
  - SPA fallback behavior,
  - server startup/shutdown logging.
- Updated `MenuController` to expose menu and ping behavior.
- Updated menu service abstractions and implementation.
- Updated `MenuOptions` model naming/casing behavior.
- Updated server launch settings.
- Renamed the server project file from
  `somewhereintime.com.Server.csproj` to `somewhereintime.com.Server.csproj`.

### Frontend

- Added full page set for the site:
  - About,
  - Antiques,
  - Collectables,
  - Contact,
  - Fine Art,
  - Home,
  - Jewelry,
  - Literature,
  - Recent Aquisitions.
- Reworked `App.jsx` around React Router routes and shared layout.
- Added and/or expanded header and footer UI.
- Added `PingIndicator.jsx` for server availability display.
- Expanded `menuNavigation.js` to normalize backend menu data into frontend
  navigation items.
- Added initial image assets for the home page and collection presentation.
- Updated `index.html`, `package.json`, `package-lock.json`, and
  `vite.config.js`.
- Renamed the client project file from
  `somewhereintime.com.client.esproj` to `somewhereintime.com.client.esproj`.

### Aspire, Tests, and CI

- Added GitHub Actions workflow at `.github/workflows/dotnet.yml`.
- Added AppHost test project with xUnit tests.
- Added AppHost metadata tests covering:
  - environment variable overrides,
  - tag parsing,
  - base address parsing,
  - metadata property exposure.
- Added a skipped AppHost integration test placeholder.
- Added `EmbeddedProjectMetadata.cs` and `Projects.generated.cs`.
- Updated AppHost startup/registration behavior.
- Renamed the AppHost project file from
  `somewhereintime.com.AppHost.csproj` to `somewhereintime.com.AppHost.csproj`.
- Renamed the ServiceDefaults project file from
  `somewhereintime.com.ServiceDefaults.csproj` to
  `somewhereintime.com.ServiceDefaults.csproj`.
- Updated solution entries in `somewhereintime.com.slnx`.

### Impact

- Establishes the main application architecture: React/Vite client,
  ASP.NET Core API/static host, and Aspire AppHost.
- Moves navigation to a backend-provided menu model while preserving frontend
  route ownership.
- Adds the first meaningful test coverage for AppHost metadata behavior.
- Improves production readiness through compression, static asset serving, SPA
  fallback, and CI.

### Commit Stats

- 43 files changed.
- 2,382 insertions.
- 472 deletions.
- 16 new source/test/page files added.
- Multiple project files renamed.

## 2026-05-16 - Add Project Files

Commit: `7d1fcf51a1c2cca6552ca1028d91d5c4b3b749a3`  
Author: Jim `<jim@mergetech.net>`

### Summary

Added the initial application scaffold: .NET Aspire host, ASP.NET Core server,
shared service defaults, React/Vite client, frontend assets, workspace files,
and solution structure.

### Backend and Hosting

- Added Aspire AppHost project with settings and launch profile.
- Added ASP.NET Core server project with:
  - `Program.cs`,
  - `MenuController`,
  - `WeatherForecastController`,
  - menu models,
  - menu service interface and implementation,
  - server app settings,
  - launch settings,
  - HTTP request sample file,
  - Dockerfile,
  - .NET tool manifest.
- Added `ServiceDefaults` project with shared Aspire defaults for:
  - OpenTelemetry,
  - health checks,
  - service discovery,
  - HTTP client resilience.

### Frontend

- Added Vite/React client project with:
  - package manifest and lockfile,
  - Vite configuration,
  - ESLint configuration,
  - app entry point,
  - global CSS,
  - menu API helper,
  - menu navigation utility,
  - responsive media query hook,
  - shared UI components.
- Added initial UI components:
  - `CategoryCard.jsx`,
  - `Footer.jsx`,
  - `Header.jsx`.
- Added frontend assets and public icons:
  - favicon files,
  - touch icons,
  - Android chrome icons,
  - SVG icon files,
  - starter React/Vite assets,
  - initial hero asset.

### Project Infrastructure

- Added `.dockerignore`.
- Added `somewhereintime.com.slnx`.
- Added `somewhereintime.com.code-workspace`.
- Added project-level generated changelog/readme notes for server and client
  scaffolding.

### Impact

- Created the baseline full-stack application structure.
- Established the client/server split and initial menu-driven navigation path.
- Added Docker and Aspire-ready project infrastructure for future deployment
  and orchestration work.

### Commit Stats

- 55 files changed.
- 4,314 insertions.
- Full initial source tree added.

## 2026-05-16 - Repository Bootstrap

Commit: `f2a4bad3f6852f8fb07e2b1f236c3a5d731bb626`  
Author: Jim `<jim@mergetech.net>`

### Summary

Initialized repository metadata and baseline project documentation.

### Details

- Added `.gitattributes`.
- Added `.gitignore`.
- Added `LICENSE.txt`.
- Added initial root `README.md`.

### Impact

- Established repository-wide line ending, Git behavior, ignore rules, licensing,
  and initial project identity.

### Commit Stats

- 4 files changed.
- 448 insertions.
