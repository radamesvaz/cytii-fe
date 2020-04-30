

// ------------- Boton Buscar --------------------
let boton = document.getElementById("buscar");
let empresa = document.getElementById("empresas");
let zona = document.getElementById("zona");
let resultado = document.getElementById("resultado");
let categoria = document.getElementById("categoria");
let descripcion = document.getElementById("des-busqueda");

const removeElementsByClass = (elementName) => {
    let elements = document.getElementsByClassName(elementName);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};

const buscarEmpresa = (e) => {
    e.preventDefault();
    window.location.href = "#redirect-search";
    removeElementsByClass("col-lg-4 col-sm-6 col-12 col-wrap");
    removeElementsByClass("buscar-error");

        if(empresa.value || zona.value || categoria.value){
            const data = { empresas: empresa.value, 
                categoria: categoria.value,
                zona: zona.value }
                const options = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                },
                    body: JSON.stringify(data)
                };
                fetch('https://cytii-rv.herokuapp.com/buscar', options)
                .then(data => {
                    return data.json()
                    }).then( res => {
                            for(let i = 0; i < res.length; i++){

                                let div1 = document.createElement('div');
                                    div1.id='div1'
                                    div1.className="col-lg-4 col-sm-6 col-12 col-wrap";

                                let div2 = document.createElement('div');
                                    div2.className="item";


                                let div3 = document.createElement('div');
                                    div3.className="card product-card";

                                let img = document.createElement('img');
                                    img.src=`images/newImg/${res[i].id}.png`;
                                    img.alt="best-image";
                                    img.className="card-img-top product-theme";

                                let div4 = document.createElement('div');
                                    div4.className="card-top-body";                               
    
                                let div5 = document.createElement('div');
                                    div5.className="card-img-overlay product-detail";

                                let a = document.createElement('a');
                                    a.target="_blank";
                                    a.href=res[i].link;
                                    a.textContent=res[i].nombre;
                                    a.className='link-buscar';

                                    img.appendChild(div5);
                                    div4.appendChild(img);
                                    a.appendChild(div4);
                                    div3.appendChild(a);
                                    div2.appendChild(div3);
                                    div1.appendChild(div2);
                                    resultado.appendChild(div1);
     
                                
                            }
                });

                empresa.value = '';
                if( zona.value && categoria.value ){
                    let br = document.createElement('br');
                    descripcion.textContent = `El resultado para ${categoria.value} en ${zona.value} es:`;
                    descripcion.appendChild(br);
                } else if( zona.value && !categoria.value ){
                    descripcion.textContent = `El resultado para ${zona.value} es:`;
                } else if( !zona.value && categoria.value ){
                    descripcion.textContent = `El resultado para ${categoria.value} es:`;
                }
                
                
        } else {
            let li = document.createElement("li");
                li.appendChild(document.createTextNode('Por favor introduzca un valor'));
                li.className="buscar-error"
                resultado.appendChild(li);
        }
    
}

boton.addEventListener("click", buscarEmpresa);




