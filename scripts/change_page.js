function handleChange(){var t=$(this).attr("href");if(t){if(t.startsWith("http")||t.startsWith("mailto"))return!0;t.startsWith("/q")?document.cookie=`q${parseInt(t.substring(2))-1}=${$(this).attr("class")}; max-age=86400; Path=/;`:t.startsWith("/resultado")&&(document.cookie=`q8=${$(this).attr("class")}; max-age=86400; Path=/;`)}else{t="/q1";var a=$("form :input"),e={};a.each((function(){e[this.name]=$(this).val()})),document.cookie=`email=${e.email}; max-age=86400; Path=/;`}var i=$("#container");return i.html('<div id="loading" style="position: absolute; top: 50%; left: 50%; text-align: center; font-family=\'Alfred Sans Regular\'; font-size: 1.1rem; color: #8a8a8d;">Cargando...</div>'),$.get(t,(function(a){$("#loading").fadeOut((function(){let e=$(this);i.hide().html(a).fadeIn(400,(function(){e.remove(),history.pushState({},"",t)}))}))})),!1}$((function(){$("a").click(handleChange),$("form").submit(handleChange)})),window.addEventListener("popstate",(function(){window.location.reload()}));