/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const STORENUMBER = '0392';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$( document ).ready(function() {


    $('.navitem').click(function(){
        var id = $(this).attr('id');
        openPanel(id);
        $('.navitem').off('click'); //disable nav
    });

    $('#close').click(function(){
        closePanel();
        $( ".navitem" ).on( "click", function() {
            var id = $(this).attr('id');
            openPanel(id);
            $('.navitem').off('click');
        });
    });
//    loadIndex();
});

var openPanel = function(id){

    $("#panel").addClass("open");
    $("#arrow").hide();


    switch(id){
        case "services":
            $("#how").addClass("grey");
            $("#training").addClass("grey");
        break;

        case "how":
            $("#services").addClass("grey");
            $("#training").addClass("grey");
        break;

        case "training":
            $("#services").addClass("grey");
            $("#how").addClass("grey");
        break;
    }

    $( "#panel" ).animate({
      width: "+=750"
      }, 300, function() {
        // Animation complete.
        $("#close").fadeIn();
        loadNavContent(id);
    });
}

var closePanel = function(){

    hideNavItems();
    $("#panel").removeClass("open");
    // $("#services").removeClass("grey");
    // $("#how").removeClass("grey");
    // $("#training").removeClass("grey");

    $( "#panel" ).animate({
      width: "-=750"
      }, 300, function() {
        //put the arrow back, if we need it
        if( $('#main>#arrow') ) {
            $("#arrow").show();
        }
    });
    $("#close").hide();
}

var loadNavContent = function(id){
   // $("#nav-"+id).load("nav/"+id+".html").fadeIn();
   $("#nav-"+id).fadeIn();
}

var hideNavItems = function(){
    $("#nav-services").fadeOut(300);
    $("#nav-how").fadeOut(300);
    $("#nav-training").fadeOut(300);
}

var loadMainContent = function(c){
    $('#main').fadeOut(10);
    hideNavItems();
    $("#panel").removeClass("open");
    $("#services").removeClass("grey");
    $("#how").removeClass("grey");
    $("#training").removeClass("grey");

    $( "#panel" ).animate({
      width: "-=750"
      }, 300, function() {
        // Animation complete.
        $('#main').load("content/"+c+".html").fadeIn(500);
        //alert("done");
    });
    $("#close").hide();

    $( ".navitem" ).on( "click", function() {
        var id = $(this).attr('id');
        openPanel(id);
        $('.navitem').off('click');
    });
}


var loadMainContentSplash = function(c){
    $('#main').fadeOut(10);
   // hideNavItems();
    // $("#panel").removeClass("open");
    // $("#services").removeClass("grey");
    // $("#how").removeClass("grey");
    // $("#training").removeClass("grey");

    // $( "#panel" ).animate({
    //   width: "-=750"
    //   }, 300, function() {
    //     // Animation complete.
         $('#main').load("content/"+c+".html").fadeIn(500);
    //     //alert("done");
    // });
    // $("#close").hide();

    // $( ".navitem" ).on( "click", function() {
    //     var id = $(this).attr('id');
    //     openPanel(id);
    //     $('.navitem').off('click');
    // });
}

var loadIndex = function(){
    $('#main').fadeOut(10);
    $("#close").hide();

    if($('#panel').hasClass('open')){

        hideNavItems();
        $("#panel").removeClass("open");
        $("#services").removeClass("grey");
        $("#how").removeClass("grey");
        $("#training").removeClass("grey");

        $( "#panel" ).animate({
          width: "-=750"
          }, 300, function() {
            // Animation complete.
            $('#main').load("content/index-content.html").fadeIn(500);
            //alert("done");
        });
        $("#close").hide();

        $( ".navitem" ).on( "click", function() {
            var id = $(this).attr('id');
            openPanel(id);
            $('.navitem').off('click');
        });

    } else {

        $('#main').fadeOut(10);
       // $('#main').load("content/index-content.html").fadeIn(500);
        //$('#main').load("content/index-content.html");
    }
}

