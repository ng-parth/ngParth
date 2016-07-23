/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});


	/*----------------------------------------------------- */
	/* Custom JS
	 ------------------------------------------------------- */


	//TOTAL EXPERIENCE
	var startDate = new Date("2013 march");
	var today = new Date();
	var yearInMS = 365 * 24 * 60 * 60 * 1000;
	var monthInMS = 30 * 24 * 60 * 60 * 1000;
	var totalExperienceInMS = today.getTime() - startDate.getTime() + (3 * monthInMS);
	var years = Math.floor(totalExperienceInMS / yearInMS);
	var months = Math.round((totalExperienceInMS - (years * yearInMS)) / monthInMS);
	var totalExp = years;
	if (months > 5 && months < 11) {
		totalExp += 0.5;
	} else if (months > 10) {
		totalExp++;
	}
	$('#expYears')[0].innerHTML = totalExp;

	//EDUCATION
	var br = '</br>';
	var eduTimeline = [];
	var hsc = {
		degree: 'HSC',
		from: 'Passed',
		to: 'March 2008',
		institute: 'Ashadham, Vapi',
		description: ''
	};
	eduTimeline.push(hsc);
	var be = {
		degree: 'Bachelor Degree',
		from: '2008',
		to: '2012',
		institute: 'Charotar Institute Of Technology',
		description: 'Completed my Bachelor Of Engineering (BE) in Information Technology with 7.55 CGPA.'
	};
	eduTimeline.push(be);
	var germany = {
		degree: 'Exchange Program',
		from: 'Sep 2012',
		to: 'Dec 2012',
		institute: 'Study and Internship @ Germany',
		description: ''
	};
	eduTimeline.push(germany);

	//WORK EXPERIENCE

	var workExp = [];
	var vcs = {
		company: 'Value Chain Solution',
		link: 'http://www.valuechain.co.in/',
		from: 'January 2012',
		to: 'April 2012',
		title: 'Software Engineer',
		description: 'This was the start of my industrial experience and it taught me a lot: technical as well as non-tech aspects of the dymanic IT world.' + br +
					'As a part of professional training at VCS, Ahmedabad I was given 2 projects to accomplish which were companies internal projects.' + br +
					'I was responsible for documentation and development of two projects.' + br + '1) Project Knowledge Base' + br + '2) Project Review.'
	};
	workExp.push(vcs);
	var bhavyaMlm = {
		company: 'Bhavya Technologies',
		link: 'http://www.bhavyatech.co.in/',
		from: 'July 2011',
		to: 'April 2012',
		title: 'Trainee',
		description: 'This was my final year project. With support from Bhavya technologies, Ahmedabad this project was the first major project carried out by me in team of four.' + br +
					'This was an attempt to create a customised MLM system which could be easily configured to matrix as desired by the client.'
	};
	workExp.push(bhavyaMlm);
	var radix = {
		company: 'Radix',
		link: 'http://radixweb.com/',
		from: 'March 2013',
		to: 'October 2014',
		title: 'Web Engineer',
		description: 'Radix provides outsourcing services in the fields of Cloud Computing, Printing related software and web and mobile apps development services.' + br +
					'As a Software Engineer, I was a part of development team where my roles and responsibilities includes but not limited to overall development of project from designing, development, unit testing as well as deployment.'
	};
	workExp.push(radix);
	var fundoo = {
		company: 'Fundoo Solutions',
		link: 'http://www.befundoo.com',
		from: 'October 2014',
		to: 'May 2015',
		title: 'Software Engineer - Consultant',
		description: 'I was involved in providing best possible solution to client and development, extension and migration of there existing projects.\n' + br +
		'Some projects which I worked on are:\n\n' + br +
		'1) Custom Editor: A text editor which provides intelli-sense based on custom language as per clients requirement. Also allowing to add static and dynamic methods, functions and formulae.\n\n' + br +
		'2) Internationalisation support: Module and routes based efficient internationalisation system for multiple languages.\n\n' + br +
		'3) Working on small parts of multiple android app.'
	};
	workExp.push(fundoo);
	var hs = {
		company: 'Hopscotch',
		link: 'https://www.hopscotch.in',
		from: 'June 2015',
		to: 'Present',
		title: 'Software Engineer',
		description: 'Hopscotch.in is a leading discovery-based e-Commerce destination for Indian moms, offering a wide range of curated children’s merchandise at affordable prices.'
	};
	workExp.push(hs);

	createEduTimelines(eduTimeline);
	createWorkTimelines(workExp);

	function createEduTimelines(edu) {
		edu.reverse();
		var eduStr = '';
		$.each(edu, function(idx, e) {
			var template = '' +
					'<div class="timeline-block"><div class="timeline-ico"><i class="fa fa-graduation-cap"></i></div>' +
					'<div class="timeline-header"><h3>' + e.degree + '</h3><p>' + e.from + ' - ' + e.to + '</p></div>' +
					'<div class="timeline-content"><h4>' + e.institute + '</h4><p>' + e.description + '</p></div></div> <!-- /timeline-block -->';
			eduStr += template;
		});
		$('#education')[0].innerHTML = eduStr;
	}
	function createWorkTimelines(work) {
		work.reverse();
		var expStr = '';
		$.each(work, function(idx, w) {
			var template = '' +
					'<div class="timeline-block"><div class="timeline-ico"><i class="fa fa-briefcase"></i></div>' +
					'<div class="timeline-header"><a href="' + w.link + '" title="' + w.link + '" target="_blank"><h3 class="company">' + w.company + '</h3></a><p>' + w.from + ' - ' + w.to + '</p></div>' +
					'<div class="timeline-content"><h4>' + w.title + '</h4>' +
					'<p>' + w.description + '</p></div></div> <!-- /timeline-block -->';
			expStr += template;
		});
		$('#experience')[0].innerHTML = expStr;
	}
})(jQuery);