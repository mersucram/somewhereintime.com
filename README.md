# somewhereintime.com

Somewhere In Time Collectibles, LLC is a full-stack web application for a
collectibles, antiques, fine art, jewelry, and literature business. The solution
combines a React/Vite client, an ASP.NET Core API/server, and a .NET Aspire
AppHost for local orchestration and service defaults.

## Solution Architecture

The repository is organized as a multi-project .NET solution with a separate
JavaScript client:

```text
somewhereintime.com
|-- somewhereintime.com.AppHost          # .NET Aspire host/orchestration project
|-- somewhereintime.com.AppHost.Tests    # xUnit tests for AppHost metadata behavior
|-- somewhereintime.com.Server           # ASP.NET Core API and static file host
|-- somewhereintime.com.ServiceDefaults  # Shared Aspire telemetry/health defaults
`-- somewhereintime.com.client           # React 19 + Vite + Tailwind frontend
```

At runtime, the application has two primary modes:

1. Development mode: Vite serves the React app over HTTPS and proxies API
   requests to the ASP.NET Core server.
2. Published/server mode: the ASP.NET Core server serves the built React
   `dist` files and exposes the API from the same host.

## Technology Stack

- .NET 10 / ASP.NET Core for the API and production host.
- .NET Aspire AppHost for local application orchestration.
- React 19 for the client UI.
- Vite 8 for frontend development, bundling, HTTPS dev certificates, and API
  proxying.
- Tailwind CSS 4 through `@tailwindcss/vite` for styling.
- React Router for client-side page routing.
- xUnit for AppHost-related tests.
- OpenTelemetry, health checks, service discovery, and HTTP resilience through
  the shared `ServiceDefaults` project.

## Request Flow

### Development Flow

```text
Browser
  |
  v
Vite dev server (somewhereintime.com.client)
  |
  |-- serves React app, assets, HMR, and Tailwind output
  |
  `-- proxies /Menu and /weatherforecast
       |
       v
ASP.NET Core server (somewhereintime.com.Server)
  |
  `-- controllers and services return JSON
```

The Vite proxy target is resolved from Aspire service environment variables when
available:

- `services__somewhereintime-com-server__https__0`
- `services__somewhereintime-com-server__http__0`

If those values are not present, Vite falls back to `https://localhost:7141/`.

### Published Flow

```text
Browser
  |
  v
ASP.NET Core server
  |
  |-- serves static React build from wwwroot/client dist output
  |-- falls back to index.html for SPA routes
  `-- serves API controllers such as /Menu/get-menu
