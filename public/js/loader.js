// number of loaded images for preloader progress
var loadedCount = 0; //current number of images loaded
var imagesToLoad = $('.js-load').length; //number of slides with .bcg container
var loadingProgress = 0; //timeline progress - starts at 0

$('.js-load').imagesLoaded({
    
}).progress(function(instance, image) {
    loadProgress();
});

function loadProgress(imgLoad, image) {
    //one more image has been loaded
    loadedCount++;

    loadingProgress = (loadedCount / imagesToLoad);

    // GSAP tween of our progress bar timeline
    TweenLite.to(progressTl, 0.7, {progress: loadingProgress, ease: Linear.easeNone});
}

//progress timeline
var progressTl = new TimelineMax({
    paused: true,
    onUpdate: progressUpdate,
    onComplete: prepareForHide
});

progressTl
    //tween the progress bar width
    .to($('.loader-progress span'), 1, {width: 100, ease: Linear.easeNone});

//as the progress bar width updates and grows we put the percentage loaded in the screen
function progressUpdate() {
    //the percentage loaded based on the tween's progress
    loadingProgress = Math.round(progressTl.progress() * 100);

    //we put the percentage in the screen
    $(".loader-text").text(loadingProgress + '%');
}

function prepareForHide() {
    // Scroll to the top of the page
    $('html, body').animate({scrollTop: 0}, 0, function() {
        // After scrolling, hide the loader
        hideLoader();
    });
}

function hideLoader() {
    var preloaderOutTl = new TimelineMax();

    preloaderOutTl
        .to($('.loader-wrapper'), 0.3, {autoAlpha: 0, ease: Back.easeInOut})
        .set($('body'), {className: '-=is-loading'})
        .set($('html'), {className: '+=is-intro-leave'})
        .set($('#intro'), {className: '+=is-loaded'})
        .to($('#site-loader'), 0.8, {yPercent: 100, ease: Power4.easeInOut})
        .set($('#site-loader'), {className: '+=is-hidden'});

    return preloaderOutTl;
}
