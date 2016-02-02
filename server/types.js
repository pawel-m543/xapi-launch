function saveableType(self)
{
	
	
	Object.defineProperty(self, "init",
	{
		value: function(key, DB)
		{
			self.DB = DB;
			self.key = key;
			console.log("init " + key);
		}
	})
	Object.defineProperty(self, "dbForm",
	{
		value: function()
		{
			return JSON.parse(JSON.stringify(self, null, function(key, val)
			{
				if (key == "key")
					return undefined;
				if (key == "DB")
					return undefined;
				if (key == "init")
					return undefined;
				if (key == "dbForm")
					return undefined;
				return val;
			}))
		}
	})
	Object.defineProperty(self, "save",
	{
		value: function(cb)
		{
			if (self.DB)
			{
				self.DB.save(self.key, self.dbForm(), cb)
			}
			else
			{
				if (cb)
					cb("saveableType not initialized")
			}
		}
	})
	Object.defineProperty(self, "delete",
	{
		value: function(cb)
		{

			if (self.DB)
			{
				console.log('remove ', self.key);
				self.DB.remove(self.key, cb)
			}
			else
			{
				console.log("this.DB is null");
				if (cb)
					cb("saveableType not initialized")
			}
		}
	})
}
exports.userAccount = function(email, username, salt, password)
{
	saveableType(this);
	this.username = username;
	this.email = email;
	this.salt = salt;
	this.password = password;
	this.dataType = "userAccount";
}
exports.contentRecord = function(url, title, description, created, accessed, owner)
{
	saveableType(this);
	this.url = url;
	this.title = title;
	this.description = description;
	this.dataType = "contentRecord";
	this.created = created;
	this.accessed = accessed;
	this.owner = owner;
}