document.addEventListener("DOMContentLoaded", postForm);

function postForm() {
    document.getElementById("submit-info").addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        var postSite = "http://httpbin.org/post";
        var payload = {
            "name": null,
            "age": null
        };

        payload.name = document.getElementById("name").value;
        payload.age = document.getElementById("age").value;

        req.open("POST", postSite, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.addEventListener("load", function() {
            if(req.status >= 200 && req.status < 400){
                var res = JSON.parse(JSON.parse(req.responseText).data);
                display(res);
            } else {
                console.log("Error");
            }
        });

        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}

function display(res) {
    document.getElementById("nameResponse").textContent = res.name;
    document.getElementById("ageResponse").textContent = res.age;
}