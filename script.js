window.onload = init();

function init() {
	var canvas = document.getElementById("canvas1");

	var AB = 260000; //510
	var BC = 180000; //424
	var CA = 200000; //447
	var AP = 80000; //283
	var BP = 100000; //316
	var CP = 40000; //200*/

	/*var AB = Math.sqrt(260000);
	var BC = Math.sqrt(180000);
	var CA = Math.sqrt(200000);
	var AP = Math.sqrt(80000);
	var BP = Math.sqrt(100000);
	var CP = 200;*/

	/*var AB = Math.sqrt(260000)/canvas.width;//510
	var BC = Math.sqrt(180000)/canvas.width;//424
	var CA = Math.sqrt(200000)/canvas.width;//447
	var AP = Math.sqrt(80000)/canvas.width;//283
	var BP = Math.sqrt(100000)/canvas.width;//316
	var CP = 200/canvas.width;//200*/

	/*var AB = 26;
	var BC = 18;
	var CA = 20;
	var AP = 8;
	var BP = 10;
	var CP = 4;*/

	var minVal = 0;
	var maxVal = 1000;
	var stepsize = 1;
	var accuracy = 0.1;

	var result = calc(AB, BC, CA, AP, BP, CP, minVal, maxVal, stepsize, accuracy);

	Canvas(canvas, result);
}

function calc(AB, BC, CA, AP, BP, CP, minVal, maxVal, stepsize, accuracy) {
	var b, c, p;

	for (p = minVal; p <= maxVal; p += stepsize) {
		for (c = minVal; c <= maxVal; c += stepsize) {
			for (b = minVal; b <= maxVal; b += stepsize) {
				var tmp_b = Math.pow((c - b), 2) + Math.pow(Math.sqrt(CA - Math.pow(c, 2)) - Math.sqrt(AB - Math.pow(b, 2)), 2);
				var tmp_f = Math.pow((p - c), 2) + Math.pow(Math.sqrt(AP - Math.pow(p, 2)) - Math.sqrt(CA - Math.pow(c, 2)), 2);
				var tmp_e = Math.pow((p - b), 2) + Math.pow(Math.sqrt(AP - Math.pow(p, 2)) - Math.sqrt(AB - Math.pow(b, 2)), 2);

				if (Math.abs(tmp_b - BC) < accuracy && Math.abs(tmp_f - CP) < accuracy && Math.abs(tmp_e - BP) < accuracy && b >= c && b >= p) {
					var xb_ = Math.round(b, 2);
					var xc_ = Math.round(c, 2);
					var xp_ = Math.round(p, 2);
					var yb_ = Math.sqrt(AB - Math.pow(xb_, 2));
					var yc_ = Math.sqrt(CA - Math.pow(xc_, 2));
					var yp_ = Math.sqrt(AP - Math.pow(xp_, 2));
				}
			}
		}
	}

	//document.getElementById('debug').innerHTML = xb_ + "," + yb_ + "," + xc_ + "," + yc_ + "," + xp_ + "," + yp_;
	document.getElementById('room_size').innerHTML = "Raumgröße: " + xb_ + ", " + yc_;

	return [
		[xb_, yb_],
		[xc_, yc_],
		[xp_, yp_]
	];
}

