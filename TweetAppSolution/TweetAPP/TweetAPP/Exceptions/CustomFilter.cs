// <copyright file="CustomFilter.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace TweetAPP.Exceptions
{
    using System;
    using System.Net;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc.Filters;

    /// <summary>
    /// CustomFilter.
    /// </summary>
    public class CustomFilter : IExceptionFilter
    {
        /// <summary>
        /// OnException.
        /// </summary>
        /// <param name="context">context.</param>
        public void OnException(ExceptionContext context)
        {
            if (context != null)
            {
                HttpStatusCode status = HttpStatusCode.InternalServerError;
                string message = string.Empty;

                var exceptionType = context.Exception.GetType();
                if (exceptionType == typeof(UnauthorizedAccessException))
                {
                    message = "Unauthorized Access";
                    status = HttpStatusCode.Unauthorized;
                }
                else if (exceptionType == typeof(NotImplementedException))
                {
                    message = "A server error occurred.";
                    status = HttpStatusCode.NotImplemented;
                }
                else if (exceptionType == typeof(Exception))
                {
                    message = context.Exception.ToString();
                    status = HttpStatusCode.InternalServerError;
                }
                else
                {
                    message = context.Exception.Message;
                    status = HttpStatusCode.NotFound;
                }

                context.ExceptionHandled = true;

                HttpResponse response = context.HttpContext.Response;
                response.StatusCode = (int)status;
                response.ContentType = "application/json";
                var err = message + " " + context.Exception.StackTrace;
                response.WriteAsync(err);
            }
        }
    }
}