$(document).ready(function() {
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(14);	// ['cse', 'eee', 'etc', 'ee', 'mech', 'civil']
	loadSidebarContent();
	$('#sidebar-image-external').css('text-align', 'center');
	$('#sidebar-image').attr('src', 'images/legendary/'+queryString+'.png');
	// dismentalSidebarImage();
	$('#body').css('background-image', 'url("images/background/branch_background.jpg")');
	$('#body').css('background-size', 'cover');
	$('#body').css('background-repeat', 'no-repeat');
	alignSidebarImage();
	checkEveryTick();
});

function alignSidebarImage() {
	var extHeight = document.getElementById("sidebar-image-external").offsetHeight;
	var intHeight = document.getElementById("sidebar-image").offsetHeight;
	console.log("ext = " + extHeight);
	console.log("int = " + intHeight);
	if(intHeight == 0 || extHeight == 0) {
		console.log("Image not loaded");
		setTimeout(alignSidebarImage, 10);
	} else if (intHeight == extHeight){
		console.log("Same height");
		dismentalSidebarImage();
	} else {
		var half = (extHeight - intHeight)/2;
		console.log("some height");
		document.getElementById("sidebar-image").style.paddingTop = half+"px";
	}
}
function checkEveryTick() {
	setInterval(function() {
		document.getElementById("sidebar-image").style.paddingTop = '0px';
		alignSidebarImage();
	}, 10);
}
function dismentalSidebarImage() {
	// var element = document.getElementById("sidebar-image");
	// var margin_top = window.getComputedStyle(element, null).getPropertyvalue("margin-top");
	console.log("dismentaling");
	console.log("padding top = " + $('#sidebar-image').css('padding-top'));
	document.getElementById("sidebar-image").style.paddingTop = '0px';
	console.log("padding top = " + $('#sidebar-image').css('padding-top'));
	if(document.getElementById("sidebar-image").offsetHeight == 0) {
		console.log("order 0");
		console.log("offset = "+document.getElementById("sidebar-image").offsetHeight);
		setTimeout(dismentalSidebarImage, 10);
	}
	console.log("offset = "+document.getElementById("sidebar-image").offsetHeight);
	console.log("order 1");
}

var xmlHttp = createXmlHttpRequestObject();
var eventArray;
var event;
var eventIDGlobal;

function createXmlHttpRequestObject() {
	var xmlHttp;
	if(window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(error) {
			xmlHttp = false;
		}
	} else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch(error) {
			xmlHttp = false;
		}
	}
	if(!xmlHttp)
		console.log('Can\'t create XML HTTP Request Object');
	else
		return xmlHttp;
}

function loadPage() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		var queryString = decodeURIComponent(window.location.search);
		queryString = queryString.substring(14);
		xmlHttp.open("GET", "xml/"+queryString+".xml", true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	} else {
		setTimeout(loadPage, 1000);
	}
}

function handleServerResponse() {
	if(xmlHttp.readyState == 4) {
		if(xmlHttp.status == 200) {
			var xmlResponse = xmlHttp.responseXML;
			branchTag = xmlResponse.documentElement;
			eventArray = branchTag.getElementsByTagName("event");
		} else {
			console.log('Something went wrong while handling "branch".xml.');
		}
	}
}

function changeContent() {
	var eventID = eventNumber();
	if(eventID == eventArray[eventID - 1].getAttribute('event-id')) {
		event = eventArray[eventID - 1];
		eventIDGlobal = eventID;
		grabContent();
	}
	else {
		console.log('Some error while handling panel click.');
	}
}