var getFeaturedContent = function(){

    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/photos', function(json) {
      my_json = json;

        //loop the photos
        var i=0;
            $.each(my_json, function(index, element) {

            // $('#feature').append(
            //    // "<div style='float: left; height: 727px; width:100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/feature/"+my_json[1].path+"&w=1280&h=727.jpg) top left no-repeat;'><div class='content'><div id='ribbon'>Featured Athletes</div><h1>"+my_json[1].title+"</h1><p>"+my_json[1].content+"</p></div></div>"
            //    //"<div style='height: 100%; width: 100%; background: url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/feature/"+element.path+"&w=1000.jpg)></div>"

            // );

            i++;
        });



        var display = getRandomInt(0, i);
        $('#feature').append(
           //"<div style='float: left; height: 727px; width:100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/photos/"+my_json[display].path+"&w=1280&h=727.jpg) top left no-repeat;'><div class='content'><div id='ribbon'>Featured Athletes</div><h1>"+my_json[display].title+"</h1><p>"+my_json[display].content+"</p></div></div>"
           "<div style='float: left; height: 727px; width:100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/photos/"+my_json[display].path+"&w=1280&h=727.jpg) top left no-repeat; position: absolute; top: 0; left: 0;'><div class='splash-content'><h1 class='splash-title'>Community Board</h1>"+splash+"</div></div>"
           //"<div style='height: 100%; width: 100%; background: url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/feature/"+element.path+"&w=1000.jpg)></div>"

        );

//        $('.splash-content').load("content/splash-nav.html").fadeIn(500);
;


    });

}

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var getCalendar = function(){

    $('.calendar').load("http://communityboard.storeapps.fglsports.dmz/"+STORENUMBER+"/api/calendar", function(){
        $.getScript( "js/calendar.full.js", function( data, textStatus, jqxhr ) {
            // console.log( data ); // Data returned
            // alert( data ); // Data returned
            // alert( textStatus ); // Success
            //alert( jqxhr.status ); // 200
            // console.log( "Load was performed." );
        });
    });
}

var getInteractiveFlyer = function(){
    $('#flyer').load("http://communityboard.storeapps.fglsports.dmz/int-flyer-"+STORENUMBER+".php");
}

