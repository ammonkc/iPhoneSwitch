/******************************************************* 
*  jQuery iphoneSwitch plugin v0.9                     *
*                                                      *
*  jquery.iphoneSwitch.js                              *
*  Author: Ammon Casey                                 *
*  Website: http://www.brokenparadigmlabs.com          *
*  Hosted: http://github.com/ammonkc/iPhoneSwitch      *
*  Twitter: @ammonkc                                   *
*  Date: 5.17.2011                                    *
*                                                      *
*  Copyright (c) 2010, Ammon Casey                     *
*  licensed under the MIT license:                     *
*  http://www.opensource.org/licenses/mit-license.php  *
********************************************************/
(function($){
    jQuery.fn.iphoneSwitch = function(start_state, switched_on_callback, switched_off_callback, options) {
    
    	var state = (start_state == 'on' ? true : false);
    	
    	// define default settings
    	var settings = {
    	    track_class             : 'track',
    	    handle_class            : 'handle',
    	    label_class             : 'label',
    		mouse_over              : 'pointer',
    		mouse_out               :  'default',
    		hide_checkbox           : true,
    		sync_checkbox           : true,
    		use_images              : true,
    		speed                   : '250',
    		on_label                : 'On',
    		off_label               : 'Off',
    		switch_height           : 28,
    		switch_width            : 93,
    		switch_radius           : 4,
    		track_img               : 'images/switch_track.png',
    		track_bg_color          : '#5f6777',
    		track_width             : 93,
    		track_height            : 27,
    		track_padding           : 0,
    		track_dropshadow_color  : 'rgba(255, 255, 255, 0.15)',
    		handle_img              : 'images/switch_handle.png',
    		handle_bg_color         : '#f9f9f9',
    		handle_border_color     : '#d0d0d0',
    		handle_height           : 25,
    		handle_width            : 40,
    		label_color             : "#ffffff",
    		label_font_size         : 12
    	};
    
    	if(options) {
    		jQuery.extend(settings, options);
    	}
    
    	// create the switch
    	return this.each(function() {
    		var checkbox = jQuery(this);
    		if (!checkbox.is(':checkbox')) { return; }
    		
    		var container;
    		var track;
    		var handle;
			var track_padding;
    		
    		// Hide the checkbox
    		if (settings.hide_checkbox) {checkbox.hide();}
    		
    		// sync checkbox state with switch state
    		if (settings.sync_checkbox) {state = checkbox.is(':checked')}    		
    		
    		// use images 
    		if (settings.use_images) {
    			track_bg = 'url('+settings.track_img+')';
    			handle_bg = 'url('+settings.handle_img+')';
				track_padding = settings.track_padding;
    		}else{
    			track_bg = settings.track_bg_color;
    			handle_bg = settings.handle_bg_color;
    			// tweak padding for css only version
    			track_padding = settings.track_padding + 1;
    		}
    		
    		// Positions
    		var offset = (settings.track_width - track_padding) - settings.handle_width;
    		var left = (state ? offset : track_padding);
    		var right = (state ? track_padding : offset);
    		
    		/**** make the container ****/
    		container = jQuery('<div />')
    		                .addClass('switch-container')
    		                .css({
    		                    'height':settings.switch_height,
    		                    'width':settings.switch_width,
    		                    'position':'relative',
    		                    'overflow':'hidden',
    		                    'font':"normal normal normal 12px/18px 'Lucida Grande', Verdana, sans-serif"
    		                    });
    		/**** make the track ****/
    		track = jQuery('<div />')
    		            .addClass(settings.track_class)
    		            .css({
    		                'height':settings.track_height,
    		                'width':settings.track_width,
    		                'position':'absolute',
    		                'background-image':track_bg,
    		                'background-repeat':'no-repeat'
    		                });
    		
    		/**** Make the handle ****/
    		handle = jQuery('<div />')
    		            .addClass(settings.handle_class)
    		            .css({
    		                'height':settings.handle_height,
    		                'width':settings.handle_width,
    		                'left':left,
    		                'right':right,
    		                'top':1,
    		                'bottom':1,
    		                'position':'absolute',
    		                'background-image':handle_bg,
    		                'background-repeat':'no-repeat',
    		                'cursor':'pointer',
    		                '-webkit-user-select':'none',
    		                '-moz-user-select':'none',
    		                'user-select':'none'
    		                });
    
    		/**** Make the labels ****/
    		label_on = jQuery('<span />')
    		                .addClass(settings.label_class)
    		                .addClass('left')
    		                .text(settings.on_label)
    		                .css({
    		                    'height':settings.handle_height,
    		                    'width':settings.handle_width,
    		                    'line-height':settings.track_height + 'px',
    		                    'color':settings.label_color,
    		                    'font-size':settings.label_font_size,
    		                    'text-align':'center',
    		                    'text-shadow':'#333 0px 1px 0px',
    		                    '-webkit-user-select':'none',
    		                    '-moz-user-select':'none',
    		                    'user-select':'none',
    		                    'cursor':'default',
    		                    'float':'left'	                    
    		                    });
    		label_off = jQuery('<span />')
    		                .addClass(settings.label_class)
    		                .addClass('right')
    		                .text(settings.off_label)
    		                .css({
    		                    'height':settings.handle_height,
    		                    'width':settings.handle_width,
    		                    'line-height':settings.track_height + 'px',
    		                    'color':settings.label_color,
    		                    'font-size':settings.label_font_size,
    		                    'text-align':'center',
    		                    'text-shadow':'#333 0px 1px 0px',
    		                    '-webkit-user-select':'none',
    		                    '-moz-user-select':'none',
    		                    'user-select':'none',
    		                    'cursor':'default',
    		                    'position':'absolute',
    		                    'top':1,
    		                    'right':1,
    		                    'bottom':1	                    
    		                    });
    		// CSS3 - imagless 
    		if (!settings.use_images) {
    			track.css({
    					'background-color':settings.track_bg_color,
    					'-webkit-border-radius':settings.switch_radius,
    					'-moz-border-radius':settings.switch_radius,
    					'border-radius':settings.switch_radius,
    					'-webkit-box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'-moz-box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'-webkit-background-clip':'padding-box',
    					'background-clip':'padding-box'
    					});
    			handle.css({
    					'background':'-moz-linear-gradient(-90deg, #fcfcfc, #e6e6e6)',
    					'background-image':'-webkit-gradient(linear, 0% 0%, 0% 100%, from(#fcfcfc), to(#e6e6e6))',
    					'background-color':settings.handle_bg_color,
    					'-webkit-border-radius':settings.switch_radius -1,
    					'-moz-border-radius':settings.switch_radius -1,
    					'border-radius':settings.switch_radius -1,
    					'-webkit-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'-moz-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'-webkit-background-clip':'padding-box',
    					'background-clip':'padding-box'
    					});
    		}
    		
    		/* insert into placeholder */
    		checkbox.wrap(container);
    		track.append(label_on)
    		     .append(label_off)
    		     .append(handle);
    		checkbox.after(track);
    		
    		var mySwitch = checkbox.parent();
    		
    		// click handling
    		jQuery(mySwitch).find('.' + settings.handle_class).click(function() {
    		    var myHandle = jQuery(this);
    		    var cb = myHandle.parent().siblings('input:checkbox');
    		    var checkd = cb.is('input:checked');
    		    var l = (checkd ? track_padding : offset);
    		    var r = (checkd ? offset : track_padding);
    		    var switched_callback = (checkd ? switched_off_callback : switched_on_callback);
    		    // slide the handle
    		    slide_handle(myHandle, l, r, settings.speed, switched_callback);
    		    cb.attr('checked', (checkd ? false : true))
    		      .trigger('change');
    		});//- END .click()
    
    	});//- END .each()
    }//- END $.fn.iphoneSwitch()
    
    /*** Private functions ***/
    function slide_handle(handle, left_pos, right_pos, speed, switch_callback)
    {
        jQuery(handle).animate({left: left_pos,right: right_pos}, speed, function() {
        	if (typeof switch_callback == 'function')
        	{
        	    switch_callback.call(this);
        	}//- END if
        });//- END animate
    }//- END slide_handle()
    
})(jQuery);