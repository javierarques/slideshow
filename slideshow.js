(function($) {
	
	$.fn.slideshow = function(opts) {
		
		$.fn.slideshow.defaults = {
			fadeDuration : 400,
			interval : 3000,
			prevButtonText : 'previous',
			nextButtonText : 'next'
		};

		var settings = $.extend({}, $.fn.slideshow.defaults, opts);
		
		return this.each(function() {

			var $slideshow = $(this).prependTo('body'),
				$slides =  $(this).find('li').hide(),
				currentSlide = $slides.first(),
				timeout = 0,

				
				// Acepta como parámetro el siguiente slide
				// para los botones de navegación

				moveSlide = function ( nextSlide, resetTimer) {

				    
			    	if ( resetTimer ) {
		            	clearTimeout( timeout );

			    	}

					if ( ! nextSlide ) {
						nextSlide = findNext();
					}

				    currentSlide.stop().fadeOut( settings.fadeDuration, function () {
				        nextSlide.fadeIn( settings.fadeDuration);
				        currentSlide = nextSlide;
				    });

				    

					// set the timeout for showing
					// the next item in 5 seconds
					timeout = setTimeout(function() {
						moveSlide()
					}, settings.interval);	
				    
				},

				findNext = function () {
					var nextSlide = currentSlide.next();
				    if ( nextSlide.length == 0 ) {
				        nextSlide = $slides.first();
				    }
				    return nextSlide;
				},

				findPrev = function () {
					var prevSlide = currentSlide.prev();
				    if ( prevSlide.length == 0 ) {
				        prevSlide = $slides.last();
				    }
				    return prevSlide;
				},

				createNavigation = function () {

			        var nav = $("<div />");

		        	// Prev button
			        var prev = $("<button>Prev</button>").on('click', function () {
			        	moveSlide( findPrev(), true);
			        }). appendTo( nav );

		        
			        // Slides navigation
			        $slides.each( function ( index, value) {
			            var thisNavElement = $("<button>"+(index+1)+"</button>");
			            thisNavElement.on('click', function () {
			                moveSlide ( $( value ), true);
			            })
			            .appendTo( nav );
			        })
			        $slideshow.after( nav );

		        	// Next button
			        var next = $("<button>Next</button>").on('click', function () {
			        	moveSlide( findNext(), true);
			        }). appendTo( nav );	


				}

			createNavigation();

			// Initialize slider
			$slides.eq(0).fadeIn( settings.fadeDuration, function () { 
				// set the timeout for showing
				// the next item in 5 seconds
				timeout = setInterval(function() {
					moveSlide()
				}, settings.interval );	

			});

		});

	}
	
})(jQuery);

$('#slideshow').slideshow( { interval: 2000, fadeDuration: 200 });