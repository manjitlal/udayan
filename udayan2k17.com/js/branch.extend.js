// prefixer helper function
var pfx = ["webkit", "moz", "MS", "o", ""];
function prefixedAnimationEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}

function getNumberOfFlips() {
	if(eventArray) {
		console.log('No of events = ' + eventArray.length);
		noOfFlips = Math.ceil(eventArray.length / NUMBER_OF_PANELS);
		console.log("No of flips = " + noOfFlips);
	} else {
		console.log("Slow loading");
		setTimeout(getNumberOfFlips, 100);
	}
}

var extendedPanel = 0; // [1, 2, 3, 4]
var NUMBER_OF_PANELS = 4;
var noOfFlips = 0;
var activeFlip = 1;
var next = 1;
var previous = 1;

$(document).ready(function() {
	getNumberOfFlips();
	setupReady();
});

function setupReady() {
	if(noOfFlips) {
		createDynamicMainContent();
		dynamicMainContentReady();
	} else {
		setTimeout(setupReady, 100);
	}
}

function dynamicMainContentReady() {
	if(dynamicMainContentReturn) {
		//Hide the close button
		$('.close-button').hide();
		//Hide arrows if necessary
		if(noOfFlips < 2) {
			$('.next1').hide();
			$('.previous1').hide();
			next = previous = 0;
		}
		//Hide other flips
		for(i = 2; i <= noOfFlips; i++)
			$('.flip'+i).hide();
		//Hide other previous button
		for(i = 2; i <= noOfFlips; i++)
			$('.previous'+i).hide();
		//Hide other next button
		for(i = 2; i <= noOfFlips; i++)
			$('.next'+i).hide();
		hideMaxDetail();

		$('.panel1').click(function() {
			prefixedAnimationEventListener(document.getElementsByClassName('panel1')[0], 
				"AnimationIteration", function(e) {
				$('.extend').css('animation-play-state', 'paused');
			});
			if(extendedPanel == 0) {
				extendedPanel = 1;
				if(eventArray.length >= eventNumber()) {
					for(i = 1; i <= NUMBER_OF_PANELS; i++) {
						if($('.panel'+i).hasClass('opacRemove')) {
							$('.panel'+i).removeClass('opacRemove');	
						}
						if(i == extendedPanel)
							continue;
						else {
							$('.panel'+i).addClass('opacAdd');
						}
					}
					createMaxDetailInnerTags();
					changeContent();
					$(this).addClass('extend');
					$('.next'+next).hide();
					$('.previous'+previous).hide();
					$('.panel1 > .active > .min-detail').hide(500);
					$('.close-button').show(1500);
					setTimeout(function() {
						$('.panel1 > .active > .max-detail').show(1500);
					}, 1000);
					$('#sidebar-content').hide(500);
					setTimeout(function() {
						destroySidebarContent();
						loadSidebarContentDetails();
					}, 500);
					setTimeout(function() {
						$('#sidebar-content').show(500);
					}, 1000);
					$('.panel1').css('background-position', 'center');
				} else {
					extendedPanel = 0;
				}
			}
		});
		$('.panel2').click(function() {
			prefixedAnimationEventListener(document.getElementsByClassName('panel2')[0], 
				"AnimationIteration", function(e) {
				$('.extend').css('animation-play-state', 'paused');
			});
			if(extendedPanel == 0) {
				extendedPanel = 2;
				if(eventArray.length >= eventNumber()) {
					for(i = 1; i <= NUMBER_OF_PANELS; i++) {
						if($('.panel'+i).hasClass('opacRemove')) {
							$('.panel'+i).removeClass('opacRemove');	
						}
						if(i == extendedPanel)
							continue;
						else {
							$('.panel'+i).addClass('opacAdd');
						}
					}
					createMaxDetailInnerTags();
					changeContent();
					$(this).addClass('extend');
					$('.next'+next).hide();
					$('.previous'+previous).hide();
					$('.panel2 > .active > .min-detail').hide(500);
					$('.close-button').show(1500);
					setTimeout(function() {
						$('.panel2 > .active > .max-detail').show(1500);
					}, 1000);
					$('#sidebar-content').hide(500);
					setTimeout(function() {
						destroySidebarContent();
						loadSidebarContentDetails();
					}, 500);
					setTimeout(function() {
						$('#sidebar-content').show(500);
					}, 1000);
					$('.panel2').css('background-position', 'center');
				} else {
					extendedPanel = 0;
				}	
			}
		});
		$('.panel3').click(function() {
			prefixedAnimationEventListener(document.getElementsByClassName('panel3')[0], 
				"AnimationIteration", function(e) {
				$('.extend').css('animation-play-state', 'paused');
			});
			if(extendedPanel == 0) {
				extendedPanel = 3;
				if(eventArray.length >= eventNumber()) {
					for(i = 1; i <= NUMBER_OF_PANELS; i++) {
						if($('.panel'+i).hasClass('opacRemove')) {
								$('.panel'+i).removeClass('opacRemove');	
							}
						if(i == extendedPanel)
							continue;
						else {
							$('.panel'+i).addClass('opacAdd');
						}
					}
					createMaxDetailInnerTags();
					changeContent();
					$(this).addClass('extend');
					$('.next'+next).hide();
					$('.previous'+previous).hide();
					$('.panel3 > .active > .min-detail').hide(500);
					$('.close-button').show(1500);
					setTimeout(function() {
						$('.panel3 > .active > .max-detail').show(1500);
					}, 1000);
					$('#sidebar-content').hide(500);
					setTimeout(function() {
						destroySidebarContent();
						loadSidebarContentDetails();
					}, 500);
					setTimeout(function() {
						$('#sidebar-content').show(500);
					}, 1000);
					$('.panel3').css('background-position', 'center');
				} else {
					extendedPanel = 0;
				}
			}
		});
		$('.panel4').click(function() {
			prefixedAnimationEventListener(document.getElementsByClassName('panel4')[0], 
				"AnimationIteration", function(e) {
				$('.extend').css('animation-play-state', 'paused');
			});
			if(extendedPanel == 0) {
				extendedPanel = 4;
				if(eventArray.length >= eventNumber()) {
					for(i = 1; i <= NUMBER_OF_PANELS; i++) {
						if($('.panel'+i).hasClass('opacRemove')) {
								$('.panel'+i).removeClass('opacRemove');	
							}
						if(i == extendedPanel)
							continue;
						else {
							$('.panel'+i).addClass('opacAdd');
						}
					}
					createMaxDetailInnerTags();
					changeContent();
					$(this).addClass('extend');
					$('.next'+next).hide();
					$('.previous'+previous).hide();
					$('.panel4 > .active > .min-detail').hide(500);
					$('.close-button').show(1500);
					setTimeout(function() {
						$('.panel4 > .active > .max-detail').show(1500);
					}, 1000);
					$('#sidebar-content').hide(500);
					setTimeout(function() {
						destroySidebarContent();
						loadSidebarContentDetails();
					}, 500);
					setTimeout(function() {
						$('#sidebar-content').show(500);
					}, 1000);
					$('.panel4').css('background-position', 'center');
				} else {
					extendedPanel = 0;
				}	
			}
		});
		$('.close-button').click(function() {
			$('.extend').css('animation-play-state', 'running');
			$(this).hide(1500);
			for(i = 1; i <= NUMBER_OF_PANELS; i++) {
				if(i == extendedPanel)
					continue;
				else {
					if($('.panel'+i).hasClass('opacAdd')) {
						$('.panel'+i).removeClass('opacAdd');
					}
					$('.panel'+i).addClass('opacRemove');
				}
			}
			setTimeout(function(){
				$('.panel'+extendedPanel).removeClass('extend');
				if(noOfFlips >= 2) {
					$('.next'+next).show();
					$('.previous'+previous).show();	
				}
			}, 1500);
			hideMaxDetail();
			destroyMaxDetailInnerTags();
			showMinDetail();
			$('#sidebar-content').hide(500);
			setTimeout(function(){
				destroySidebarContent();
				loadSidebarContentBranch();
			}, 500);
			setTimeout(function(){
				var queryString = decodeURIComponent(window.location.search);
				queryString = queryString.substring(14);
				dismentalSidebarImage();
				console.log("order 2");
				$('#sidebar-image').attr("src", "images/legendary/"+queryString+".png");
				dismentalSidebarImage();
				console.log("order 3");
				alignSidebarImage();
				$('#sidebar-image').removeClass("hoverSidebarImage");
				$('#sidebar-content').show(500);
			}, 1000);
			setTimeout(function() {
				$('.panel'+extendedPanel).css('background-position', '0% 0%');
				extendedPanel = 0;
			}, 1500);
		});
		$('.next1').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnNext');
			$('.next1').hide(1000);
			$('.previous1').hide(1000);
			$('.previous2').show(1000);
			$('.next2').show(1000);
			activeFlip = next = previous = 2;
			$('.panel > .flip1').removeClass('active');
			$('.panel > .flip1').hide();
			$('.panel > .flip2').show();
			$('.panel > .flip2').addClass('active');
			$('.panel > .flip2 > .min-detail').hide();
			$('.panel > .flip2 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnNext');
				$('.panel > .flip2 > .min-detail').show(500);
			}, 2000);
		});
		$('.next2').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnNext');
			$('.next2').hide(1000);
			$('.previous2').hide(1000);
			if(noOfFlips > 2) {
				activeFlip = next = previous = 3;
			} else {
				activeFlip = next = previous = 1;
			}
			$('.previous'+activeFlip).show(1000);
			$('.next'+activeFlip).show(1000);

			$('.panel > .flip2').removeClass('active');
			$('.panel > .flip2').hide();
			$('.panel > .flip'+activeFlip).show();
			$('.panel > .flip'+activeFlip).addClass('active');
			$('.panel > .flip'+activeFlip+' > .min-detail').hide();
			$('.panel > .flip'+activeFlip+' > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnNext');
				$('.panel > .flip'+activeFlip+' > .min-detail').show(500);
			}, 2000);
		});
		$('.next3').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnNext');
			$('.next3').hide(1000);
			$('.previous3').hide(1000);
			if(noOfFlips > 3) {
				activeFlip = next = previous = 4;
			} else {
				activeFlip = next = previous = 1;
			}
			$('.previous'+activeFlip).show(1000);
			$('.next'+activeFlip).show(1000);
			
			$('.panel > .flip3').removeClass('active');
			$('.panel > .flip3').hide();
			$('.panel > .flip'+activeFlip).show();
			$('.panel > .flip'+activeFlip).addClass('active');
			$('.panel > .flip'+activeFlip+' > .min-detail').hide();
			$('.panel > .flip'+activeFlip+' > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnNext');
				$('.panel > .flip'+activeFlip+' > .min-detail').show(500);
			}, 2000);
		});
		$('.next4').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnNext');
			$('.next4').hide(1000);
			$('.previous4').hide(1000);
			if(noOfFlips > 4) {
				activeFlip = next = previous = 5;
			} else {
				activeFlip = next = previous = 1;
			}
			$('.previous'+activeFlip).show(1000);
			$('.next'+activeFlip).show(1000);
			
			$('.panel > .flip4').removeClass('active');
			$('.panel > .flip4').hide();
			$('.panel > .flip'+activeFlip).show();
			$('.panel > .flip'+activeFlip).addClass('active');
			$('.panel > .flip'+activeFlip+' > .min-detail').hide();
			$('.panel > .flip'+activeFlip+' > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnNext');
				$('.panel > .flip'+activeFlip+' > .min-detail').show(500);
			}, 2000);
		});
		$('.next5').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnNext');
			$('.next5').hide(1000);
			$('.previous5').hide(1000);
			$('.previous1').show(1000);
			$('.next1').show(1000);
			activeFlip = next = previous = 1;
			$('.panel > .flip5').removeClass('active');
			$('.panel > .flip5').hide();
			$('.panel > .flip1').show();
			$('.panel > .flip1').addClass('active');
			$('.panel > .flip1 > .min-detail').hide();
			$('.panel > .flip1 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnNext');
				$('.panel > .flip1 > .min-detail').show(500);
			}, 2000);
		});
		$('.previous1').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnPrevious');
			$('.previous1').hide(1000);
			$('.next1').hide(1000);
			activeFlip = next = previous = noOfFlips;
			$('.next'+activeFlip).show(1000);
			$('.previous'+activeFlip).show(1000);
			
			$('.panel > .flip1').removeClass('active');
			$('.panel > .flip1').hide();
			$('.panel > .flip'+activeFlip).show();
			$('.panel > .flip'+activeFlip).addClass('active');
			$('.panel > .flip'+activeFlip+' > .min-detail').hide();
			$('.panel > .flip'+activeFlip+' > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnPrevious');
				$('.panel > .flip'+activeFlip+' > .min-detail').show(500);
			}, 2000);
		});
		$('.previous2').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnPrevious');
			$('.previous2').hide(1000);
			$('.next2').hide(1000);
			activeFlip = next = previous = 1;
			$('.next1').show(1000);
			$('.previous1').show(1000);
			
			$('.panel > .flip2').removeClass('active');
			$('.panel > .flip2').hide();
			$('.panel > .flip1').show();
			$('.panel > .flip1').addClass('active');
			$('.panel > .flip1 > .min-detail').hide();
			$('.panel > .flip1 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnPrevious');
				$('.panel > .flip1 > .min-detail').show(500);
			}, 2000);
		});
		$('.previous3').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnPrevious');
			$('.previous3').hide(1000);
			$('.next3').hide(1000);
			activeFlip = next = previous = 2;
			$('.next2').show(1000);
			$('.previous2').show(1000);
			
			$('.panel > .flip3').removeClass('active');
			$('.panel > .flip3').hide();
			$('.panel > .flip2').show();
			$('.panel > .flip2').addClass('active');
			$('.panel > .flip2 > .min-detail').hide();
			$('.panel > .flip2 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnPrevious');
				$('.panel > .flip2 > .min-detail').show(500);
			}, 2000);
		});
		$('.previous4').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnPrevious');
			$('.previous4').hide(1000);
			$('.next4').hide(1000);
			activeFlip = next = previous = 3;
			$('.next3').show(1000);
			$('.previous3').show(1000);
			
			$('.panel > .flip4').removeClass('active');
			$('.panel > .flip4').hide();
			$('.panel > .flip3').show();
			$('.panel > .flip3').addClass('active');
			$('.panel > .flip3 > .min-detail').hide();
			$('.panel > .flip3 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnPrevious');
				$('.panel > .flip3 > .min-detail').show(500);
			}, 2000);
		});
		$('.previous5').click(function() {
			removeOpacityClasses();
			$('.panel').addClass('turnPrevious');
			$('.previous5').hide(1000);
			$('.next5').hide(1000);
			activeFlip = next = previous = 4;
			$('.next4').show(1000);
			$('.previous4').show(1000);
			
			$('.panel > .flip5').removeClass('active');
			$('.panel > .flip5').hide();
			$('.panel > .flip4').show();
			$('.panel > .flip4').addClass('active');
			$('.panel > .flip4 > .min-detail').hide();
			$('.panel > .flip4 > .max-detail').hide();
			setTimeout(function() {
				$('.panel').removeClass('turnPrevious');
				$('.panel > .flip4 > .min-detail').show(500);
			}, 2000);
		});
		$('.panel').click(function() {

		});
		$('.panel1').mouseover(function() {
			
		});
		$('.panel1').mouseout(function() {
			
		})
	} else {
		setTimeout(dynamicMainContentReady, 100);
	}
}