function grabContent() {
	setContent("event-name");
	setContent("event-branch");
	setContent("event-society");
	//setContent("event-clubName");
	//setContent("event-info");
	setEventImage("event-image");
	//setContent("event-website");
	setEventRules("event-rules");
	setEventRounds("event-rounds");
	setEventCoordinators("event-coordinators");
	setEventPrize("event-prize");
}
function setContent(idName) {
	var eventChild = event.getElementsByTagName(idName)[0].childNodes[0].nodeValue;
	document.getElementById(idName).innerHTML = eventChild;
}
function setEventImage(idName) {
	var eventChild = event.getElementsByTagName(idName)[0].childNodes[0].nodeValue;
	$('#sidebar-image').attr("src", eventChild+"event.jpg");
	dismentalSidebarImage();
	$('#sidebar-image').addClass("hoverSidebarImage");
	alignSidebarImage();
}
function setEventRules(idName) {
	var eventChild = event.getElementsByTagName(idName)[0];
	var items = eventChild.getElementsByTagName("item");
	var htmlEventRules = document.getElementById(idName);
	if(items.length < 0)
		return;
	var eventRulesHeading = document.createElement("div");
	eventRulesHeading.innerHTML = eventChild.getAttribute("name");
	htmlEventRules.appendChild(eventRulesHeading);
	var ulTag = document.createElement("ul");
	for(i = 0; i < items.length; i++) {
		var liTag = document.createElement("li");
		liTag.innerHTML = items[i].childNodes[0].nodeValue;
		ulTag.appendChild(liTag);
	}
	htmlEventRules.appendChild(ulTag);
}

function setEventRounds(idName) {
	var eventChild = event.getElementsByTagName(idName)[0];
	var rounds = eventChild.getElementsByTagName("round");
	var htmlEventRounds = document.getElementById(idName);
	var headingTag = document.createElement("div");
	headingTag.innerHTML = eventChild.getAttribute("name");
	htmlEventRounds.appendChild(headingTag);
	for(var i = 0; i < rounds.length; i++) {
		var roundDiv = document.createElement("div");
		roundDiv.setAttribute("class", "round");	// To be changed for increments of round
		var roundHeadingDiv = document.createElement("div");
		roundHeadingDiv.setAttribute("class", "round-name");	// To be changed for increments
		roundHeadingDiv.innerHTML = rounds[i].getAttribute("name");
		roundDiv.appendChild(roundHeadingDiv);
		var ulTag = document.createElement("ul");
		var items = rounds[i].getElementsByTagName("item");
		for(var j = 0; j < items.length; j++) {
			var liTag = document.createElement("li");
			liTag.innerHTML = items[j].childNodes[0].nodeValue;
			ulTag.appendChild(liTag);
		}
		roundDiv.appendChild(ulTag);
		htmlEventRounds.appendChild(roundDiv);
	}
}

function setEventCoordinators(idName) {
	var eventChild = event.getElementsByTagName(idName)[0];
	var teachers = eventChild.getElementsByTagName("teachers")[0];
	var students = eventChild.getElementsByTagName("students")[0];
	var htmlEventCoordinators = document.getElementById(idName);

	var eventCoordinatorsDiv = document.createElement("div");
	eventCoordinatorsDiv.setAttribute("class", "event-coordinators-heading");
	eventCoordinatorsDiv.innerHTML = eventChild.getAttribute("name");
	htmlEventCoordinators.appendChild(eventCoordinatorsDiv);

	var teachersDiv = document.createElement("div");
	teachersDiv.setAttribute("class", "teachers");
	var teachersHeadingDiv = document.createElement("div");
	teachersHeadingDiv.setAttribute("class", "teachers-heading");
	teachersHeadingDiv.innerHTML = teachers.getAttribute("name");
	teachersDiv.appendChild(teachersHeadingDiv);

	var teachersNameArray = teachers.getElementsByTagName("name");
	var teachersNumberArray = teachers.getElementsByTagName("number");

	var ulTag = document.createElement("ul");
	for(i = 0; i < teachersNameArray.length; i++) {
		var liTag = document.createElement("li");
		liTag.innerHTML = teachersNameArray[i].childNodes[0].nodeValue + " " + 
			teachersNumberArray[i].childNodes[0].nodeValue;
		ulTag.appendChild(liTag);
	}
	teachersDiv.appendChild(ulTag);
	htmlEventCoordinators.appendChild(teachersDiv);

	var studentsDiv = document.createElement("div");
	studentsDiv.setAttribute("class", "students");
	var studentsHeadingDiv = document.createElement("div");
	studentsHeadingDiv.setAttribute("class", "students-heading");
	studentsHeadingDiv.innerHTML = students.getAttribute("name");
	studentsDiv.appendChild(studentsHeadingDiv);

	var studentsNameArray = students.getElementsByTagName("name");
	var studentsNumberArray = students.getElementsByTagName("number");

	var ulTag2 = document.createElement("ul");
	for(i = 0; i < studentsNameArray.length; i++) {
		var liTag = document.createElement("li");
		liTag.innerHTML = studentsNameArray[i].childNodes[0].nodeValue + " " + 
			studentsNumberArray[i].childNodes[0].nodeValue;
		ulTag2.appendChild(liTag);
	}
	studentsDiv.appendChild(ulTag2);
	htmlEventCoordinators.appendChild(studentsDiv);
}

