using System;
using Xunit;

// Note: This test project is lightweight and uses xUnit. To run tests, ensure test SDKs are added to the solution.

namespace somewhereintime.com.AppHost.Tests
{
    public class AppHostMetadataTests
    {
        [Fact]
        public void EmbeddedMetadataReadsEnvironmentVariables()
        {
            const string id = "test-id";
            const string name = "Test Display";
            const string version = "9.9.9";

            Environment.SetEnvironmentVariable("APP_PROJECT_ID", id);
            Environment.SetEnvironmentVariable("APP_PROJECT_DISPLAY_NAME", name);
            Environment.SetEnvironmentVariable("APP_PROJECT_VERSION", version);

            var meta = new somewhereintime.com.AppHost.EmbeddedProjectMetadata();

            Assert.Equal(id, meta.Id);
            Assert.Equal(name, meta.DisplayName);
            Assert.Equal(version, meta.Version);
        }

        [Fact]
        public void TagsAreParsedFromEnvironment()
        {
            const string tags = "alpha, beta, gamma";
            Environment.SetEnvironmentVariable("APP_PROJECT_TAGS", tags);
            try
            {
                var meta = new somewhereintime.com.AppHost.EmbeddedProjectMetadata();
                Assert.Collection(meta.Tags,
                    t => Assert.Equal("alpha", t),
                    t => Assert.Equal("beta", t),
                    t => Assert.Equal("gamma", t));
            }
            finally
            {
                Environment.SetEnvironmentVariable("APP_PROJECT_TAGS", null);
            }
        }

        [Fact]
        public void BaseAddressParsesValidUri()
        {
            const string url = "https://example.com/";
            Environment.SetEnvironmentVariable("APP_PROJECT_BASE_ADDRESS", url);
            try
            {
                var meta = new somewhereintime.com.AppHost.EmbeddedProjectMetadata();
                Assert.NotNull(meta.BaseAddress);
                Assert.Equal(url, meta.BaseAddress!.AbsoluteUri);
            }
            finally
            {
                Environment.SetEnvironmentVariable("APP_PROJECT_BASE_ADDRESS", null);
            }
        }

        [Fact]
        public void PropertiesExposeEnvironmentOverrides()
        {
            Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
            Environment.SetEnvironmentVariable("APP_PROJECT_BUILD", "build-42");
            try
            {
                var meta = new somewhereintime.com.AppHost.EmbeddedProjectMetadata();
                Assert.Equal("Development", meta.Properties["Environment"]);
                Assert.Equal("build-42", meta.Properties["BuildVersion"]);
            }
            finally
            {
                Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", null);
                Environment.SetEnvironmentVariable("APP_PROJECT_BUILD", null);
            }
        }
    }
}
