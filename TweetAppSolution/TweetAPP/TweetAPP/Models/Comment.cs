// <copyright file="Tweet.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

using System;
using System.ComponentModel.DataAnnotations;

namespace TweetAPP.Models
{
    /// <summary>
    /// Like.
    /// </summary>
    public class Comment
    {
        [Key]
        /// <summary>
        /// Gets or Sets Id.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets TweetId.
        /// </summary>
        public int TweetId { get; set; }

        /// <summary>
        /// Gets or Sets Username.
        /// </summary>
        public string Username { get; set; }

        ///<summary>
        /// Gets or Sets Comment.
        /// </summary>
        public string Comments { get; set; }

        ///<summary>
        /// Gets or Sets Date.
        /// </summary>
        public DateTime Date { get; set; }
    }
}