var getScores= function(){

            var sport = "";
            var feed ="http://thecompleteexperience.ca/feed/all_scores.xml";
            var timezoneoffset = 0;
            var prevsport = "";

            var setupScores = function(){
                $.get(feed, function(d){
                // $('body').append('<h1> Last Night\'s NBA Scores</h1>');
                //$('body').append('<ul id="gallery">');
                // $(d).find('scores').each(function(){
                //     var $scores = $(this);
                //     sport = $scores.attr("sport");
                // });


                $(d).find('game').each(function(){

                    var $game = $(this);
                    var id = $game.attr("id");

                    var sport = $game.attr("sport");
                    var home = $game.find('home').text();

                    var homeclass = home;
                    homeclass = homeclass.replace(' ', '');
                    homeclass = homeclass.replace('.', '');

                    var home_score = $game.find('home_score').text();
                    var visitor = $game.find('visitor').text();

                    var visitorclass = visitor;
                    visitorclass = visitorclass.replace(' ', '');
                    visitorclass = visitorclass.replace('.', '');

                    var visitor_score = $game.find('visitor_score').text();

                    if($game.attr("type") == "upcoming" ){
                        var gametime = $game.find('game_time').text();
                        var timeparts = gametime.split(":");
                        gametime = (Number(timeparts[0]) + Number(timezoneoffset)) + ":" + timeparts[1];
                    } else {
                        var gametime = $game.find('game_time').text();
                    }

                    if($game.attr("type") == "upcoming" ){
                        var gametime = $game.find('game_time').text();
                        var timeparts = gametime.split(":");
                        gametime = (Number(timeparts[0]) + Number(timezoneoffset)) + ":" + timeparts[1];
                    } else {
                        var gametime = $game.find('game_time').text();
                    }

                    var period = $game.find('period').text();
                        switch(period){
                            case "1 Period": period="1<sup>st</sup> Period"; break;
                            case "2 Period": period="2<sup>nd</sup> Period" ; break;
                            case "3 Period": period="3<sup>rd</sup> Period"; break;

                            case "1 Qtr": period="1<sup>st</sup> Quarter"; break;
                            case "2 Qtr": period="2<sup>nd</sup> Quarter"; break;
                            case "3 Qtr": period="3<sup>rd</sup> Quarter"; break;
                            case "4 Qtr": period="4<sup>th</sup> Quarter"; break;
                            default: period=period; break;
                        }

                    if(gametime=="" && period=="3<sup>rd</sup> Period") {
                        period = "2<sup>nd</sup> Intermission";
                    }
                    if(gametime=="" && period=="2<sup>rd</sup> Period") {
                        period = "1<sup>st</sup> Intermission";
                    }

                    var note = $game.find('note').text();
                    if( note =="** CONFIRMED **"){
                        note = "";
                    }

                    if(period=="0 Period"){
                        period="Starting Now";
                    }

                    //new york
                    if(home=="NY Islanders" || home=="NY Rangers" || home=="NY Yankees" || home=="NY Mets"){
                        home = "New York";
                    }

                    if(visitor=="NY Islanders" || visitor=="NY Rangers" || visitor=="NY Yankees" || visitor=="NY Mets"){
                        visitor = "New York";
                    }

                    //LA
                    if(home=="LA Clippers" || home=="LA Lakers" || home=="LA Angels" || home=="LA Dodgers" ){
                        home ="Los Angeles";
                    }

                    if(visitor=="LA Clippers" || visitor=="LA Lakers" || visitor=="LA Angels" || visitor=="LA Dodgers" ){
                        visitor ="Los Angeles";
                    }

                    //chicago
                    if(home=="Chicago WSox" || home=="Chicago Cubs"){
                        home ="Chicago";
                    }

                    if(visitor=="Chicago WSox" || visitor=="Chicago Cubs" ){
                        visitor ="Chicago";
                    }

                    var period = $game.find('period').text();
                    var note = $game.find('note').text();
                    if( note =="** CONFIRMED **"){
                        note = "";
                    }

                    if(period=="0 Period"){
                        period="Starting Now";
                    }

                    //not the same sport start a new line
                    if( prevsport != sport ){
                        console.log("prev: " +prevsport);
                        console.log("sport: " +sport);
                        $('#masterscoretable').append("<div class='sport-row'><img src='http://communityboard.storeapps.fglsports.dmz//images/"+sport+"/logo_"+sport+"_sm.png' /><span class='sport-title'>"+sport+" SCOREBOARD</span></div>");
                    }


                    //var html = "<li id='game"+id+"'><table class='scoretable'>";
                    var html = "<table class='scoretable'>";

                        html +=   "<tr class='scorebar'>";
                        html +=   "    <td class='logo'>";
                        html +=   "        <span class='team-logo "+sport+"-"+homeclass+"'></span>";
                        html +=   "    </td>";
                        html +=   "    <td class='cityteam'>";
                        html +=   "        <span class='team-city'>"+home+"</span>";
                        html +=   "        <span class='team-name'>"+getNick(sport,homeclass)+"</span>";
                        html +=   "    </td>";
                        html +=   "    <td>";
                        html +=   "        <span class='score hscore'>"+home_score+"</span>";
                        html +=   "    </td>";
                        html +=   "</tr>";
                        html +=   "<tr class='scorebar'>";
                        html +=   "    <td>";
                        html +=   "        <span class='team-logo "+sport+"-"+visitorclass+"''></span>";
                        html +=   "    </td>";
                        html +=   "    <td class='cityteam'>";
                        html +=   "        <span class='team-city'>"+visitor+"</span>";
                        html +=   "        <span class='team-name'>"+getNick(sport,visitorclass)+"</span>";
                        html +=   "    </td>";
                        html +=   "    <td>";
                        html +=   "        <span class='score vscore'>"+visitor_score+"</span>";
                        html +=   "    </td>";
                        html +=   "</tr>";
                        html +=   "<tr class='leagueheader'>";
                        html +=   "    <td colspan='3'>";
                        html +=   "    <span class='clock time'>"+gametime+ "&nbsp;&nbsp;&nbsp;" +period+"</span></td>";
                        html +=   "</tr>";

                    // html +=   "<tr>";
                    // //html +=    "<td rowspan='2' class='league'><img src='http://communityboard.storeapps.fglsports.dmz//images/"+sport+"/logo_"+sport+"_sm.png' /></td>";
                    // html +=     "<td class='team home'>"+home+"</td>";
                    // html +=     "<td class='score' id='hscore'>"+home_score+"</td>";
                    // html +=     "<td rowspan='2' class='period' id='time'>"+gametime+ "<br />" +period+"</td>";
                    // html +=     "<td class='note'></td>";
                    // html +=   "</tr>";
                    // html +=   "<tr>";
                    // html +=     "<td class='team visitor'>"+visitor+"</td>";
                    // html +=     "<td class='score' id='vscore'>"+visitor_score+"</td>";
                    // html +=   "</tr>";
                    html +=  "</table>";
                    // html += '</li>';

                    $('#masterscoretable').append($(html));

                    prevsport = sport;

                   // $("li").css("display","none"); //hide
                    //$("#gallery li:first-child").css("display","block");

                    //  $('.loadingPic').fadeOut(1400);
                    });
                });
            };


            var updateScores =  function(){

                $.get(feed, function(d){
                $(d).find('game').each(function(){
                    var $game = $(this);
                    var id = $game.attr("id");
                    var home = $game.find('home').text();
                    var home_score = $game.find('home_score').text();
                    var visitor = $game.find('visitor').text();
                    var visitor_score = $game.find('visitor_score').text();
                    //var gametime = $game.find('game_time').text();

                    if($game.attr("type") == "upcoming" ){
                        var gametime = $game.find('game_time').text();
                        var timeparts = gametime.split(":");
                        gametime = (Number(timeparts[0]) + Number(timezoneoffset)) + ":" + timeparts[1];
                    } else {
                        var gametime = $game.find('game_time').text();
                    }

                    var period = $game.find('period').text();
                        switch(period){
                            case "1 Period": period="1<sup>st</sup> Period"; break;
                            case "2 Period": period="2<sup>nd</sup> Period" ; break;
                            case "3 Period": period="3<sup>rd</sup> Period"; break;

                            case "1 Qtr": period="1<sup>st</sup> Quarter"; break;
                            case "2 Qtr": period="2<sup>nd</sup> Quarter"; break;
                            case "3 Qtr": period="3<sup>rd</sup> Quarter"; break;
                            case "4 Qtr": period="4<sup>th</sup> Quarter"; break;
                            default: period=period; break;
                        }

                    if(gametime=="" && period=="3<sup>rd</sup> Period") {
                        period = "2<sup>nd</sup> Intermission";
                    }
                    if(gametime=="" && period=="2<sup>rd</sup> Period") {
                        period = "1<sup>st</sup> Intermission";
                    }

                    var note = $game.find('note').text();
                    if( note =="** CONFIRMED **"){
                        note = "";
                    }

                    if(period=="0 Period"){
                        period="Starting Now";
                    }

                    //new york
                    if(home=="NY Islanders" || home=="NY Rangers" || home=="NY Yankees" || home=="NY Mets"){
                        home = "New York";
                    }

                    if(visitor=="NY Islanders" || visitor=="NY Rangers" || visitor=="NY Yankees" || visitor=="NY Mets"){
                        visitor = "New York";
                    }

                    //LA
                    if(home=="LA Clippers" || home=="LA Lakers" || home=="LA Angels" || home=="LA Dodgers" ){
                        home ="Los Angeles";
                    }

                    if(visitor=="LA Clippers" || visitor=="LA Lakers" || visitor=="LA Angels" || visitor=="LA Dodgers" ){
                        visitor ="Los Angeles";
                    }

                    //chicago
                    if(home=="Chicago WSox" || home=="Chicago Cubs"){
                        home ="Chicago";
                    }

                    if(visitor=="Chicago WSox" || visitor=="Chicago Cubs" ){
                        visitor ="Chicago";
                    }

                    var note = $game.find('note').text();

                    if(period=="0 Period"){
                        period="Starting Now";
                    }

                    $('li#game'+id+' #hscore' ).html(home_score);
                    $('li#game'+id+' #vscore' ).html(visitor_score);
                    $('li#game'+id+' #time' ).html(gametime+ "<br />" +period);
                  //  $('li#game'+id+' .note' ).html(note);

                     //   console.log(id+ " " +home+" " +home_score +" / "+visitor+ " "+visitor_score+": " +gametime+ " "+period+" - "+note);
                    });
                });
//                console.log("-----------------------------------------------");

            };
            setupScores();
            setInterval(function(){ setupScores(); },3600000);
            setInterval(function(){ updateScores(); },5000);

                    // setInterval(function(){
                    //  // console.log("looped");
                    //   $('#gallery li:first-child').fadeOut(120,  function(){
                    //     $(this).next('li').fadeIn(120).end().appendTo('#gallery');
                    //   });
                    // }, 8000);

        // });


}