function setEventPrize(idName) {
	var eventChild = event.getElementsByTagName(idName)[0];
	var items = eventChild.getElementsByTagName("item");
	var htmlEventPrize = document.getElementById("event-prize");
	var prizeHeading = document.createElement("div");
	prizeHeading.setAttribute("class", "prize-heading");
	prizeHeading.innerHTML = eventChild.getAttribute("name");
	htmlEventPrize.appendChild(prizeHeading);
	var ulTag = document.createElement("ul");
	for(var i = 0; i < items.length; i++) {
		var text = "2nd Prize: ";
		if(i == 0) {
			text = "1st Prize: "
		}
		var liTag = document.createElement("li");
		liTag.innerHTML = text + items[i].childNodes[0].nodeValue;
		ulTag.appendChild(liTag);
		
	}
	htmlEventPrize.appendChild(ulTag);
}

var timer = null;
$(document).ready(function() {
	$('#sidebar-image').mouseover(function() {
		var count = 1;
   		timer = setInterval(function()
   		{
			//code to change the image source every time based on the count
			if($('#sidebar-image').hasClass('hoverSidebarImage')) {
				var queryString = decodeURIComponent(window.location.search);
				queryString = queryString.substring(14);
				var location = "images/"+queryString+"/"+eventIDGlobal+"/"+count+".png";
				dismentalSidebarImage();
				$('#sidebar-image').attr("src", location);
				alignSidebarImage();
				count++;
	       		if(count > 2)
	       			count = 1;
			}
   		},1000);
	});
	$('#sidebar-image').mouseout(function() {
		clearInterval(timer);
		if($('#sidebar-image').hasClass('hoverSidebarImage')) {
			//code to change the image source
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(14);
			dismentalSidebarImage();
			$(this).attr("src", "images/"+queryString+"/"+eventIDGlobal+"/event.jpg");
			alignSidebarImage();
		}	
	});
});

var xmlHttp2;
var content;
function loadSidebarContent() {
	xmlHttp2 = createXmlHttpRequestObject();
	if(xmlHttp2.readyState == 0 || xmlHttp2.readyState == 4) {
		xmlHttp2.open("GET", "xml/sidebar-content.xml", true);
		xmlHttp2.onreadystatechange = handleServerResponseForSidebar;
		xmlHttp2.send(null);
	} else {
		setTimeout(loadSidebarContent, 1000);
	}
}

function handleServerResponseForSidebar() {
	if(xmlHttp2.readyState == 4) {
		if(xmlHttp2.status == 200) {
			var xmlResponse = xmlHttp2.responseXML;
			content = xmlResponse.documentElement;
			loadSidebarContentBranch(content);
		} else {
			console.log('Something went wrong while handling sidebar-content.xml');
		}
	}
}

function loadSidebarContentBranch() {
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(14);
	branch = content.getElementsByTagName(queryString)[0];
	var items = branch.getElementsByTagName('item');
	var ulTag = document.createElement("ul");
	for(i = 0; i < items.length - 1; i++) {
		var item = items[i].childNodes[0].nodeValue;
		var liTag = document.createElement("li");
		var liTagText = document.createTextNode(item);
		liTag.appendChild(liTagText);
		ulTag.appendChild(liTag);
	}
	var item = items[i].childNodes[0].nodeValue;
	var liTag = document.createElement("li");
	var liTagTextStart = document.createTextNode("Prize: ");
	var liTagMiddle = document.createElement("i");
	liTagMiddle.setAttribute('class', 'fa fa-inr');
	var liTagTextEnd = document.createTextNode(item);
	
	liTag.appendChild(liTagTextEnd);
	liTag.insertBefore(liTagMiddle, liTag.childNodes[0]);
	liTag.insertBefore(liTagTextStart, liTag.childNodes[0]);
	ulTag.appendChild(liTag);
	document.getElementById("sidebar-content").appendChild(ulTag);
}

