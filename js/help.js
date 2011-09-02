/*
 * Displays a new Tip.
 *
 * resp - the Response hash
 *        tip - the String tip to display
 */
function tip(resp){
  $('.tip-body .load').hide()
  $('.tip-body > p').html(resp['tip'])
}

/*
 * Updates the status div.
 *
 * resp - the Response hash
 *        status - the status of GitHub
 */
function updateStatus(resp){
  current = resp['status']
  if (current == 'majorproblem')
    message = "Major service disruption"
  else if (current == 'minorproblem')
    message = "Minor service disruption"
  else
    message = "All systems operational"

  $('.status-box').removeClass('loading')
  $('.status-box').addClass(current)
  $('.status-box > a').text(message)
}

$(document).ready(function(){
  $(".more-info h4").click(function () {
      var contentdiv = $(this).parent().find(".more-content")
      var h4 = $(this).parent().find("h4")
      h4.toggleClass("compressed expanded")
      if (contentdiv.is(":hidden")) {
          contentdiv.slideDown("50")
      } else {
          contentdiv.slideUp("50")
      }
  })

  $.ajax({
      url: 'http://status.github.com/current-status.json',
      type: 'GET',
      dataType: 'jsonp',
      error: function(resp){
      }
    })

  var new_tip = function() {
   $.ajax({
      url: 'https://github.com/tips?callback=tip',
      type: 'GET',
      dataType: 'jsonp',
      error: function(resp){
        $('.tip-body > p').text('There was a problem loading your tip.')
      }
    })
    return false
  }

  $('.tip-box > a').click(function() {
    $('.tip-body .load').show()
    $('.tip-body > p').text('Loading next tip...')
    new_tip()
    return false
  })

  new_tip()
});
