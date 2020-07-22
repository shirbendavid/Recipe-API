CREATE TABLE [dbo].[watchAndFavorite](
	[recipe_id] [varchar](30) NOT NULL,
	[user_id] [UNIQUEIDENTIFIER] NOT NULL,
    [watched] [bit] NOT NULL, 
    [favorite] [bit] NOT NULL,
    [time] [datetime] NOT NULL default GETDATE(),
    PRIMARY KEY (user_id, recipe_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)