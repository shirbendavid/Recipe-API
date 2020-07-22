CREATE TABLE [dbo].[users](
	[user_id] [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
	[username] [varchar](30) NOT NULL UNIQUE,
	[password] [varchar](300) NOT NULL, 
	[firstname] [varchar](50) NOT NULL, 
	[lastname] [varchar](50) NOT NULL, 
	[country] [varchar](50) NOT NULL, 
	[email] [varchar](100) NOT NULL, 
	[image] [varchar](300) NOT NULL
)

