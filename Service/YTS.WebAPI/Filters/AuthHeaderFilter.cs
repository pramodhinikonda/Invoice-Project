using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Web.Http.Description;

namespace YTS.WebAPI.Filters
{
    public class AuthHeaderFilter : IOperationFilter
    {
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.parameters == null)
                operation.parameters = new List<Parameter>();

            operation.parameters.Add(new Parameter
            {
                name = "Authorization",
                @in = "header",
                type = "string",
                required = true,
                description = "Token",
                @default = "Bearer "
            });

            operation.parameters.Add(new Parameter
            {
                name = "User",
                @in = "header",
                type = "string",
                required = true,
                description = "User Info"
            });
        }
    }
}