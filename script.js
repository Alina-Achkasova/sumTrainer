$(document).ready(function() {

	$("#firstNumber").html(Math.floor(Math.random()*(4)+6));
	var firstNum = $("#firstNumber").html();
	$("#secondNumber").html(Math.floor(Math.random()*(4)+11) - firstNum);
	var secondNum = $("#secondNumber").html();
	$("#resultInput").val('?');

	$("#solve").click(function() {
		$("#solve").css("display", "none");
		$("#newTask").css("display", "inline-block");
		$("#newTask").css("opacity", 0);
		$("#coordinates").fadeIn("slow");
		$("#numberLine").fadeIn("slow");
		
		var c=$("#coordinates")[0];
		var ctx=c.getContext("2d");
		ctx.strokeStyle = '#d45b91';
		var coefficient = 38;
		var bezierXforA = coefficient*firstNum + 1;
		ctx.beginPath();
		ctx.moveTo(0, 60);
		ctx.bezierCurveTo(0, 0, bezierXforA, 0, bezierXforA, 60);
		ctx.moveTo(bezierXforA, 60);
	    ctx.lineTo(bezierXforA - 8, 50);
	    ctx.moveTo(bezierXforA, 60);
	    ctx.lineTo(bezierXforA + 4, 50);
		ctx.stroke();
		
		$("#firstAnswer").css('margin-left', bezierXforA/2 + 25 + 'px');
		$("#firstAnswer").fadeIn("slow");

		$("#firstAnswer").on("input", function() {
			if ($("#firstAnswer").val() === firstNum) {
				$("#firstNumber").css('background-color', 'white');
				$("#firstAnswer").css('background-color', 'white');
				$("#firstAnswer").css('color', 'black');
				$("#firstAnswer").css('border-color', 'transparent');
				$("#firstAnswer").val(firstNum);
				$("#firstAnswer").prop('disabled', true);
				
				var bezierXforB = coefficient*secondNum + 1 + bezierXforA;
				ctx.beginPath();
				ctx.moveTo(bezierXforA, 60);
				ctx.bezierCurveTo(bezierXforA, 0, bezierXforB, 0, bezierXforB, 60);
				ctx.moveTo(bezierXforB, 60);
			    ctx.lineTo(bezierXforB - 8, 50);
			    ctx.moveTo(bezierXforB, 60);
			    ctx.lineTo(bezierXforB + 4, 50);
				ctx.stroke();
				$("#secondAnswer").show();
				$("#secondAnswer").css('margin-left', bezierXforB/2 - 25 + 'px');

				$("#secondAnswer").on("input", function() {
					if ($("#secondAnswer").val() === secondNum) {
						$("#secondNumber").css('background-color', 'white');
						$("#secondAnswer").css('border-color', 'transparent');
						$("#secondAnswer").css('color', 'black');
						$("#secondAnswer").val(secondNum);
						$("#secondAnswer").css('background-color', 'white');
						$("#secondAnswer").prop('disabled', true);
						$("#resultInput").val('');
						$("#resultInput").css('border', '1px solid #999');
						$("#resultInput").on("input", function() {
							if ($("#resultInput").val() == +firstNum + +secondNum) {
								$("#resultInput").css('border-color', 'transparent');
								$("#resultInput").val(+firstNum + +secondNum);
								$("#resultInput").css('background-color', 'white');
								$("#resultInput").css('color', 'black');
								$("#resultInput").prop('disabled', true);
								$("#newTask").css("opacity", 1);
								$("#newTask").click(function() {
									location.reload();
								});

							} else {
								$("#resultInput").css('color', 'red');
							}
						});
					} else {
						$("#secondAnswer").css('color', 'red');
						$("#secondNumber").css('background-color', '#faa84b');
					}
				});
			} else {
				$("#firstAnswer").css('color', 'red');
				$("#firstNumber").css('background-color', '#faa84b');
			}
		})	
	});
});
