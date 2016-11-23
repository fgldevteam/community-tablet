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

const STORENUMBER = '0248';

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

    $('#gotoHome').click(function(){
       closePanel();
       window.location = "index.html"

    });
//    loadIndex();
});

var openPanel = function(id){

    $("#panel").addClass("open");

    //

    $('<div class="fancybox-brent"></div>').appendTo('#main');
    $("#photos a").removeClass("fancybox");
//    $("#photos").hide();
//    $("#arrow").hide();


    // switch(id){
    //     case "services":
    //         $("#how").addClass("grey");
    //         $("#training").addClass("grey");
    //     break;
    //
    //     case "how":
    //         $("#services").addClass("grey");
    //         $("#training").addClass("grey");
    //     break;
    //
    //     case "training":
    //         $("#services").addClass("grey");
    //         $("#how").addClass("grey");
    //     break;
    // }

    $( "#panel" ).animate({
      width: "+=750"
      }, 300, function() {
        // Animation complete.
        $("#close").fadeIn();
        $("#gotoHome").fadeIn();
        loadNavContent(id);
    });
}

var closePanel = function(){
    $('.fancybox-brent').remove();
    $("#photos a").addClass("fancybox");
    
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
    $("#gotoHome").hide();

//    $("#photos a").click(function(e){ e.preventDefault(); });
}

var loadNavContent = function(id){
   // $("#nav-"+id).load("nav/"+id+".html").fadeIn();
   //$("#nav-"+id).fadeIn();
   $(".navbox").fadeIn();
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
    $("#gotoHome").hide();


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
        // $("#panel").removeClass("open");
        // $("#services").removeClass("grey");
        // $("#how").removeClass("grey");
        // $("#training").removeClass("grey");

        $( "#panel" ).animate({
          width: "-=750"
          }, 300, function() {
            // Animation complete.
            $('#main').load("content/index-content.html").fadeIn(500);
            //alert("done");
        });
        $("#close").hide();
        $("#gotoHome").hide();

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

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


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




var getPhotos= function(){
    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/photos', function(json) {
      my_json = json;

        //loop the photos
        var i=1;
        var parent = 0;
            
        $.each(my_json, function(index, element) {

            var filename = element.path;
            var extension = filename.match(/\.(\w)+/);
            var file  = filename.substr(0, extension.index);

            if(index == 0) {
               var parent = 0;
            }
            else{
                var parent = getShortestColumn();
            }
            
            console.log("parent :"+ parent);
            
            $('#photos').find(".mosaicflow__column").eq(parent).append(
               
               "<div class='mosaicflow__item'> <a class='fancybox' href='http://communityboard.storeapps.fglsports.dmz/images/photos/full/"+file+"_1000.jpg'><img src='http://communityboard.storeapps.fglsports.dmz/images/photos/thumb/"+file+"_300.jpg'></a></div>"
               
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

var getShortestColumn = function() {

            var heights = [ 
                                $(".mosaicflow__column:eq(0)").height(),
                                $(".mosaicflow__column:eq(1)").height(),
                                $(".mosaicflow__column:eq(2)").height(),
                                $(".mosaicflow__column:eq(3)").height()
                          ];
            console.log(heights);
            var parent = heights.indexOf( Array.min(heights));
            return parent;
}






var getStaff = function(){

    var my_json;
    $.getJSON('http://communityboard.storeapps.fglsports.dmz/'+STORENUMBER+'/api/staff', function(json) {
      console.log(json);  
      my_json = json;
        // var first_photo = my_json[0].photo;
        // var first_first = my_json[0].first;
        // var first_last = my_json[0].last;
        // var first_bio = my_json[0].bio;
        // var first_pos = my_json[0].position;
        // var first_sport = my_json[0].favorite_sport;

        random = my_json[Math.floor(Math.random()*my_json.length)];
        var first_photo = random.photo;
        var extension = first_photo.match(/\.(\w)+/);
        var file  = first_photo.substr(0, extension.index);
        var first_first = random.first;
        var first_last = random.last;
        var first_bio = random.bio;
        var first_pos = random.position;
        var first_sport = random.favorite_sport;

        //alert(first_photo+" "+first_first+" "+first_last+" "+first_bio+" "+first_pos);
        //put #1 in the featured spot
        $('.selected').append(
            "<div style='height: 800px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/images/staff/p/"+file+"_1080X947.jpg) top center; '><div class='staff-bio'><div class='staff-bio-content'><h1>"+first_first+" "+first_last+"</h1><h2>"+first_pos+" <br /><span class='fav-sport'>❤ Sport: "+first_sport+"</span></h2><p>"+first_bio+"</p></div></div></div>"
        );

        //loop the others as photo buttons
        var i=1;
        $.each(my_json, function(index, element) {

            var filename = element.photo;
            var extension = filename.match(/\.(\w)+/);
            var file  = filename.substr(0, extension.index);
            

            $('.staff').append(
               // "<div class='person'><a href=javascript:showPerson(`"+element.first+"`,`"+element.last+"`,`"+element.position+"`,`"+element.photo+"`,`"+element.bio+"`,`"+element.favorite_sport+"`);><img src='http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+element.photo+"&amp;w=124&amp;h=158&amp;a=br'></a></div>"
               "<div class='person'><a href=javascript:showPerson("+i+");><img src='http://communityboard.storeapps.fglsports.dmz/images/staff/thumb/"+file+"_124X158.jpg'></a></div>"
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
        var extension = photo.match(/\.(\w)+/);
        var file  = photo.substr(0, extension.index);
        var first = my_json[i-1].first;
        var last = my_json[i-1].last;
        var bio = my_json[i-1].bio;
        var pos = my_json[i-1].position;
        var sport = my_json[i-1].favorite_sport;

        //alert(first_photo+" "+first_first+" "+first_last+" "+first_bio+" "+first_pos);
        //put #1 in the featured spot
        $('.selected div').fadeOut(300, function() { $(this).remove(); });

       // $('.selected').fadeIn(600, function() { $(this).append("<div style='height: 727px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/timthumb.php?src=/images/staff/"+photo+"&amp;w=745&amp;h=727&amp;a=br);'><h1>"+first+" "+last+"</h1><p>"+bio+"</p></div>")   });

        $('.selected').append("<div style='height: 800px; width: 100%; background:url(http://communityboard.storeapps.fglsports.dmz/images/staff/p/"+file+"_1080X947.jpg) top center;'><div class='staff-bio'><div class='staff-bio-content'><h1>"+first+" "+last+"</h1><h2>"+pos+" <span class='fav-sport'>❤ Sport: "+sport+"</span></h2><p>"+bio+"</p></div></div>></div>");
        $('.selected div').hide();

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
