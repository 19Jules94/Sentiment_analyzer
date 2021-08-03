var acumulador = 0;
var flagData = false;
var flag_porcentaje = false;
var content = {}
var clean = function () {
    $("#output_twitter").children().remove();
    flagData = false;
    flag_porcentaje = false;
    acumulador = 0;
    chart(0)
    $("#salida").css({ "display": "none" });
    $("#twitterChart").css({ "display": "none" })
    $("#output_twitter").css({ "width": "590px" })
    $("#btn-send").show()
    $("#btncln").css({ "display": "none" });
}

var reload = function () {
    location.reload()
}

function percent() {
    if (flag_porcentaje == false) {
        for (i = 0; i < content.porcentaje.length; i++) {
            var p = ''
            d2 = document.getElementById(i)
            var newDiv2 = document.createElement('div');
            newDiv2.classList.add("class", "porcentaje");
            newDiv2.style.width = "140px";
            p += (content.porcentaje[i][1] * 100).toFixed(2);

            newDiv2.innerHTML = "<b>" + p + "%" + "<b/>"
            d2.appendChild(newDiv2)
            acumulador += parseFloat(p)

            flag_porcentaje = true;
        }

        acumulador = acumulador / content.porcentaje.length
        var positivo = 100 - acumulador
        var lista = [acumulador, positivo]
        console.log('cambio');

        $("#salida").show()
        chart(lista)

    }
    $("#btncln").unbind("click", clean)
    $("#btncln").click(clean)
    $("#btnclear").unbind("click", reload)
    $("#btnclear").click(reload)


}

$(document).ready(function () {
    selector();
    function login() {
        $.ajax({
            url: "/process_twitter",
            data: $('form').serialize(),
            type: 'POST',
            success: function (response) {

                content = JSON.parse(response)
                console.log(content);
                if (content["tag"] == 'hashtag' || content["tag"] == 'user') {
                    var output_file = document.getElementById('output_twitter')
                    if (flagData == false) {
                        for (i = 0; i < content.text.length; i++) {
                            var a = ''
                            var divcContent = document.createElement('div')
                            divcContent.setAttribute("id", i)
                            divcContent.setAttribute("class", "contenido")
                            var newDiv = document.createElement('div')
                            newDiv.setAttribute("id", i)
                            for (z = 0; z < content.text[i].length; z++) {
                                a += content.text[i][z];
                            }
                            newDiv.innerHTML = a
                            divcContent.appendChild(newDiv)
                            output_file.appendChild(divcContent)
                            flagData = true;
                        }
                        console.log(flagData);

                        percent()
                        $("#btnclear").show()
                        $("#btncln").show()
                        $("#btn-send").css({ "display": "none" })
                    }
                } else if (content["tag"] == 'url') {

                    var texto = document.createElement('div')

                    var porcen = document.createElement('div')
                    porcen.style.width = "140px"
                    porcen.setAttribute("class", "porcentaje")

                    var union = document.createElement('div')
                    union.setAttribute("class", "content")

                    var output_file = document.getElementById('output_twitter')
                    texto.innerHTML = content["text"]
                    porcen.innerHTML = "<b>" + ((content["porcentaje"][1]) * 100).toFixed(2) + "% </b> "

                    union.appendChild(texto)
                    union.appendChild(porcen)
                    output_file.appendChild(union)


                    output_file.style.width = "1000px"

                    $("#salida").show()

                    $("#btnclear").show()
                    $("#btncln").show()
                    $("#btn-send").css({ "display": "none" })
                    $("#btncln").unbind("click", clean)
                    $("#btncln").click(clean)
                    $("#btnclear").unbind("click", reload)
                    $("#btnclear").click(reload)
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    $("#twitter-text").submit(function (event) {
        event.preventDefault();
        validateTwitter();
        login()
    })
})
let twitterChart;
function chart(porcentajes) {
    console.log("grafico");
    var ctx = document.getElementById('twitterChart');

    if (twitterChart) {

        twitterChart.destroy();
    }
    twitterChart = new Chart(ctx, {

        type: 'doughnut',
        data: {
            labels: ['Yes', 'No'],
            datasets: [{
                label: '# of Votes',
                data: porcentajes,
              
                backgroundColor: [
                    'rgba(255, 139, 139, 1)',
                    'rgba(163, 234, 202, 1)'

                ],
                hoverOffset: 6,
                borderColor: [
                    'rgba(255, 139, 139, 1)',
                    'rgba(163, 234, 202, 1)'

                ],
                circumference: 180,
                rotation: -90,
                borderWidth: 1
            }]
        },

    });
}