var getNick = function(league, city){

            console.log("league:" + league + " City:"+ city);

            switch(league){
                case 'NBA':
                    switch(city){
                        case "Atlanta": return "Hawks"; break;
                        case "Boston": return "Celtics"; break;
                        case "Brooklyn": return "Nets"; break;
                        case "Chicago": return "Bulls"; break;
                        case "Charlotte": return "Bobcats"; break;
                        case "Cleveland": return "Cavaliers"; break;
                        case "Dallas": return "Mavericks"; break;
                        case "Philadelphia": return "79ers"; break;
                        case "Denver": return "Nuggets"; break;
                        case "Detroit": return "Pistons"; break;
                        case "GoldenState": return "Warriors"; break;
                        case "Houston": return "Rockets"; break;
                        case "Indiana": return "Pacers"; break;
                        case "LALakers": return "Lakers"; break;
                        case "LAClippers": return "Clippers"; break;
                        case "Memphis": return "Grizzlies"; break;
                        case "Miami": return "Heat"; break;
                        case "NewYork": return "Knicks"; break;
                        case "Milwaukee": return "Bucks"; break;
                        case "Minnesota": return "Timberwolves"; break;
                        case "OklahomaCity": return "Thunder"; break;
                        case "Orlando": return "Magic"; break;
                        case "Phoenix": return "Suns"; break;
                        case "Portland": return "Trail Blazers"; break;
                        case "Sacramento": return "Kings"; break;
                        case "SanAntonio": return "Spurs"; break;
                        case "Toronto": return "Raptors"; break;
                        case "Utah": return "Jazz"; break;
                        case "Washington": return "Wizards"; break;
                        case "NewOrleans": return "Pelicans"; break;
                        default: return ""; break;
                    }

                case 'NHL':
                    switch(city){
                        case "Anaheim": return "Ducks"; break;
                        case "Boston": return "Bruins"; break;
                        case "Buffalo": return "Sabres"; break;
                        case "Calgary": return "Flames"; break;
                        case "Carolina": return "Hurricanes"; break;
                        case "Chicago": return "Blackhawks"; break;
                        case "Colorado": return "Avalanche"; break;
                        case "Columbus": return "Blue Jackets"; break;
                        case "Dallas": return "Stars"; break;
                        case "Detroit": return "Red Wings"; break;
                        case "Florida": return "Panthers"; break;
                        case "Edmonton": return "Oilers"; break;
                        case "NYIslanders": return "Islanders"; break;
                        case "NYRangers": return "Rangers"; break;
                        case "LosAngeles": return "Kings"; break;
                        case "Minnesota": return "Wild"; break;
                        case "Montreal": return "Canadiens"; break;
                        case "Nashville": return "Predators"; break;
                        case "NewJersey": return "Devils"; break;
                        case "Ottawa": return "Senators"; break;
                        case "Philadelphia": return "Flyers"; break;
                        case "Phoenix": return "Coyotes"; break;
                        case "Pittsburgh": return "Penguins"; break;
                        case "SanJose": return "Sharks"; break;
                        case "StLouis": return "Blues"; break;
                        case "TampaBay": return "Lightning"; break;
                        case "Toronto": return "Maple Leafs"; break;
                        case "Vancouver": return "Cancucks"; break;
                        case "Washington": return "Capitals"; break;
                        case "Winnipeg": return "Jets"; break;

                        default: return ""; break;
                    }

                case 'MLB':
                    switch(city){

                        case "Arizona": return "Diamondbacks"; break;
                        case "Atlanta": return "Braves"; break;
                        case "Baltimore": return "Orioles"; break;
                        case "ChicagoCubs": return "Cubs"; break;
                        case "ChicagoWSox": return "White Sox"; break;
                        case "Cincinnati": return "Reds"; break;
                        case "Cleveland": return "Indians"; break;
                        case "Colorado": return "Rockies"; break;
                        case "Detroit": return "Tigers"; break;
                        case "Houston": return "Astros"; break;
                        case "KansasCity": return "Royals"; break;
                        case "LAAngels": return "Angels"; break;
                        case "LosAngeles": return "Dodgers"; break;
                        case "Miami": return "Marlins"; break;
                        case "Milwaukee": return "Brewers"; break;
                        case "Minnesota": return "Twins"; break;
                        case "NYMets": return "Mets"; break;
                        case "NYYankees": return "Yankees"; break;
                        case "Oakland": return "Athletics"; break;
                        case "Philadelphia": return "Phillies"; break;
                        case "Pittsburgh": return "Pirates"; break;
                        case "Boston": return "Red Sox"; break;
                        case "SanDiego": return "Padres"; break;
                        case "SanFrancisco": return "Giants"; break;
                        case "Seattle": return "Mariners"; break;
                        case "StLouis": return "Cardinals"; break;
                        case "TampaBay": return "Rays"; break;
                        case "Texas": return "Rangers"; break;
                        case "Toronto": return "Blue Jays"; break;
                        case "Washington": return "Nationals"; break;

                        default: return ""; break;
                    }

                case 'NFL':
                    switch(city){
                        case "SanFrancisco": return "49ers"; break;
                        case "Arizona": return "Cardinals"; break;
                        case "Atlanta": return "Falcons"; break;
                        case "Baltimore": return "Ravens"; break;
                        case "Buffalo": return "Bills"; break;
                        case "Carolina": return "Panthers"; break;
                        case "Chicago": return "Bears"; break;
                        case "Cincinnati": return "Bengals"; break;
                        case "Cleveland": return "Browns"; break;
                        case "Dallas": return "Cowboys"; break;
                        case "Denver": return "Broncos"; break;
                        case "GreenBay": return "Packers"; break;
                        case "Houston": return "Texans"; break;
                        case "Indianapolis": return "Colts"; break;
                        case "Jacksonville": return "Jaguars"; break;
                        case "KansasCity": return "Chiefs"; break;
                        case "Miami": return "Dolphins"; break;
                        case "Minnesota": return "Vikings"; break;
                        case "NewEngland": return "Patriots"; break;
                        case "Detroit": return "Lions"; break;
                        case "NewOrleans": return "Saints"; break;
                        case "NewYorkGiants": return "Giants"; break;
                        case "NewYorkJets": return "Jets"; break;
                        case "Oakland": return "Raiders"; break;
                        case "Philadelphia": return "Eagles"; break;
                        case "Pittsburgh": return "Steelers"; break;
                        case "SanDiego": return "Chargers"; break;
                        case "Seattle": return "Seahawks"; break;
                        case "StLouis": return "Rams"; break;
                        case "TampaBay": return "Buccaneers"; break;
                        case "Tennessee": return "Titans"; break;
                        case "Washington": return "Redskins"; break;


                    }

                case 'CFL':
                    switch(city){
                        case "BC": return "Lions"; break;
                        case "Calgary": return "Stampeders"; break;
                        case "Edmonton": return "Eskimos"; break;
                        case "Saskatchewan": return "Roughriders"; break;
                        case "Winnipeg": return "Blue Bombers"; break;
                        case "Hamilton": return "Tiger-Cats"; break;
                        case "Toronto": return "Argonauts"; break;
                        case "Ottawa": return "Redblacks"; break;
                        case "Montreal": return "Alouettes"; break;
                    }

                default:
                    return "";
            }
        }

