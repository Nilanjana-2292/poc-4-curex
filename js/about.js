// Facts counter
$('[data-toggle="counter-up"]').each(function () {
    var $this = $(this);
    var finalCount = $this.attr('data-count');

    $this.prop('Counter', 0).animate({
        Counter: finalCount
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $this.text(Math.ceil(now));
        },
        complete: function () {
            $this.text(finalCount + '+');
        }
    });
});
