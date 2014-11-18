// http://www.ericwenn.se/playground/jquery-calendar/
var yy;
var calendarArray =[];
var monthOffset = [6,7,8,9,10,11,0,1,2,3,4,5];
var monthArray = [["JAN","January"],["FEB","February"],["MAR","March"],["APR","April"],["MAY","May"],["JUN","June"],["JUL","July"],["AUG","August"],["SEP","September"],["OCT","October"],["NOV","November"],["DEC","December"]];
//var dayArray = ["7","1","2","3","4","5","6"];
var dayArray = ["1","2","3","4","5","6","7"];
$(document).ready(function() {

	$(document).on('click','.calendar-day.have-events',activateDay);
	$(document).on('click','.specific-day',activatecalendar);
	$(document).on('click','.return',activatecalendar);
	$(document).on('click','.calendar-month-view-arrow',offsetcalendar);
	$(window).resize(calendarScale);
	calendarSet();
	calendarScale();    
/* 	$( "#calendar-main" ).fadeIn("slow"); */

});

	function calendarScale() {
		$(".calendar").each(function() {
			if($(this).width() < 400 && !$(this).hasClass('small')) {
				$(this).addClass('small');
			} else if($(this).width() > 400 && $(this).hasClass('small')) {
				$(this).removeClass('small');
			}
		})
	}

	function offsetcalendar() {
		var cm = parseInt($(".calendar").attr('offset'));
		if($(this).data('dir') == "left") {
			calendarSetMonth(cm-1);
		} else if($(this).data('dir') == "right") {
			calendarSetMonth(cm+1);
		}

	}

	function orderBy(deli,array) {
		var p = array.slice();
		var o = p.length;
		var y,t;
		var temparray = [];
		for(var u=0; u<o;u++) {
			for(var uu=0;uu<p.length;uu++) {
				if(uu==0) {
					t = uu;
					y = p[uu];
				}
				else if(parseInt(p[uu][deli].replace('.','')) < parseInt(y[deli].replace('.',''))) {
					y = p[uu];
					t = uu;
				}
			}
			temparray.push(y);
			p.splice(t,1);
		}
		return temparray;
	}

	function calendarSet() {
		$(".calendar").append('<div class="calendar-month-view"><div class="calendar-month-view-arrow" data-dir="left"><i class="icon-reply"></i></div><div class="calendar-month-view-title"></div><div class="calendar-month-view-arrow" data-dir="right"><i class="icon-share-alt"></i></div><div class="days"><span class="dayofweek">S</span><span class="dayofweek">M</span><span class="dayofweek">T</span><span class="dayofweek">W</span><span class="dayofweek">T</span><span class="dayofweek">F</span><span class="dayofweek">S</span></div></div><div class="calendar-holder"><div class="calendar-grid"></div><div class="calendar-specific"><div class="specific-day"><div class="specific-day-info" i="day"></div><div class="specific-day-info" i="month"></div><div class="specific-day-info" i="year"></div><div class="return"><i class="icon-reply"></i>&nbsp; Return to Calendar</div></div><div class="specific-day-scheme"></div></div></div>');
		$(".calendar").each(function() {
			if($(this).data("color") == undefined) {
				$(this).data("color","red");
			}
			$(this).find('[data-role=day]').each(function() {
				var tempdayarray = [];
				$(this).find('[data-role=event]').each(function() {
					var tempeventarray = [];
					tempeventarray["name"] = $(this).data("name");
					tempeventarray["type"] = $(this).data("type");
					tempeventarray["opp"] = $(this).data("opp");										
					tempeventarray["start"] = $(this).data("start");
					tempeventarray["end"] = $(this).data("end");
					tempeventarray["location"] = $(this).data("location");
					tempeventarray["details"] = $(this).data("details");
					tempdayarray.push(tempeventarray);
				});
				calendarArray[$(this).data('day')] = tempdayarray;
			});
		});
		$(".calendar [data-role=day]").remove();
		calendarSetMonth();
	}
	function activateDay() {
		$(this).parents('.calendar').addClass('spec-day');
		var di = new Date(parseInt($(this).attr('time')));
		var strtime = $(this).attr('strtime');
		var d = new Object();
		d.day = di.getDate();
		d.month = di.getMonth();
		d.year = di.getFullYear();
		d.events = calendarArray[strtime];
		d.tocalendar = tocalendar;
		d.tocalendar();
	}
	var tocalendar = function() {
		$(".specific-day-info[i=day]").html(this.day);
		$(".specific-day-info[i=month]").html(monthArray[this.month][1]);
		$(".specific-day-info[i=year]").html(this.year);
		if(this.events !== undefined) {
		var ev = orderBy('start',this.events);
			for(var o = 0; o<ev.length;o++) {
				if(ev[o]['details']){
					$(".specific-day-scheme").append('<div class="specific-day-scheme-event"><h1><i class="icon-calendar"></i>&nbsp;'+ev[o]['name']+'</h1><p data-role="dur">'+ev[o]['start']+' - '+ev[o]['end']+'</p><p data-role="loc">'+ev[o]['location']+'</p><p data-role="det">'+ev[o]['details']+'</p></div>');	
				} else {
					$(".specific-day-scheme").append('<div class="specific-day-scheme-event"><h1><i class="icon-calendar"></i>&nbsp;'+ev[o]['name']+'</h1><p data-role="dur">'+ev[o]['start']+' - '+ev[o]['end']+'</p><p data-role="loc">'+ev[o]['location']+'</p></div>');
				}		
			}
		}
	}
	function activatecalendar() {
		$(this).parents('.calendar').removeClass('spec-day');
		$(".specific-day-scheme").html('');
	}
	function calendarSetMonth(offset) {
		$(".calendar-grid").html('');
		var d = new Date();
		var c = new Date();
		var e = new Date();
		if(offset !== undefined) {
			d.setMonth(d.getMonth()+offset);
			e.setMonth(e.getMonth()+offset);
			$(".calendar").attr('offset', offset);
		} else {
			$(".calendar").attr('offset', 0);
		}
		$(".calendar .calendar-month-view-title").text(monthArray[d.getMonth()][1]+' '+String.fromCharCode(160)+' '+d.getFullYear());
			d.setDate(1);
			if(dayArray[d.getDay()] == 1) {
				d.setDate(d.getDate()-7);
			} else {
				d.setDate(d.getDate()-dayArray[d.getDay()]+1);
			}
			for(var i=0;i<42;i++) {
				d.setDate(d.getDate()+i);
				var cal_day = $('<div class="calendar-day"><div class="date-holder">'+d.getDate()+'</div></div>');
				if(d.getMonth() !== e.getMonth()) {
					cal_day.addClass('other-month');
				}
				if(d.getTime() == c.getTime()) {
					cal_day.addClass('this-day');
				}
				var strtime = d.getFullYear()+''+(d.getMonth()+1)+''+d.getDate();
				if(calendarArray[strtime] !== undefined) {
					cal_day.addClass('have-events'); //has at least 1 Event
					
					if(calendarArray[strtime].length < 3){ // 2 events
						cal_day.addClass('have-events1'); 
					} else if(calendarArray[strtime].length < 4) { // 3 events 
						cal_day.addClass('have-events2'); 
					} else if(calendarArray[strtime].length < 5) { //4 events 
						cal_day.addClass('have-events3'); 
					} else if(calendarArray[strtime].length < 6) { //5 events
						cal_day.addClass('have-events4'); 
					} else if(calendarArray[strtime].length >= 6){ //6 or more events
						cal_day.addClass('have-events5'); 
					}

				}
			
				var cal_day_eventholder = $('<div class="event-notif-holder"></div>');
				if(calendarArray[strtime] != undefined) {
						if(calendarArray[strtime].length > 1){
							cal_day_eventholder.append('<div class="activity-count-box"><span class="activity-count">'+calendarArray[strtime].length+'</span> Events</div>');	
//							cal_day_eventholder.append('<div class="activity-count-box">'+calendarArray[strtime].length+' Events</div>');								
						} else {
							cal_day_eventholder.append('<div class="activity-count-box"><span class="activity-count">'+calendarArray[strtime].length+'</span> Event</div>');
//							cal_day_eventholder.append('<div class="activity-count-box">'+calendarArray[strtime].length+' Event</div>');							
						}
						
				var events = calendarArray[strtime];		
				if(events !== undefined) {
					//cal_day_eventholder.append('events are defined');
					//cal_day_eventholder.append(strtime);
					for(var o = 0; o<events.length;o++) {
						if(events[o]['type'] !== undefined) {
							console.log(events);
/* 							cal_day_eventholder.append(events[o]['type']);	 */
/* 							cal_day_eventholder.append(events[o]['opp']);	 */

								cal_day_eventholder.append("<div class='major-event'><img src='images/" + events[o]['type'] + "/" + events[o]['opp'] + "-sm.png' /> vs <img src='images/" + events[o]['type'] + "/Edmonton-sm.png' /></div>");									

							
							
						}
											
					}
					
				} else {
					cal_day_eventholder.append('no details');
				}						
						

				}
				cal_day.attr('strtime',strtime);
				cal_day.attr('time',d.getTime());
				cal_day.prepend(cal_day_eventholder);

				$(".calendar-grid").append(cal_day);
				d.setDate(d.getDate()-i);
			}
	}