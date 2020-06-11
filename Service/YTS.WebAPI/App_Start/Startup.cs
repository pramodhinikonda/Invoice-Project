using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Owin;
using Owin.Security.Keycloak;
using System;
using System.Configuration;

[assembly: OwinStartup(typeof(YTS.WebAPI.Startup))]
namespace YTS.WebAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseKeycloakAuthentication(new KeycloakAuthenticationOptions
            {
                ClientId = ConfigurationManager.AppSettings["ClientId"],
                ClientSecret = ConfigurationManager.AppSettings["ClientSecret"],
                CallbackPath = ConfigurationManager.AppSettings["CallbackPath"],
                EnableBearerTokenAuth = true,
                ForceBearerTokenAuth = true,
                KeycloakUrl = ConfigurationManager.AppSettings["KeycloakUrl"],
                Realm = ConfigurationManager.AppSettings["Realm"],
                PostLogoutRedirectUrl = ConfigurationManager.AppSettings["PostLogoutRedirectUrl"],
                DisableAudienceValidation = true,
            });
        }
    }
}