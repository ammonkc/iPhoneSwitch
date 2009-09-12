/************************************************ 
*  jQuery iphoneSwitch plugin                   *
*                                               *
*  Author: Ammon Casey		                    *
*  Website: http://www.brokenparadigmlabs.com	*
*  Twitter: @ammonkc							*
*  Date:   09.02.2009                           *
************************************************/

jQuery.fn.iphoneSwitch = function(start_state, switched_on_callback, switched_off_callback, options) {

	var state = start_state == 'on' ? start_state : 'off';
	
	// define default settings
	var settings = {
		mouse_over: 'pointer',
		mouse_out:  'default',
		hide_checkbox: true,
		sync_checkbox: true,
		use_images: true,
		speed: '300',
		on_label: 'On',
		off_label: 'Off',
		switch_height: 30,
		switch_width: 200,
		switch_radius: 3,
		track_img: 'images/switch_track.png',
		track_bg_color: '#5f6777',
		track_width: 95,
		track_height: 29,
		handle_img: 'images/switch_handle.png',
		handle_bg_color: '#f9f9f9',
		handle_border_color: '#d0d0d0',
		handle_height: 25,
		handle_width: 37
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	// create the switch
	return this.each(function() {
		var checkbox = jQuery(this);
		if (!jQuery(checkbox).is(':checkbox')) { return; }
		
		var container;
		var track;
		var handle;
		var offset = (settings.track_width - 2) - settings.handle_width;
		
		// Hide the checkbox
		if (settings.hide_checkbox) {jQuery(checkbox).hide();}
		
		// sync checkbox state with switch state
		if (settings.sync_checkbox) {state = jQuery(checkbox).attr('checked') == true ? 'on' : 'off';}
		
		// use images 
		if (settings.use_images) {
			track_bg = 'background-image:url('+settings.track_img+'); background-repeat:none; background-position: 0px 0px;';
			handle_bg = 'background-image:url('+settings.handle_img+'); background-repeat:none; background-position: 0px 0px;';			
		}else{
			track_bg = 'background-color:'+settings.track_bg_color+'; -webkit-border-radius: '+settings.switch_radius+'px;';
			handle_bg = 'background-color:'+settings.handle_bg_color+'; -webkit-border-radius:'+settings.switch_radius+'px;';
		}
		// make the container
		container = jQuery('<div class="switch-container" style="height:'+settings.switch_height+'px; width:'+settings.switch_width+'px; position: relative; overflow: hidden;font: normal normal normal 12px/18px \'Lucida Grande\', Verdana, sans-serif;"></div>');
		
		// make the track
		track = jQuery('<div class="track" style="height:'+settings.track_height+'px; width:'+settings.track_width+'px; position:absolute; '+track_bg+'"></div>');
		
		// Make the handle
		handle = jQuery('<div class="handle" style="height:'+settings.handle_height+'px; width:'+settings.handle_width+'px; left:'+(state == 'on' ? offset+'px' : '2px')+'; right:'+(state == 'on' ? '2px' : offset+'px')+'; top:2px; bottom:2px; position:absolute; '+handle_bg+'"></div>');
		
		// Make the labels
		label_on = jQuery ('<span class="label left" style="height:'+settings.handle_height+'px; width:'+settings.handle_width+'px; line-height:'+settings.track_height+'px; float:left; color: #fff;font-size:12px;text-shadow:#333 0px 1px 0px;text-align: center;"></span>');
		label_off = jQuery ('<span class="label right" style="height:'+settings.handle_height+'px; width:'+settings.handle_width+'px; line-height:'+settings.track_height+'px; float:right; color: #fff;font-size:12px;text-shadow:#333 0px 1px 0px;text-align: center;"></span>');
		
		// Insert the label text
		jQuery(label_on).text(settings.on_label);
		jQuery(label_off).text(settings.off_label);
		
		// insert into placeholder
		jQuery(checkbox).wrap(jQuery(container));
		jQuery(track).append(jQuery(label_on));
		jQuery(track).append(jQuery(label_off));
		jQuery(track).append(jQuery(handle));
		jQuery(checkbox).after(jQuery(track));
		
		var mySwitch = jQuery(checkbox).parent();
		
		jQuery(mySwitch).find('.track').mouseover(function(){
			jQuery(this).css("cursor", settings.mouse_over);
		});

		jQuery(mySwitch).find('.track').mouseout(function(){
			jQuery(this).css("background", settings.mouse_out);
		});

		// click handling
		jQuery(mySwitch).find('.track').click(function() {			
			if(state == 'on') {
				jQuery(mySwitch).find('.handle').animate({left: "2px",right: offset+"px"}, settings.speed, function() {
					switched_off_callback();
				});
				jQuery(checkbox).attr('checked',false);
				state = 'off';
			}else {
				jQuery(mySwitch).find('.handle').animate({left: offset+"px",right: "2px"}, settings.speed, function() {
					switched_on_callback();
				});
				jQuery(checkbox).attr('checked',true);
				state = 'on';
			}
		});		

	});
	
};
