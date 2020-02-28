const tf = require("@tensorflow/tfjs");
require('@tensorflow/tfjs-node');

// model = tf.loadLayersModel("./tfjs-model/model.json");
(async function predict() {
	let model = await tf.loadLayersModel("file://D:/DLCourse/DemoTfJs/tfjs-model/model.json");
	if (model !== null) {
	    tf.tidy(() => {
	    // Prepare input data as a 2D `tf.Tensor`.
	    const input = tf.tensor2d([3,4,4,5], [1, 4]);

	    // Call `model.predict` to get the prediction output as probabilities for
	    // the Iris flower categories.

	    const predictOut = model.predict(input);
	    const logits = Array.from(predictOut.dataSync());
	    console.log("logits: ", logits);
	  });
	}
})();

