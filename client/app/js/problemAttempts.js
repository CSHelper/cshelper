function loadProblems(){

/*function to get what result user selected and populate latter select list */
function problems(result){

	var options = $("#problem");
	options.find('option').remove().end();

	options.append($("<option />").text("Problem"));

	$.each(result, function() {
	    options.append($("<option />").val(this.value).text(this.name));
	});
}

/*function to get what result user selected and populate latter select list */
function section(result){
	console.log(result);
	var options = $("#section");
	options.find('option').remove().end(); // removes latter fields
	$("#problem").find('option').remove().end();

	options.append($("<option />").text("Section"));

	$.each(result, function() {
		console.log(this.value);
	   	options.append($("<option />").val(this.value).text(this.name));
	});

}

/* stores what values are going to be in play (Language, Section, Problem) */
var result =
[
	{ 
		/* first is language, Java in this case */
		name: "Java", 
		section: [
		/* create first array object */
		{
			/* Section is what topics you can chose from */
			name: "Java Basics", 
			value: "javabasics",
			/* Problems will give you the ability to pick between all the problems with your specified Language / Section */
			problems: [
				{
					name: "Java Hello World",
					value: "javahelloworld"
				}
			]
		}, //close first array object

		/* open array object 2 */
		{
			name: "Conditionals", 
			value: "javaconditionals",
			problems: [
				{
					name: "If Statements",
					value: "javaifstatement"
				}
			]

		} //close array object 2

		] //section close
 
	},
	/* new language object */
	{ 
		name: "C++", 
		section: [
		{
			name: "C++ Basics", 
			value: "c++basics",
			problems: [
				{
					name: "C++ Hello World",
					value: "c++helloworld"
				}
			]
		}, //close array object 1
		{
			name: "Conditionals", 
			value: "C++conditionals",
			problems: [
				{
					name: "If Statements",
					value: "c++ifstatement"
				}
			]

		} //close array object 2

		] //section close
	}

]

	 $.each(result,function(){
	 	var languages = $("#language");
	 	languages.append($("<option />").val(this.name).text(this.name));
	 });

var selectSec;
var selectLang = result[0];
section(result[0].section);
problems(selectLang.section[0].problems);

$('.target').change(function() {
	 var str = "";
	/* getting the option the user selected */
	$( ".target option:selected" ).each(function() {
	    str += $( this ).text();
	});
	console.log(str);
	/* populate section from array */
	for (var i = 0; i < result.length; i++) 
	{
		if (str === result[i].name)
		{	
			selectLang = result[i];
			console.log("test");
			section(result[i].section);
		}
	}
});


$('.section').change(function() {
  	var sec = "";
    $( ".section option:selected" ).each(function() {
    	sec += $( this ).text();
    });

    var str = "";
	/* getting the option the user selected */
	$( ".target option:selected" ).each(function() {
	    str += $( this ).text();
	});
	console.log(str);
	/* populate section from array */
	for (var i = 0; i < selectLang.section.length; i++) 
	{
		if (sec === selectLang.section[i].name)
		{	
			console.log("test");
			problems(selectLang.section[i].problems);
		}
	}
});

}
