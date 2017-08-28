$(".signin-form").find("input, textarea").on("keyup blur focus", function(e) {
    var $this = $(this),
        label = $this.prev("label");

    if (e.type === "keyup") {
        if ($this.val() === "") {
            label.removeClass("active highlight");
        } else {
            label.addClass("active highlight");
        }
    } else if (e.type === "blur") {
        if ($this.val() === "") {
            label.removeClass("active highlight");
        } else {
            label.removeClass("highlight");
        }
    } else if (e.type === "focus") {
        if ($this.val() === "") {
            label.removeClass("highlight");
        } else if ($this.val() !== "") {
            label.addClass("highlight");
        }
    }
});
  
$(".signin-tab a").on("click", function(e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr("href");
    $(".signin-tab-content > div").not(target).hide();
    $(target).fadeIn(600);
});

$('#signinModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
});

$('#reg-btn').on('click', function(e){
    e.preventDefault();
    $('.signin-tab.signin').removeClass('active');
    $('.signin-tab.register').addClass('active');
    $("#signin").hide();
    $("#register").show();
});

$('#signin-btn').on('click', function(e){
    e.preventDefault();
    $('.signin-tab.register').removeClass('active');
    $('.signin-tab.signin').addClass('active');
    $("#register").hide();
    $("#signin").show();
});