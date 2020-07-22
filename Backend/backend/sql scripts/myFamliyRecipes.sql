CREATE TABLE [dbo].[myFamliyRecipes](
	[recipe_id] [varchar](30) NOT NULL,
	[user_id] [UNIQUEIDENTIFIER] NOT NULL,
    [title] [varchar](300) NOT NULL,
	[family_member] [varchar](300) NOT NULL,
    [whenMakeIt] [varchar](max) NOT NULL,
	[readyInMinutes] [int] NOT NULL, 
	[vegetarian] [bit] NOT NULL, 
	[vegan] [bit] NOT NULL, 
	[glutenFree] [bit] NOT NULL,
	[image] [varchar](max) NOT NULL, 
	[severalServings] [int] NOT NULL, 
	[instructions] [varchar](max) NOT NULL, 
	PRIMARY KEY (user_id, recipe_id),
	FOREIGN KEY (user_id, recipe_id) REFERENCES userRecipes(user_id, recipe_id)
)