var getPhotos= function(){
    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/photos', function(json) {
      my_json = json;

        //loop the photos
        var i=1;
        $.each(my_json, function(index, element) {

            $('#photos').append(
               // "<div class='person'><a href=javascript:showPerson(`"+element.first+"`,`"+element.last+"`,`"+element.position+"`,`"+element.photo+"`,`"+element.bio+"`,`"+element.favorite_sport+"`);><img src='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+element.photo+"&amp;w=124&amp;h=158&amp;a=br'></a></div>"
               "<a class='fancybox' href='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/photos/"+element.path+"&w=1000.jpg'><img src='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/photos/"+element.path+"&w=300&h=200.jpg'></a>"

               // http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/photos/2bb5744e059a7a8a3f442ca4e54d108858a7097d.jpg&w=1000.jpg
            );

            i++;
        });

    });

    // $("#photos").gridalicious({ animate: true, gutter: 5, width: 300, selector: '.fancybox' });
    $('.fancybox').fancybox({ padding : 10, openEffect  : 'elastic',
            helpers : {
                title : {
                    type : 'inside'
            }
        }
    });
}








var getStaff = function(){

    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/staff', function(json) {
      my_json = json;
        var first_photo = my_json[0].photo;
        var first_first = my_json[0].first;
        var first_last = my_json[0].last;
        var first_bio = my_json[0].bio;
        var first_pos = my_json[0].position;
        var first_sport = my_json[0].favorite_sport;

        //alert(first_photo+" "+first_first+" "+first_last+" "+first_bio+" "+first_pos);
        //put #1 in the featured spot
        $('.selected').append(
            "<div style='height: 727px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+first_photo+"&amp;w=745&amp;h=727&amp;a=br);'><div class='staff-bio'><div class='staff-bio-content'><h1>"+first_first+" "+first_last+"</h1><h2>"+first_pos+" <span class='fav-sport'>❤ Sport: "+first_sport+"</span></h2><p>"+first_bio+"</p></div></div></div>"
        );

        //loop the others as photo buttons
        var i=1;
        $.each(my_json, function(index, element) {

            $('.staff').append(
               // "<div class='person'><a href=javascript:showPerson(`"+element.first+"`,`"+element.last+"`,`"+element.position+"`,`"+element.photo+"`,`"+element.bio+"`,`"+element.favorite_sport+"`);><img src='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+element.photo+"&amp;w=124&amp;h=158&amp;a=br'></a></div>"
               "<div class='person'><a href=javascript:showPerson("+i+");><img src='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+element.photo+"&amp;w=124&amp;h=158&amp;a=br'></a></div>"
            );

            i++;
        });

    });
}