function loadSidebarContentDetails() {
	details = content.getElementsByTagName("details")[0];
	var items = details.getElementsByTagName("item");
	var ulTag = document.createElement("ul");
	for(i = 0; i < items.length; i++) {
		var item = items[i].childNodes[0].nodeValue;
		var liTag = document.createElement("li");
		var liTagText = document.createTextNode(item);
		liTag.appendChild(liTagText);
		ulTag.appendChild(liTag);
	}
	document.getElementById("sidebar-content").appendChild(ulTag);
}

function destroySidebarContent() {
	$('#sidebar-content').empty();
}

var dynamicMainContentReturn = null;
function createDynamicMainContent() {
	if(noOfFlips && NUMBER_OF_PANELS) {
		// Fetch panel data
		var panelArray = document.getElementsByClassName("panel");
		for(i = 0; i < NUMBER_OF_PANELS; i++) {
			var panel = panelArray[i];
			for(j = 0; j < noOfFlips; j++) {
				var divFlap = document.createElement("div");
				if(j == 0)
					divFlap.setAttribute('class', 'flip'+(j+1)+' active');
				else
					divFlap.setAttribute('class', 'flip'+(j+1));
				var divMin = document.createElement("div");
				divMin.setAttribute('class', 'min-detail');
				var divMax = document.createElement("div");
				divMax.setAttribute('class', 'max-detail');
				divFlap.appendChild(divMin);
				divFlap.appendChild(divMax);
				panel.appendChild(divFlap);
			}
		}

		// Create previous and next buttons
		var previousTag = document.getElementsByClassName("previous")[0];
		var nextTag = document.getElementsByClassName("next")[0];
		for(i = 1; i <= noOfFlips; i++) {
			var previous = document.createElement("span");
			previous.setAttribute('class', 'glyphicon glyphicon-chevron-left previous'+i);
			previousTag.appendChild(previous);
			var next = document.createElement("span");
			next.setAttribute('class', 'glyphicon glyphicon-chevron-right next'+i);
			nextTag.appendChild(next);
		}
		setMinDetailText();
		dynamicMainContentReturn = 1;
	} else {
		setTimeout(createDynamicMainContent, 500);
	}
}

function setMinDetailText() {
	console.log("Number of flips = " + noOfFlips);
	console.log("Number of panels = " + NUMBER_OF_PANELS);
	for(var i = 1; i <= noOfFlips; i++) {
		for(var j = 1; j <= NUMBER_OF_PANELS; j++) {
			var eventID = ((i - 1) * NUMBER_OF_PANELS + j);
			if (eventID > eventArray.length)
				$('.panel'+ j + ' > .flip'+ i +' > .min-detail').html("Coming Soon...");
			else {
				createMinDetailInnerTags(j, i, eventID);

				//$('.panel'+ j + ' > .flip'+ i +' > .min-detail').html(getEventName(''+eventID));
			}
		}
	}
}

// function getEventName(idName) {
// 	for(i = 0; i < eventArray.length; i++) {
// 		if(idName == eventArray[i].getAttribute('event-id')) {
// 			var eachEvent = eventArray[i];
// 			var eventChild = eachEvent.getElementsByTagName("event-name")[0].childNodes[0].nodeValue;
// 			return eventChild;
// 		}
// 	}
// }

