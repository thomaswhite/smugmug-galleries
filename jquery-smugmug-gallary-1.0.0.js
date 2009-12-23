(function($) {
	
var ss = $.smugmugGallaries = {};

var smug_escape = function(str) {
  str = str.replace(/ /g, "-");
  str = str.replace(/'/g, "");
  return str;
};

$.fn.smugmugGallaries = function(options) {
	var nick = options.nickname;
	var size = options.size || "Thumbnail";
	
	// Setup div
	var div = this;
	div.append("<ul></ul>");
	var ul = div.find("ul");
	// this.empty();
	
	$.smugmug.login.anonymously(function() {
		$.smugmug.albums.get({NickName: nick, Heavy: 1}, function(albums) {
			
			$.each(albums.Albums, function() {
				var album = this;
				var url = "http://" + nick + ".smugmug.com/";
				if (album.Category)
				  url += smug_escape(album.Category.Name) + "/";
				
				if (album.SubCategory)
  			  url += smug_escape(album.SubCategory.Name) + "/";
				  
				url += smug_escape(album.Title);
				html = "<li><a href=\"" + url + "\" id=\"" + album.id + "\">" + album.Title + "</a></li>";
				ul.append(html);
      				
				$.smugmug.images.get({AlbumID: album.id, AlbumKey: album.Key, Heavy: 1}, function(images) {
					var image = images.Album.Images[0];
					if (image) {
						// console.log(images);
						var li    = $("li a#" + album.id);
						var title = li.text();
						var img   = "<img src=\"" + image.ThumbURL + "\" title=\"" + title + "\"/>";
						li.text("");
						$("li a#" + album.id).append(img);
					}
				});
			});
			
			// 	var album = this;
			// });
		});
	});
	
};

})(jQuery);

// http://photos.hurleyhome.com/2009/xmas/2009-12-09/IMG0021/736786636_oVM2Q-S.jpg