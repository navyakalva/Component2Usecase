// <copyright file="UserTweets.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

using System;

namespace TweetAPP.Models
{
    /// <summary>
    /// UserTweets.
    /// </summary>
    public class UserTweets
    {
        /// <summary>
        /// Gets or Sets UserName.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Gets or Sets Tweets.
        /// </summary>
        public string Tweets { get; set; }

        /// <summary>
        /// Gets or Sets Imagename.
        /// </summary>
        public string Imagename { get; set; }

        /// <summary>
        /// Gets or Sets TweetDate.
        /// </summary>
        public DateTime TweetDate { get; set; }

        /// <summary>
        /// Gets or Sets FirstName.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or Sets LastName.
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Gets or Sets Likes.
        /// </summary>
        public int Likes { get; set; }
    }
}
