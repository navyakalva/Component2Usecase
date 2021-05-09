// <copyright file="ITweetAppService.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace TweetAPP.Service
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TweetAPP.Models;

    /// <summary>
    /// Interface ITweetAppService.
    /// </summary>
    public interface ITweetAppService
    {
        /// <summary>
        /// Register.
        /// </summary>
        /// <param name="users">users.</param>
        /// <returns>response.</returns>
        Task<string> Register(User users);

        /// <summary>
        /// Login.
        /// </summary>
        /// <param name="Username">emailId.</param>
        /// <param name="password">password.</param>
        /// <returns>response.</returns>
        Task<User> UserLogin(string Username, string password);

        /// <summary>
        /// GetAllTweets.
        /// </summary>
        /// <returns>response.</returns>
        Task<List<UserTweets>> GetAllTweets();

        /// <summary>
        /// GetTweetsByUser.
        /// </summary>
        /// <param name="username">username.</param>
        /// <returns>response.</returns>
        Task<List<UserTweets>> GetTweetsByUser(string username);

        /// <summary>
        /// GetAllUsers.
        /// </summary>
        /// <returns>response.</returns>
        Task<IList<RegisteredUser>> GetAllUsers();

        /// <summary>
        /// PostTweet.
        /// </summary>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        Task<string> PostTweet(Tweet tweet);

        /// <summary>
        /// UpdatePassword.
        /// </summary>
        /// <param name="emailId">emailId.</param>
        /// <param name="oldpassword">oldpassword.</param>
        /// <param name="newPassword">newPassword.</param>
        /// <returns>response.</returns>
        Task<string> UpdatePassword(string emailId, string oldpassword, string newPassword);

        /// <summary>
        /// ForgotPassword.
        /// </summary>
        /// <param name="emailId">emailId.</param>
        /// <param name="password">password.</param>
        /// <returns>response.</returns>
        Task<string> ForgotPassword(string emailId, string password);

        /// <summary>
        /// Likes.
        /// </summary>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        Task<int> Likes(string username, string tweet);

        /// <summary>
        /// Likes.
        /// </summary>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        Task<List<UserComments>> GetComments(string username, string tweet);

        /// <summary>
        /// Comments.
        /// </summary>
        /// <param name="comment">comment.</param>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        Task<int> Comments(string comment, string username, string userName, string tweet);

        /// <summary>
        /// DeleteTweet.
        /// </summary>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        Task<string> DeleteTweet(string username, string tweet);

        /// <summary>
        /// GetUserProfile.
        /// </summary>
        /// <param name="username">username.</param>
        /// <returns>response.</returns>
        Task<User> GetUserProfile(string username);

    }
}
