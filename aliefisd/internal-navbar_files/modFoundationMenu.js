$(function() {
    //  init() function
    var init = function(){
      var ele = $('.dropdown');
      $.each( ele, function() {    
        $(this).removeClass('right');
        $(this).removeClass('left');
      });
      
      var ele_right = $('.pos_right');
      $.each( ele_right, function() {    
        $(this).removeClass('pos_right');
      });
      
      var ele_left = $('.pos_left');
      $.each( ele_left, function() {    
        $(this).removeClass('pos_left');
      });
    };
    
    //    refresh_menu_position() function    
    var refresh_menu_position = function(){
      var elem = $('.dropdown');
      var width = $(window).width();
      $.each( elem, function() {    
        var ul_pos = parseInt($(this).offset().left) + parseInt($(this).width());
        var ul_pos_re = $(this).offset().left;
        //To the right Set 
        if(ul_pos > width){
			    if($(this).parent().parent().attr('class') == 'left'){
				    $(this).addClass('pos_right');
			    }else{
				    $(this).parent().parent().addClass('right');
			    }
		    }

        //To the left Set 
        if(ul_pos_re < 0){
          if($(this).parent().parent().attr('class') == 'right'){
            $(this).addClass('pos_left');
          }else{
            $(this).parent().parent().addClass('left');
          }
        }
      });
    };

	  $(window).load(function() {
		  init();
		  refresh_menu_position();
		  $.each( $('.left.right'), function() {    
			  $(this).removeClass('right');
		  });
	  });
    
    $(window).resize(function() {
      init();
      refresh_menu_position();
      
      $.each( $('.left.right'), function() {    
        $(this).removeClass('right');
      });
    });
})


    


