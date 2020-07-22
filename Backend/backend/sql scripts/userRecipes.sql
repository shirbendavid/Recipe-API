CREATE TABLE [dbo].[userRecipes](
    [recipe_id] [varchar](30) NOT NULL UNIQUE,
    [user_id] [UNIQUEIDENTIFIER] NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)