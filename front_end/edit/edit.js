$(function (){
    var $url = $('#url');
    var $type = $('#type');
    var $tags = $('#tags');

    $('#edit').on('click',function(){
        var order = {
            url:$url.val(),
            type:$type.val(),
            tags:$tags.val(),

        };
        console.log(order);
        /*$.ajax({
            type:'PUT',
            url:'https://6hyu9pfbw1.execute-api.us-east-1.amazonaws.com/dev/api',
            data:JSON.stringify(order),
            contentType:'application/json',
            dataType:'json',
            success:function(newOrder){
                console.log(newOrder);
            },
            error:function(){
                alert('error saving');
            }

        })*/
    })

});