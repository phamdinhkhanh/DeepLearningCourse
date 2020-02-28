// import * as tf from "@tensorflow/tfjs";
// const tf = require("@tensorflow/tfjs");

// async function loadModel(){
// 	console.log("click load!");
// 	// show image loading
// 	document.getElementById("progress-box").style.display = "block";
// 	// start chrome --user-data-dir="C:/Chrome dev session" --disable-web-security
// 	// let model = await tf.loadLayersModel("./tfjs-model/model.json");
// 	// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
// 	// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
// 	let model = await tf.loadLayersModel("https://raw.githubusercontent.com/phamdinhkhanh/DLCourseDemoTfjs/master/tfjs-model/model.json");
	
// 	if (model !== "undefined"){
// 		document.getElementById("progress-box").style.display = "none";
// 		alert("Model Loaded!");
// 	}
// }

function updateClick(id_inc_btn, id_dec_btn, id_inp_btn){
	console.log("update CLick");
	const increase = 0.1;

	id_inc_btn.addEventListener("click", () => {
		id_inp_btn.value = (Number(id_inp_btn.value)+increase).toFixed(1);
		
	});

	id_dec_btn.addEventListener("click", () => {
		id_inp_btn.value = (Number(id_inp_btn.value)-increase).toFixed(1);
		
	})
	// update dự báo
	predictInput();

}


function getInput(){
	const sepal_width = document.getElementById("sepal-width");
	const sepal_length = document.getElementById("sepal-length");
	const petal_width = document.getElementById("petal-width");
	const petal_length = document.getElementById("petal-length");

	return [parseFloat(sepal_width.value), parseFloat(sepal_length.value), parseFloat(petal_width.value), parseFloat(petal_length.value)]
}


function predictInput(){
	if (typeof model == "undefined"){
			alert("Model have not yet load!");
			document.getElementById("progress-box").style.display = "none";
		} else {
			document.getElementById("progress-box").style.display = "block";
			tf.tidy(() => {
	    	// Prepare input data as a 2D `tf.Tensor`.
	    	const input = getInput()
		    const inputTensor = tf.tensor2d(input, [1, 4]);

		    // Call `model.predict` to get the prediction output as probabilities for
		    // the Iris flower categories.

		    const predictOut = model.predict(inputTensor);
		    const logits = Array.from(predictOut.dataSync());
		    console.log("logits: ", logits);
		    // render into html
		    const iris = document.getElementById("iris");
			const sentosa = document.getElementById("sentosa");
			const virginica = document.getElementById("virginica");

			console.log(logits[0])
			console.log(logits[1])
			console.log(logits[2])
			iris.textContent = logits[0].toFixed(2);
			sentosa.textContent = logits[1].toFixed(2);
			virginica.textContent = logits[2].toFixed(2);
			document.getElementById("progress-box").style.display = "none";
		})}	
}

let model;

(function updateBtnClickScreen(){
	console.log("click");
	// Update increase and decrease value
	const sepal_width_inc = document.getElementById("sepal-width-inc");
	const sepal_width_dec = document.getElementById("sepal-width-dec");
	const sepal_width = document.getElementById("sepal-width");
	updateClick(sepal_width_inc, sepal_width_dec, sepal_width);

	const sepal_length_inc = document.getElementById("sepal-length-inc");
	const sepal_length_dec = document.getElementById("sepal-length-dec");
	const sepal_length = document.getElementById("sepal-length");
	updateClick(sepal_length_inc, sepal_length_dec, sepal_length);

	const petal_width_inc = document.getElementById("petal-width-inc");
	const petal_width_dec = document.getElementById("petal-width-dec");
	const petal_width = document.getElementById("petal-width");
	updateClick(petal_width_inc, petal_width_dec, petal_width);

	const petal_length_inc = document.getElementById("petal-length-inc");
	const petal_length_dec = document.getElementById("petal-length-dec");
	const petal_length = document.getElementById("petal-length");
	updateClick(petal_length_inc, petal_length_dec, petal_length);

	// Load model
	const btn_load = document.getElementById("btn-load");
	btn_load.addEventListener("click", async () => {
		console.log("click load");
		document.getElementById("progress-box").style.display = "block";
		// start chrome --user-data-dir="C:/Chrome dev session" --disable-web-security
		// let model = await tf.loadLayersModel("./tfjs-model/model.json");
		// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
		// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
		model = await tf.loadLayersModel("https://raw.githubusercontent.com/phamdinhkhanh/DLCourseDemoTfjs/master/tfjs-model/model.json");
		if (model !== "undefined"){
			document.getElementById("progress-box").style.display = "none";
			alert("Model Loaded!");
		}	
	});

	// Predict
	const btn_pred = document.getElementById("btn-predict");
	btn_pred.addEventListener("click", async () => {
		console.log("click load");
		// start chrome --user-data-dir="C:/Chrome dev session" --disable-web-security
		// let model = await tf.loadLayersModel("./tfjs-model/model.json");
		// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
		// let model = await tf.loadLayersModel("file:///D:/DLCourse/DemoTfJs/tfjs-model/model.json");
		predictInput();
	});

	})();
	
