$(function() {
	// // Always redirect to https
	// var loc = window.location.href+'';
	// if (loc.indexOf('http://')==0){
	// 	window.location.href = loc.replace('http://','https://');
	// }


	// Hide and Show Divs based on Choices
	// ----------------------------------------------------

	// Immunisations Warning Text
	$("input[name=immunisations]").click(function() {
		$("#noImmunisationsText").toggleClass("displayNone", ($(this).val() === "yes"));
	})

	// Other Information Div
	$("input[name=otherInformation]").click(function() {
		$("#otherInfoDiv").toggleClass("displayNone", ($(this).val() === "no"));
	});

	$("input[name=conditions]").click(function() {
		$("#conditionsTextDiv").toggleClass("displayNone", ($(this).val() === "no"));
	});

});
