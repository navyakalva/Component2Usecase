// <copyright file="Tweet.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TweetAPP.Models
{
    /// <summary>
    /// Tweet.
    /// </summary>
    public class Tweet
    {
        [Key]
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets UserId.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Gets or Sets Username.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Gets or Sets Tweets.
        /// </summary>
        public string Tweets { get; set; }

        /// <summary>
        /// Gets or Sets FirstName.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or Sets LastName.
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Gets or Sets TweetDate.
        /// </summary>
        public DateTime TweetDate { get; set; }

        public IList<Comment> Comments { get; set; }

        public int Likes { get; set; }
    }
}