function hideMaxDetail() {
	//Hide max details of active flip of panels
	for(i = 1; i <= NUMBER_OF_PANELS; i++)
		$('.panel'+ i +' > .active > .max-detail').hide();
}
function showMinDetail() {
	//Show min details of active flip of panel
	if(extendedPanel) {
		setTimeout(function() {
			$('.panel'+extendedPanel+' > .active > .min-detail').show(1500);
			//extendedPanel = 0;
		}, 1000);
	} else {
		console.log('extendedPanel error');
	}
}

// function disablePanels(flip) {
// 	$('.panel > .'+ flip).hide();
// }

// function enablePanels(flip) {
// 	setTimeout(function() {
// 		$('.panel > .active > .min-detail').show(1000);
// 	}, 500);
// }

function createMaxDetailInnerTags() {
	var panel = document.getElementsByClassName('panel'+extendedPanel)[0];
	var flip = panel.getElementsByClassName('flip'+activeFlip)[0];
	var maxDetail = flip.getElementsByClassName('max-detail')[0];
	// To change the order of max-detail modify the below array
	var eventSheet = ['event-name', 'event-branch', 'event-society', 'event-clubName', 
		'event-website', 'event-info', 'event-rules', 'event-rounds', 'event-coordinators', 
		'event-prize'];
	for(i = 0; i < eventSheet.length; i++) {
		var div = document.createElement("div");
		div.setAttribute("id", eventSheet[i]);
		maxDetail.appendChild(div);
	}
}

function destroyMaxDetailInnerTags() {
	$('.panel'+ extendedPanel +' > .flip'+ activeFlip +' > .max-detail').empty();
}

function eventNumber() {
	if(!extendedPanel)
		return extendedPanel;
	else {
		return ((activeFlip-1)*NUMBER_OF_PANELS + extendedPanel);
	}
}

function removeOpacityClasses() {
	for(i = 0; i <= NUMBER_OF_PANELS; i++) {
		if($('.panel'+i).hasClass('opacAdd')) {
			$('.panel'+i).removeClass('opacAdd');
		}
		if($('.panel'+i).hasClass('opacRemove')) {
			$('.panel'+i).removeClass('opacRemove');
		}
	}
}