```

During publish, the server project runs the frontend build and copies
`somewhereintime.com.client/dist` into the publish output.

## Frontend Design

The frontend lives in `somewhereintime.com.client/src`.

Important entry points:

- `main.jsx` mounts React into the page.
- `App.jsx` owns the top-level layout, router, header, footer, and page routes.
- `index.css` defines Tailwind theme tokens, base styles, and shared component
  utilities.
- `api/menu.js` fetches navigation data from the backend.
- `utils/menuNavigation.js` converts backend menu JSON into UI-friendly nav
  items.

### Pages

The app uses React Router and currently defines these routes:

- `/`
- `/about`
- `/contact`
- `/recent-aquisitions`
- `/fine-art`
- `/antiques`
- `/collectables`
- `/jewelry`
- `/literature`

Page components live under `src/pages`. Category pages use repeated card-style
content patterns, while the home page includes a responsive hero image,
collection highlights, and calls to action.

### Layout Components

Shared UI components live under `src/components/ui`.

- `Header.jsx` loads navigation from `/Menu/get-menu`, supports desktop
  dropdowns and mobile disclosure navigation, and handles unavailable menu
  states.
- `Footer.jsx` contains secondary navigation, social links, copyright text,
  application credit, and a server status link.
- `CategoryCard.jsx` renders responsive image cards for collection categories.
- `PingIndicator.jsx` is used by the footer to show server availability.

### Styling Approach

Styling is utility-first with Tailwind CSS. The root theme defines:

- `--font-sans`: Segoe UI/system font stack.
- `--font-display`: Georgia/Times serif display stack.

The visual language is warm, restrained, and collection-focused: stone neutrals,
amber accents, serif headings, responsive image crops, and accessible navigation
states. Shared custom CSS should stay small and live in `index.css` under the
appropriate Tailwind layer.

## Backend Design

The backend lives in `somewhereintime.com.Server`.

Important files:

- `Program.cs` configures services, middleware, controllers, compression,
  CORS, OpenAPI in development, static asset serving, and SPA fallback.
- `Controllers/MenuController.cs` exposes menu and ping endpoints.
- `Services/MenuService.cs` loads navigation configuration from JSON.
- `Models/ServiceData/MenuOptions.cs` defines the menu configuration model.
- `Properties/menuoptions.json` is the source of truth for navigation URLs.

### API Endpoints

`MenuController` exposes:

- `GET /Menu/get-menu`: returns the configured navigation model.
- `GET /Menu/ping`: returns a simple JSON status payload.

There is also a template `WeatherForecastController`, proxied in development,
which can be removed if it is no longer needed.

### Menu Configuration

Navigation is intentionally data-driven. The server reads
`somewhereintime.com.Server/Properties/menuoptions.json`, deserializes it into
`MenuOptions`, and exposes it through `/Menu/get-menu`.

The frontend then normalizes `~/` paths to client routes:

```json
{
  "navigation": {
    "home": "~/",
    "about": "~/about",
    "contact": "~/contact",
    "recentAquisitions": "~/recent-aquisitions",
    "artAndCollectables": {
      "collectables": "~/collectables",
      "fineArt": "~/fine-art",
      "antiques": "~/antiques",
      "jewelry": "~/jewelry",
      "literature": "~/literature"
    }
  }
}
```

`MenuService` searches for this file in the content root and output directory,
which allows both local development and published builds to resolve the same
configuration.

### Static Files and SPA Fallback

`Program.cs` supports static file hosting in two ways:

- Standard ASP.NET Core static files/default files.
- A physical file provider pointed at the client `dist` folder when it exists.

For client-side routes, the server falls back to `index.html` when the request
does not target a file extension. Static assets receive cache headers, while
`index.html` is served with no-cache headers so deployments can update cleanly.

## Aspire and Shared Service Defaults

`somewhereintime.com.AppHost` is the Aspire host. It registers the server project
through `EmbeddedProjectMetadata`, starts the distributed application, and logs
startup/shutdown events.

`somewhereintime.com.ServiceDefaults` centralizes cross-cutting runtime behavior:

- OpenTelemetry logging, metrics, and tracing.
- Optional OTLP exporter support through `OTEL_EXPORTER_OTLP_ENDPOINT`.
- Health checks.
- Service discovery.
- Default HTTP client resilience.

In development, services that call `MapDefaultEndpoints()` expose:

- `/health`
- `/alive`

## Build and Publish

The server project owns the production publish path. Its MSBuild target:

1. Runs `npm ci --prefer-offline --no-audit --no-fund` in the client project.
2. Runs `npm run build`.
3. Copies the client `dist` output into the server publish `wwwroot`.

The Dockerfile uses a .NET SDK image with Node.js 20 installed for build/publish,
then copies the published app into a .NET ASP.NET runtime image.

## Local Development

### Prerequisites

- .NET 10 SDK.
- Node.js compatible with the client dependencies.
- npm.
- ASP.NET Core HTTPS development certificates.

The Vite config can create/export the HTTPS certificate used by the client dev
server through `dotnet dev-certs https`.

### Common Commands

From the repository root:

```powershell
dotnet build .\somewhereintime.com.slnx
dotnet test .\somewhereintime.com.slnx
dotnet run --project .\somewhereintime.com.AppHost
dotnet run --project .\somewhereintime.com.Server
```

From `somewhereintime.com.client`:

```powershell
npm install
npm run dev
npm run build
npm run lint
```

When running the client directly, Vite starts over HTTPS on port `5173` by
default and proxies `/Menu` and `/weatherforecast` to the backend.

Optional environment variables:

- `DEV_SERVER_HOST`: overrides the Vite host, defaulting to `127.0.0.1`.
- `DEV_SERVER_PORT`: asks Vite to use a specific port.
- `OTEL_EXPORTER_OTLP_ENDPOINT`: enables OTLP telemetry export.
- `APPHOST_PROJECT_PATH`: overrides AppHost server project path discovery.
- `APP_PROJECT_*`: overrides embedded AppHost metadata values.

## Testing

`somewhereintime.com.AppHost.Tests` contains xUnit tests for AppHost metadata.
One integration-style AppHost startup test is intentionally skipped because it
requires local or CI host tooling.

The client has lint and build scripts. At the time this README was written,
`npm run build` succeeds, while `npm run lint` reports a React Hooks rule issue
in `src/hooks/useMediaQuery.js` because it calls `setState` synchronously inside
an effect.

## Development Conventions

- Keep navigation route changes synchronized between:
  - `somewhereintime.com.Server/Properties/menuoptions.json`
  - `somewhereintime.com.client/src/App.jsx`
  - `somewhereintime.com.client/src/utils/menuNavigation.js`
- Keep shared visual primitives in `src/components/ui`.
- Keep backend data contracts in `Models/ServiceData`.
- Prefer updating `menuoptions.json` for navigation URL changes instead of
  hard-coding menu links in the header.
- Build the client before publishing the server, or rely on the server publish
  target to do it.
- Treat `dist`, `bin`, `obj`, and `node_modules` as generated output.

## Deployment Notes

Production deployment should publish `somewhereintime.com.Server`, since that
project produces the API and static client host together. The Dockerfile is set
up for Linux containers and exposes ports `8080` and `8081`.

The published server handles:

- HTTPS redirection.
- Brotli and gzip response compression.
- Static asset caching.
- SPA fallback routing.
- API controller routing.
- Development-only OpenAPI and health endpoints.
