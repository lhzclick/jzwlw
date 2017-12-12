/**
 * Created by liuh on 2017/12/12.
 */
    var on = true
$('.checked').on('click',function(){

    if(on){
        $('.hide').hide()
        on = false
    } else {
        $('.hide').show()
        on = true
    }
})
