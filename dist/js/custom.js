


(function ($) {

        $("#about").css("pointer-events", "none");
        
        let scrollMemory = null;
    
        function isScrolledIntoView(elem) {
            var $elem = $(elem);
            var $window = $(window);
    
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
    
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();
    
            return elemTop <= docViewBottom && elemBottom >= docViewTop;
        }
    
        function showinfo() {
            $("html, body").scrollTop($("#about").offset().top);
            //$("#about").css("visibility", "visible");
            $("#about").css("display", "block");
            $("#about").css("opacity", "1");
            $("#about").css("pointer-events", "auto");
            //$("#content").css("visibility", "hidden");
            
            $("#content").css("opacity", "0");
            $("#content").css("display", "none");

            $("#work").css("display", "none");
            $("footer").css("display", "none");
    
        }
    
        function hideinfo() {
            $("html, body").scrollTop(scrollMemory);
            //$("#content").css("visibility", "visible");
            
            $("#content").css("opacity", "1");
            //$("#about").css("visibility", "hidden");
            $("#about").css("display", "none");
            $("#about").css("opacity", "0");
            $("#about").css("pointer-events", "none");
            $("#content").css("display", "block");

            $("#work").css("display", "block");
            $("footer").css("display", "block");
        }
    
    
    
    
        ///THE ARROW
        $(document).ready(function () {
    
            window.addEventListener("scroll", function (e) {
                let initialArrow = $("#scrolldowninitial");
                let imagesArrow = $("#scrolldownimages");
                if (window.scrollY > window.innerHeight) {
                    initialArrow.css("display", "none");
                    imagesArrow.css("display", "block");
                }
                if (window.scrollY < window.innerHeight / 10) {
                    initialArrow.css("display", "block");
                    imagesArrow.css("display", "none");
                }
            });
    
    
    
            $(".opennav").on("click", function () {
                showinfo();
            });
    
            $(".closenav").on("click", function () {
                hideinfo();
            });
    
            $(".scrolldown.images").on("click", function () {
                ;
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
            });
            $(".scrolldown.info").on("click", function () {
                $("html, body").animate({
                    scrollTop: $(".aboutimage").height()
                }, "slow");
            });
        });
    
    
    
    
    
    
        $(window).scroll(function () {
    
            var scrollPosition = $(window).scrollTop();
            scrollMemory = scrollPosition;
    
        });
    
    
    
    
    })(jQuery);




    //$(function(){  // $(document).ready shorthand
        //$('.monster').fadeIn('slow');
      //});
      
      $(document).ready(function() {
          
          /* Every time the window is scrolled ... */
          $(window).scroll( function(){
          
              /* Check the location of each desired element */
              $('.fade').each( function(i){
                  
                  var bottom_of_object = $(this).position().top + $(this).outerHeight();
                  var bottom_of_window = $(window).scrollTop() + $(window).height() + 700;
               
                  
                  /* If the object is completely visible in the window, fade it it */
                  if( bottom_of_window > bottom_of_object ){
                      
                      $(this).animate({'opacity':'1'},250);
                          
                  }
                  
              }); 
          
          });
          
      });


/*
    $(window).on("load",function() {
        $(window).scroll(function() {
          var windowBottom = $(this).scrollTop() + $(this).innerHeight();
          $(".fade").each(function() {
            // Check the location of each desired element 
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            
            // If the element is completely within bounds of the window, fade it in 
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
              if ($(this).css("opacity")==0) {$(this).fadeTo(300,1);}
            } else { //object goes out of view (scrolling up)
              if ($(this).css("opacity")==1) {$(this).fadeTo(300,0);}
            }
          });
        }).scroll(); //invoke scroll-handler on page-load
      });
*/


/*
show.bs.collapse	This event fires immediately when the show instance method is called.
shown.bs.collapse	This event is fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete).
hide.bs.collapse	This event is fired immediately when the hide method has been called.
hidden.bs.collapse	This event is fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete).
*/

/* Customize Project Info Collapse */
var myCollapsible = document.getElementById('collapseProjectInfo')
myCollapsible.addEventListener('show.bs.collapse', function () {
  // do something...
  //alert('test');
})




/* ---- Toggle Video Sound ----- */

/*function toggleSound() {

    this.$('.video-content-video').muted = !this.muted; 

    $('.video-content-sound').text(function(i, text){
        return text === "Sound On" ? "Sound Off" : "Sound On";
    })

  }*/


  


function toggleSound() {
    //$("video").prop('muted', true);  //this mutes all video
    
    if( $("video").prop('muted', true) )
    {
        //$(event.currentTarget).prop('muted', false); //play clicked video
        $(event.target).prop('muted', false); //play clicked video
    }

    else {
       
    $("video").prop('muted', true);
    }


    /*this.muted = !this.muted; 

    $("#mute-video").click( function (){
        if( $("video").prop('muted', true) )
        {
            $("video").prop('muted', false);
        }
    
        else {
        $("video").prop('muted', true);
        }
    
    });*/





    $('.video-content-sound').text(function(i, text){
        return text === "Sound On" ? "Sound Off" : "Sound On";
    })

  }