function createMinDetailInnerTags(panelNo, flipNo, eventID) {
	// Code to be added when adding extra features
	var panel = document.getElementsByClassName("panel"+panelNo)[0];
	var flip = panel.getElementsByClassName("flip"+flipNo)[0];
	var minDetail = flip.getElementsByClassName('min-detail')[0];
	var eventSheet = ['min-event-name', 'min-event-image', 'min-event-coordinators', 
		'min-event-prize'];
	for(i = 0; i < eventSheet.length; i++) {
		var div = document.createElement("div");
		div.setAttribute("class", eventSheet[i]);
		minDetail.appendChild(div);
	}
	// Min Event Name
	var minEventName = minDetail.getElementsByClassName("min-event-name")[0];
	var eventName = eventArray[eventID - 1].getElementsByTagName("event-name")[0];
	var eventNameText = eventName.childNodes[0].nodeValue;
	minEventName.innerHTML = eventNameText;

	// Min Event Image
	var minEventImage = minDetail.getElementsByClassName("min-event-image")[0];
	var eventImage = eventArray[eventID - 1].getElementsByTagName("event-image")[0];
	var eventImageText = eventImage.childNodes[0].nodeValue;
	var minEventImageImg = document.createElement("img");
	minEventImageImg.setAttribute("class", 
		"min-event-image-img img-responsive img-circle img-thumbnail");
	minEventImageImg.setAttribute("src", eventImageText+"event.jpg");
	minEventImage.appendChild(minEventImageImg);
	
	// Min Event Coordinators
	var minEventCoordinators = minDetail.getElementsByClassName("min-event-coordinators")[0];
	var eventCoordinators = eventArray[eventID - 1].getElementsByTagName("event-coordinators")[0];
	var eventTeachersArray = eventCoordinators.getElementsByTagName("teachers");
	var eventTeacherName = eventTeachersArray[0].getElementsByTagName("name")[0];
	var eventTeacherNameText = eventTeacherName.childNodes[0].nodeValue;
	var eventTeacherNumber = eventTeachersArray[0].getElementsByTagName("number")[0];
	var eventTeacherNumberText = eventTeacherNumber.childNodes[0].nodeValue;

	var eventStudentsArray = eventCoordinators.getElementsByTagName("students");
	var eventStudentName = eventStudentsArray[0].getElementsByTagName("name")[0];
	var eventStudentNameText = eventStudentName.childNodes[0].nodeValue;
	var eventStudentNumber = eventStudentsArray[0].getElementsByTagName("number")[0];
	var eventStudentNumberText = eventStudentNumber.childNodes[0].nodeValue;

	var teacherDiv = document.createElement("div");
	teacherDiv.setAttribute("class", "teachers");
	var teacherHeadingDiv = document.createElement("div");
	teacherHeadingDiv.setAttribute("class", "teacherHeading");
	teacherHeadingDiv.innerHTML = "Faculty Coordinator: ";
	var teacherNameDiv = document.createElement("div");
	teacherNameDiv.innerHTML = eventTeacherNameText;
	var teacherNumberDiv = document.createElement("div");
	teacherNumberDiv.innerHTML = eventTeacherNumberText;
	teacherDiv.appendChild(teacherHeadingDiv);
	teacherDiv.appendChild(teacherNameDiv);
	teacherDiv.appendChild(teacherNumberDiv);
	minEventCoordinators.appendChild(teacherDiv);

	var studentDiv = document.createElement("div");
	studentDiv.setAttribute("class", "students");
	var studentHeadingDiv = document.createElement("div");
	studentHeadingDiv.setAttribute("class", "studentHeading");
	studentHeadingDiv.innerHTML = "Student Coordinator: ";
	var studentNameDiv = document.createElement("div");
	studentNameDiv.innerHTML = eventStudentNameText;
	var studentNumberDiv = document.createElement("div");
	studentNumberDiv.innerHTML = eventStudentNumberText;
	studentDiv.appendChild(studentHeadingDiv);
	studentDiv.appendChild(studentNameDiv);
	studentDiv.appendChild(studentNumberDiv);
	minEventCoordinators.appendChild(studentDiv);
	
	//setMinEventPrize("min-event-prize", minDetail, eventID);
	var minEventPrize = minDetail.getElementsByClassName("min-event-prize")[0];
	var eventPrizeArray = eventArray[eventID - 1].getElementsByTagName("event-prize")[0];
	var item1 = eventPrizeArray.getElementsByTagName("item")[0];
	var item2 = eventPrizeArray.getElementsByTagName("item")[1];
	var item1Text = item1.childNodes[0].nodeValue;
	var item2Text = item2.childNodes[0].nodeValue;
	var prize = document.createElement("div");
	prize.setAttribute("class", "prize");
	prize.innerHTML = "Prizes: ";
	var prize1 = document.createElement("div");
	prize1.innerHTML = "1st Prize: " + item1Text;
	var prize2 = document.createElement("div");
	prize2.innerHTML = "2nd Prize: " + item2Text;
	minEventPrize.appendChild(prize);
	minEventPrize.appendChild(prize1);
	minEventPrize.appendChild(prize2);
}