var showPerson = function(i){
    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/staff', function(json) {
      my_json = json;
        var photo = my_json[i-1].photo;
        var first = my_json[i-1].first;
        var last = my_json[i-1].last;
        var bio = my_json[i-1].bio;
        var pos = my_json[i-1].position;
        var sport = my_json[i-1].favorite_sport;

        //alert(first_photo+" "+first_first+" "+first_last+" "+first_bio+" "+first_pos);
        //put #1 in the featured spot
        $('.selected div').fadeOut(300, function() { $(this).remove(); });

       // $('.selected').fadeIn(600, function() { $(this).append("<div style='height: 727px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+photo+"&amp;w=745&amp;h=727&amp;a=br);'><h1>"+first+" "+last+"</h1><p>"+bio+"</p></div>")   });

        $('.selected').append("<div style='height: 727px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+photo+"&amp;w=745&amp;h=727&amp;a=br);'><div class='staff-bio'><div class='staff-bio-content'><h1>"+first+" "+last+"</h1><h2>"+pos+" <span class='fav-sport'>❤ Sport: "+sport+"</span></h2><p>"+bio+"</p></div></div>></div>");
        $('.selected div').hide();

        //$('.selected div').fadeIn(600);
        $('.selected div').fadeIn(600);

    });
}

$('#logo').click(function(){  loadIndex() });
//services
$('#staff-nav').click(function(){   loadMainContent("staff") });
$('#photos-nav').click(function(){ loadMainContent("photos") });
$('#flyer-nav').click(function(){   loadMainContent("flyer") });
$('#cal-nav').click(function(){  loadMainContent("calendar") });
$('#scores-nav').click(function(){  loadMainContent("scores")});

$('#staff-nav-splash').click(function(){  loadMainContentSplash("staff") });
$('#photos-nav-splash').click(function(){ loadMainContentSplash("photos") });
$('#flyer-nav-splash').click(function(){   loadMainContentSplash("flyer") });
$('#cal-nav-splash').click(function(){  loadMainContentSplash("calendar") });
$('#scores-nav-splash').click(function(){  loadMainContentSplash("scores")})
