function handleChange()
{
    // Get target URL
    var url = $(this).attr("href");
    if (!url) {
        // POST from form, target is question 1
        url = "/q1";

        // Get form values
        var $inputs = $("form :input");
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });

        // Send email with data
        /*Email.send({
            SecureToken: "",
            To: "",
            From: "",
            Subject: `NOBEL: ${values["nombre"]}`,
            Body: `Nombre: ${values["nombre"]}<br>Apellidos: ${values["apellidos"]}<br>Email: ${values["email"]}<br>Tel: ${values["phone"]}`
        });*/

        // Store email in cookies
        document.cookie = `email=${values["email"]}; max-age=86400; Path=/;`;
    }
    else if (url.startsWith("http") || url.startsWith("mailto")) {
        // Cross-site href, ignore
        return true;
    }
    else if (url.startsWith("/q")) {
        // Set cookie with selected answer before leaving
        document.cookie = `q${parseInt(url.substring(2)) - 1}=${$(this).attr('class')}; max-age=86400; Path=/;`;
    }
    else if (url.startsWith("/resultado")) {
        // Set cookie with selected answer before leaving
        document.cookie = `q8=${$(this).attr('class')}; max-age=86400; Path=/;`;
    }

    // Get container to replace
    var $container = $("#container");

    // Set to loading
    $container.html(`<div id="loading" style="position: absolute; top: 50%; left: 50%; text-align: center; font-family='Alfred Sans Regular'; font-size: 1.1rem; color: #8a8a8d;">Cargando...</div>`);

    // Switch contents with transition
    $.get(url, function(data)
    {
        // Fade out loading screen
        $("#loading").fadeOut(function()
        {
            let loading = $(this);
            // Set container data to new page
            $container.hide().html(data).fadeIn(400, function() {
                // Remove loading
                loading.remove();

                // Push new URL
                history.pushState({}, "", url);
            });
        });
    });

    return false;
}

// Use animated transition on a href and form send
$(function()
{
    $('a').click(handleChange);
    $('form').submit(handleChange);
});

// Enable back functionality
window.addEventListener("popstate", function() {
    window.location.reload();
});
