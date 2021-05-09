// <copyright file="TweetRepository.cs" company="PlaceholderCompany">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>

namespace TweetAPP.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using TweetAPP.Models;

    /// <summary>
    /// TweetRepository.
    /// </summary>
    public class TweetRepository : ITweetRepository
    {
        private readonly TweetDBContext dbcontext;

        /// <summary>
        /// Initializes a new instance of the <see cref="TweetRepository"/> class.
        /// </summary>
        /// <param name="context">context.</param>
        public TweetRepository(TweetDBContext context)
        {
            this.dbcontext = context;
        }

        /// <summary>
        /// Comments.
        /// </summary>
        /// <param name="comment">.</param>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <param name="date">date.</param>
        /// <returns>response.</returns>
        public async Task<int> Comments(string comment, string username, string userName, string tweet, DateTime date)
        {
            Comment comments = new Comment();
            int results = 0;
            var result = await this.dbcontext.Tweets.Where(s => s.Username == userName && s.Tweets == tweet).FirstOrDefaultAsync();
            if (result != null)
            {
                comments.TweetId = result.Id;
                comments.Username = username;
                comments.Comments = comment;
                comments.Date = date;
                this.dbcontext.Add(comments);
                results = await this.dbcontext.SaveChangesAsync();
            }

            return results;
        }

        public async Task<int> DeleteTweet(string username, string tweet)
        {
            var result = await this.dbcontext.Tweets.Where(s => s.Username == username && s.Tweets == tweet).FirstOrDefaultAsync();
            this.dbcontext.Remove(result);
            var response = await this.dbcontext.SaveChangesAsync();
            return response;
        }

        /// <summary>
        /// ForgotPassword.
        /// </summary>
        /// <param name="emailId">emailId.</param>
        /// <param name="password">password.</param>
        /// <returns>response.</returns>
        public async Task<bool> ForgotPassword(string emailId, string password)
        {
            var result = await this.dbcontext.User.Where(s => s.EmailId == emailId).FirstOrDefaultAsync();
            if (result != null)
            {
                result.Password = password;
                this.dbcontext.Update(result);
                var response = this.dbcontext.SaveChanges();
                if (response > 0)
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// GetAllTweets.
        /// </summary>
        /// <returns>response.</returns>
        public async Task<List<UserTweets>> GetAllTweets()
        {
            var result = await (from tweet in this.dbcontext.Tweets join user in this.dbcontext.User on tweet.UserId equals user.UserId select new UserTweets { UserName = user.Username, Tweets = tweet.Tweets, Imagename = user.ImageName, TweetDate = tweet.TweetDate, FirstName = user.FirstName, LastName= user.LastName, Likes = tweet.Likes }).ToListAsync();
            return result;
        }

        /// <summary>
        /// GetAllUsers.
        /// </summary>
        /// <returns>response.</returns>
        public async Task<IList<RegisteredUser>> GetAllUsers()
        {
            var result = await this.dbcontext.User.Select(p => new RegisteredUser
            {
                FirstName = p.FirstName,
                LastName = p.LastName,
                Username = p.Username,
                ImageName = p.ImageName,
            }).ToListAsync();
            return result;
        }

        public async Task<List<UserComments>> GetComments(string username, string tweet)
        {
            var result = await this.dbcontext.Tweets.Where(s => s.Username == username && s.Tweets == tweet).FirstOrDefaultAsync();
            var result1 = await (from commentss in this.dbcontext.Comments join users in this.dbcontext.User on username equals users.Username where commentss.TweetId == result.Id select new UserComments { Username = commentss.Username, Comments = commentss.Comments, Imagename = users.ImageName, Date = commentss.Date}).ToListAsync();
            return result1;
        }

        /// <summary>
        /// GetTweetsByUser.
        /// </summary>
        /// <param name="username">username.</param>
        /// <returns>response.</returns>
        public async Task<List<UserTweets>> GetTweetsByUser(string username)
        {
            var users = await this.dbcontext.User.FirstOrDefaultAsync(e => e.Username == username);
            var result = await (from tweet in this.dbcontext.Tweets join user in this.dbcontext.User on tweet.UserId equals user.UserId where tweet.UserId == users.UserId select new UserTweets { UserName = user.Username, Tweets = tweet.Tweets, Imagename = user.ImageName, TweetDate = tweet.TweetDate, FirstName = user.FirstName, LastName= user.LastName, Likes = tweet.Likes }).ToListAsync();
            return result;
        }

        /// <summary>
        /// GetUserProfile.
        /// </summary>
        /// <param name="username">username.</param>
        /// <returns>response.</returns>
        public async Task<User> GetUserProfile(string username)
        {
            var result = await this.dbcontext.User.Where(s => s.Username == username).FirstOrDefaultAsync();
            return result;
        }

        /// <summary>
        /// Likes.
        /// </summary>
        /// <param name="username">username.</param>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        public async Task<int> Likes(string username, string tweet)
        {
            var result = await this.dbcontext.Tweets.Where(s => s.Username == username && s.Tweets == tweet).FirstOrDefaultAsync();
            result.Likes++;
            this.dbcontext.Tweets.Update(result);
            await this.dbcontext.SaveChangesAsync();
            return result.Likes;
        }

        /// <summary>
        /// Login.
        /// </summary>
        /// <param name="username">username.</param>
        /// <param name="password">password.</param>
        /// <returns>response.</returns>
        public async Task<User> Login(string username, string password)
        {
            User user = await this.dbcontext.User.FirstOrDefaultAsync(e => e.Username == username && e.Password == password);
            if (user != null)
            {
                return user;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// PostTweet.
        /// </summary>
        /// <param name="tweet">tweet.</param>
        /// <returns>response.</returns>
        public async Task<int> PostTweet(Tweet tweet)
        {
            this.dbcontext.Tweets.Add(tweet);
            var result = await this.dbcontext.SaveChangesAsync();
            return result;
        }

        /// <summary>
        /// Register.
        /// </summary>
        /// <param name="users">users.</param>
        /// <returns>response.</returns>
        public async Task<int> Register(User users)
        {
            this.dbcontext.User.Add(users);
            var result = await this.dbcontext.SaveChangesAsync();
            return result;
        }

        /// <summary>
        /// UpdatePassword.
        /// </summary>
        /// <param name="emailId">emailId.</param>
        /// <param name="oldpassword">oldpassword.</param>
        /// <param name="newPassword">newPassword.</param>
        /// <returns>response.</returns>
        public async Task<bool> UpdatePassword(string emailId, string oldpassword, string newPassword)
        {
            var update = await this.dbcontext.User.Where(x => x.EmailId == emailId && x.Password == oldpassword).FirstOrDefaultAsync();
            if (update != null)
            {
                update.Password = newPassword;
                this.dbcontext.User.Update(update);
                var result = await this.dbcontext.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// ValidateEmailId.
        /// </summary>
        /// <param name="emailId">emailId.</param>
        /// <returns>response.</returns>
        public async Task<User> ValidateEmailId(string emailId)
        {
            var user = await this.dbcontext.User.FirstOrDefaultAsync(e => e.EmailId == emailId);
            return user;
        }

        /// <summary>
        /// ValidateName.
        /// </summary>
        /// <param name="firstName">firstName.</param>
        /// <param name="loginId">loginId.</param>
        /// <returns>response.</returns>
        public async Task<User> ValidateName(string firstName, string loginId)
        {
            var user = await this.dbcontext.User.FirstOrDefaultAsync(e => e.FirstName == firstName || e.Username == loginId);
            return user;
        }
    }
}
