CREATE TABLE [dbo].[recipesIngredients](
	[recipe_id] [varchar](30) NOT NULL,
    [name] [varchar](300) NOT NULL, 
    [amount] [varchar](300) NOT NULL, 
    [unit] [varchar](300) NOT NULL, 
    PRIMARY KEY (recipe_id, name),
	FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
)