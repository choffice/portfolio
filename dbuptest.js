//<script src="dbuptest.js"></script>
function upData(){
	let val1 = document.querySelectorAll('input[type=text]')[0].value;
	
	fetch("dbtest.php", {
		method: "POST",
		headers : {"Content-Type" : "application/x-www-form-urlencoded"},
		body : "val1=" + endcodeURIComponent(val1);
	})
	.then(response => response.text())
	.then(data => { console.log(data); });
}
