"use strict";

var YouTube				= require('youtube-node');
var youTube;

var self = module.exports = {

	init: function(){
	
		youTube = new YouTube();
		youTube.setKey( Homey.env.YOUTUBE_KEY );
		
		Homey.manager('flow').on('action.castYoutube', onFlowActionCastYouTube);
		Homey.manager('flow').on('action.castYoutube.autocomplete', onFlowActionCastYouTubeAutocomplete);
		
	}
	
}

function onFlowActionCastYouTube( args, callback ) {
//	Homey.log('args', args, global.chromecasts)
	Homey.manager('drivers').getDriver('chromecast').playYoutube( '192.168.100.103', args.youtube_id.id )
}

function onFlowActionCastYouTubeAutocomplete(value, callback){
		
	youTube.addParam('type', 'video');
	youTube.search(value, 5, function(error, result) {
		if (error) return;
		
		var videos = [];
		result.items.forEach(function(video){
			videos.push({
				id		: video.id.videoId,
				name	: video.snippet.title,
				icon	: video.snippet.thumbnails.default.url
			})
		})
					
		callback( videos );
	});
	
}