function Canvas1(canvas, res) {
	var diff_x = canvas.width - res[0][0];
	var diff_y = canvas.height - res[1][1];

	res = [
		[(res[0][0] / res[0][0]) * canvas.width, (res[0][1] / res[0][0]) * canvas.height],
		[(res[1][0] / res[0][0]) * canvas.width, (res[1][1] / res[0][0]) * canvas.height],
		[(res[2][0] / res[0][0]) * canvas.width, (res[2][1] / res[0][0]) * canvas.height]
	];

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "#EEE";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Beacon and Position Koordinate
	ctx.fillStyle = "#F00";
	ctx.fillRect(0 - 3, 0 - 3, 6, 6);
	ctx.fillStyle = "#0F0";
	ctx.fillRect(res[0][0] - 3, res[0][1] - 3 + diff_y / 2, 6, 6);
	ctx.fillStyle = "#00F";
	ctx.fillRect(res[1][0] - 3, res[1][1] - 3 + diff_y / 2, 6, 6);
	ctx.fillStyle = "#0FF";
	ctx.strokeStyle = ctx.fillStyle;
	ctx.fillRect(res[2][0] - 3, res[2][1] - 3 + diff_y / 2, 6, 6);
	ctx.beginPath();
	ctx.arc(res[2][0], res[2][1] + diff_y / 2, 6, 0, 2 * Math.PI);
	ctx.fillStyle = "rgba(0,255,255,.2)";
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = "#555";
	ctx.strokeStyle = ctx.fillStyle;
	//Lines from Beacon top Position
	ctx.beginPath();
	ctx.moveTo(0, diff_y / 2);
	ctx.lineTo(res[2][0], res[2][1] + diff_y / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[0][0], res[0][1] + diff_y / 2);
	ctx.lineTo(res[2][0], res[2][1] + diff_y / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[1][0], res[1][1] + diff_y / 2);
	ctx.lineTo(res[2][0], res[2][1] + diff_y / 2);
	ctx.stroke();

	//Lines from Beacon to Beacon
	ctx.beginPath();
	ctx.moveTo(0, diff_y / 2);
	ctx.lineTo(res[0][0], res[0][1] + diff_y / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[0][0], res[0][1] + diff_y / 2);
	ctx.lineTo(res[1][0], res[1][1] + diff_y / 2);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[1][0], res[1][1] + diff_y / 2);
	ctx.lineTo(0, diff_y / 2);
	ctx.stroke();

	//Room
	ctx.fillStyle = "#000";
	ctx.rect(0, diff_y / 2, res[0][0], res[1][1]);
	ctx.stroke();
}

function Canvas(canvas, res) {
	/*var diff_x = canvas.width - res[0][0];
	var diff_y = canvas.height - res[1][1];

	res = [
	[(res[0][0] / res[0][0]) * canvas.width, (res[0][1] / res[0][0]) * canvas.height],
	[(res[1][0] / res[0][0]) * canvas.width, (res[1][1] / res[0][0]) * canvas.height],
	[(res[2][0] / res[0][0]) * canvas.width, (res[2][1] / res[0][0]) * canvas.height]
	];*/

	canvas.width = res[0][0];
	canvas.height = res[1][1];

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "#EEE";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#555";
	ctx.strokeStyle = ctx.fillStyle;
	//Lines from Beacon top Position
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(res[2][0], res[2][1]);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[0][0], res[0][1]);
	ctx.lineTo(res[2][0], res[2][1]);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[1][0], res[1][1]);
	ctx.lineTo(res[2][0], res[2][1]);
	ctx.stroke();

	//Lines from Beacon to Beacon
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(res[0][0], res[0][1]);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[0][0], res[0][1]);
	ctx.lineTo(res[1][0], res[1][1]);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(res[1][0], res[1][1]);
	ctx.lineTo(0, 0);
	ctx.stroke();

	//Room
	ctx.fillStyle = "#000";
	ctx.rect(0, 0, res[0][0], res[1][1]);
	ctx.stroke();

	//Beacon and Position Koordinate
	ctx.fillStyle = "#F00";
	ctx.fillRect(0 - 3, 0 - 3, 6, 6);
	ctx.fillStyle = "#0F0";
	ctx.fillRect(res[0][0] - 3, res[0][1] - 3, 6, 6);
	ctx.fillStyle = "#00F";
	ctx.fillRect(res[1][0] - 3, res[1][1] - 3, 6, 6);
	ctx.fillStyle = "#0FF";
	ctx.strokeStyle = ctx.fillStyle;
	ctx.fillRect(res[2][0] - 3, res[2][1] - 3, 6, 6);
	ctx.beginPath();
	ctx.arc(res[2][0], res[2][1], 6, 0, 2 * Math.PI);
	ctx.fillStyle = "rgba(0,255,255,1)";
	ctx.fill();
	ctx.stroke();
}