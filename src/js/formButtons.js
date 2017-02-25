function setPhotoConsent(d) {
	console.log(d);
	$("#photoConsent").val(d);
}

$(function() {
	$("input[name=churchAttend]").click(function() {
		$("#churchAttendInfo").css({opacity: 0});
		$("#churchAttendInfo").animate({opacity: 1});
		$("#churchAttendInfo").toggleClass("displayNone", $(this).val() === "no")
	});
});

function showJuniorCamp() {
	$("div.junior.camp").css({display: 'block'});
	$("div.choose").css({display: 'none'});
}

function redirect(loc) {
	window.location = loc;
	return false;
}

function showSeniorCamp() {
	$("div.senior.camp").css({display: 'block'});
	$("div.choose").css({display: 'none'});
}

function submitForm() {
	var $_GET = {};
	if(document.location.toString().indexOf('?') !== -1) {
		var query = document.location
			.toString()
			// get the query string
			.replace(/^.*?\?/, '')
			// and remove any existing hash string (thanks, @vrijdenker)
			.replace(/#.*$/, '')
			.split('&');

		for(var i=0, l=query.length; i<l; i++) {
			var aux = decodeURIComponent(query[i]).split('=');
			$_GET[aux[0]] = aux[1];
		}
	}
	
	var url = "/ajax/breakoutcarnival/";
	if ($_GET['q'] == "senior") {
		url += "?q=senior";
	} else {
		url += "?q=junior";
	}
	
	// $("#loaders").removeClass("hidden").animate({opacity: 1});
	var d = $("form").serialize();
	$.post(url, d, function(data) {
		if (data === "success")
		{
			// Make Feedback Right Size
			// -------------------------------------------------
			$(".feedbackContainer").animate({height : $(".feedback").height() });

			// Fade out loader
			// -------------------------------------------------
			$("#feedback").removeClass("hidden").animate({opacity: 1});
			$("#loaders").addClass("hidden").animate({opacity: 0});
		}
		else {
			$("#formResubmission").removeClass("displayNone");
			$("#loaders").addClass("hidden").animate({opacity: 0});
			$("#errorMessage").text("error : " + data);
		}
	})
	.fail(function(xhr, status, error) {
		$("#formResubmission").removeClass("displayNone");
		$("#loaders").addClass("hidden").animate({opacity: 0});
		$("#errorMessage").text(status + " : " + error);
	});
}

function submitFeedback(d) {
	var d = $("form").serialize();
	$.post("/ajax/breakoutcarnivalfeedback/", d, function(data) {
		console.log(data);
		if (data === "success")
		{
			window.location.href="./success.html"
		}
		else {
			console.log("error : " + data);
		}
	})
	.fail(function(xhr, status, error) {
		console.log('failed to submit: ' + error);
	});
}

function paymentMethod(d) {
	$(".paymentButtons").addClass("displayNone");
	$("#payMethod").val(d);

	if (d === "credit") {
		$("#credit").toggleClass("displayNone", false);
		$("#cash").toggleClass("displayNone", true);

	}
	else if (d === "cash"){
		$("#credit").toggleClass("displayNone", true);
		$("#cash").toggleClass("displayNone", false);
	}
}