$(document).ready(function($) {
    // preloader
    $(document).ready(function () {
        $(".preloader").fadeOut(600);
    });


    // Scroll Header Fixed
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 10) {
            $('.header').addClass('fixed-header');
        }
        else {
            $('.header').removeClass('fixed-header');
        }
    });


    // Nav Dropdown Menu
    (function($) {
        function mediaSize() { 
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.fa-user').click(function (evt) {
                    evt.stopPropagation();
                    $('.user_block').slideToggle(600);
                });
                $('body,html').click(function (e) {
                    var container = $(".user_block");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        container.hide(600);
                    }
                });
            }
        };
        mediaSize();
        window.addEventListener('resize', mediaSize, false);  
    })(jQuery);


    // Back to Top Button with Smooth Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrolltop:hidden').stop(true, true).fadeIn();
        } else {
            $('.scrolltop').stop(true, true).fadeOut();
        }
    });
    $(function() {
        $(".scroll").click(function() {
            $('body,html').animate({
                scrollTop : 0
            }, 600);
            return false
        })
    })


    // Tooltips 
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })


    //Number Counter From Zero To Value

    var a = 0;
    $(window).scroll(function() {
        if($('#counter').length > 0) {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },

                    {

                        duration: 40000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }

                    });
            });
            a = 1;
        }
    }
    });


    // select2
    $('.js-example-basic-single').select2();


    //list & grid view 
     $('#list_view').click(function(event) {
        event.preventDefault();
        $('.search_item_wrap .item').addClass('list_group_item');
        $('.search_item_wrap .item').removeClass('grid_group_item');
        $('.search_item_wrap .col-wrap').addClass('col-listview');
        $('.search_item_wrap .col-wrap').removeClass('col-gridview');
    });
    $('#grid_view').click(function(event) {
        event.preventDefault();
        $('.search_item_wrap .item').removeClass('list_group_item');
        $('.search_item_wrap .item').addClass('grid_group_item');
        $('.search_item_wrap .col-wrap').removeClass('col-listview');
        $('.search_item_wrap .col-wrap').addClass('col-gridview');
    });
    $('.search_item_tab_block a').click(function() {
        $('a.active').removeClass('active');
        $(this).addClass('active');
    });


    // Click Show Hide elements
    $('.click_show_elements').on('click', function (){
        $(this).toggleClass('active');
        $(this).siblings('.show_elements').slideToggle("slow");
    });


    // Range Slider
    $('#slider').slider({
        slide: function (e, value) {
            document.getElementById('value').innerText = value;
        }
    });


    //Accordion
    $(function() {
        var Accordion = function(el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            var links = this.el.find('.article-title');
            links.on('click', {
                el: this.el,
                multiple: this.multiple
            }, this.dropdown)
        }
        Accordion.prototype.dropdown = function(e) {
            var $el = e.data.el;
            $this = $(this),
            $next = $this.next();
            $next.slideToggle(600);
            $this.parent().toggleClass('open');
            $('#accordion').find('.fa-minus').addClass('fa-plus');
            $('#accordion').find('.fa-minus').removeClass('fa-minus');
            if($this.parent().hasClass('open')) {
                $this.find('i').addClass('fa-minus');
                $this.find('i').removeClass('fa-plus');    
            } else {
                $this.find('.fa-minus').addClass('fa-plus');
                $this.find('.fa-minus').removeClass('fa-minus');
            }
            if (!e.data.multiple) {
                $el.find('.accordion-content').not($next).slideUp(600).parent().removeClass('open');
            };
        }
        var accordion = new Accordion($('.accordion'), false);
    });


    //owl carousel
    $('.interested-carousel, .best-carousel, .blog-carousel').owlCarousel({
        items: 3,
        loop: true,
        autoHeight: true,
        margin: 30,
        dots: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                mergeFit:true
            },
            576: {
                items: 2,
                margin: 15
            },
            992: {
                items: 3
            }
        }
    })

    $('.testimonial-carousel').owlCarousel({
        items: 1,
        loop: true,
        autoHeight: true,
        margin: 0,
        dots: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })

    $('.testimonial-carousel3').owlCarousel({
        items: 3,
        center: true,
        loop: true,
        margin: 30,
        dots: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    })

    $('.listing_detail_slider').owlCarousel({
        items: 1,
        center: true,
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
            0: {
                stagePadding: 50
            },
            1280: {
                stagePadding: 175
            },
            1441: {
                stagePadding: 275
            },
            1681: {
                stagePadding: 398
            }
        }
    })    

    $('.borwse_categories_slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            481: {
                items: 3
            },
            576: {
                items: 4
            },
            768: {
                items: 5
            },
            992: {
                items: 6
            },
            1200: {
                items: 7
            }
        }
    })

});