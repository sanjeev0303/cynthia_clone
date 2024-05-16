const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAmim(){
    var tl = gsap.timeline();


    tl.from(".nav", {
        y: '-10',
        opacity: 0,
        duration: 1.2,
        ease: Expo.easeInOut
    })
    .to(".bounding__elem", {
        y: '0',
        duration: 1.6,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })

    .from(".hero__footer", {
        y: '-10',
        opacity: 0,
        duration: 1.2,
        delay: -1,
        ease: Expo.easeInOut,
        
    })
}


var timeOut;

function circleScale(){
    //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {

        clearTimeout(timeOut);

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.8, 1.2, xdiff)
        yscale = gsap.utils.clamp(.8, 1.2, ydiff)

        xprev = dets.clientX
        yprev = dets.clientY

        circleMouseFollower(xscale, yscale);

        timeOut = setTimeout(function () {
            const circle = document.querySelector("#min__circle");
            circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) 
             scale(1, 1)`;
        }, 100);

    })
}


function circleMouseFollower(xscale, yscale){
window.addEventListener("mousemove", function(dets){
    const circle = document.querySelector("#min__circle");
        circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) 
         scale(${xscale}, ${yscale})`;
    
});
}

circleScale();
circleMouseFollower();
firstPageAmim();


// second page images animation on mouse move 
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    //mouse move
    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot =  dets.clientX - rotate ;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX, 
            rotate: gsap.utils.clamp(-20, 20, diffrot*0.5 )
        });
    });

     //mouse leave
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3, 
            duration: 0.5
        });
    });


});

