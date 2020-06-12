
 const buscarProductos = () => {
    const options = {
        method: 'get'
    };
    fetch('https://cytiipty.com', options)
    .then(data => {
        return data.json()
        }).then( res => {
            crearTarjetas(res);
            state.empresas = res;
            console.log(state)
            
        })
       
    }


const crearTarjetas = (e) => {
    for(let i = 0; i < e.length; i++){

        let div1 = document.createElement('div');
            div1.id='div1'
            div1.className="col-lg-4 col-sm-6 col-12 col-wrap tc";

        let div2 = document.createElement('div');
            div2.className="item";


        let div3 = document.createElement('div');
            div3.className="card product-card";

        let img = document.createElement('img');
            img.src=`images/newImg/${e[i].id}.png`;
            img.alt="best-image";
            img.className="card-img-top product-theme";

        let div4 = document.createElement('div');
            div4.className="card-top-body";                               

        let div5 = document.createElement('div');
            div5.className="card-img-overlay product-detail";

        let a = document.createElement('a');
            a.target="_self";
            a.href=e[i].link;
            a.textContent=e[i].nombre;
            a.className='link-buscar';

            img.appendChild(div5);
            div4.appendChild(img);
            a.appendChild(div4);
            div3.appendChild(a);
            div2.appendChild(div3);
            div1.appendChild(div2);
            resultado.appendChild(div1);

        
    }
    
}

getCards = () => { 
    const options = {
        method: 'get'
    };
    fetch('https://cytiipty.com/', options)
    .then(data => {
        return data.json()
        }).then( res => {
            crearTarjetas(res);
            
            
        })        
        
    }


window.addEventListener('load', buscarProductos());



let boton = document.getElementById("buscar");
let empresa = document.querySelector('#empresas');
let zona = document.getElementById("zona");
let resultado = document.getElementById("resultado");
let categoria = document.getElementById("categoria");
let descripcion = document.getElementById("des-busqueda");
let error = false;



const removeElementsByClass = (elementName) => {
    let elements = document.getElementsByClassName(elementName);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};

$(boton).on("click" ,function(){
    $('html, body').animate({
        scrollTop: $("#redirect-search").offset().top
    }, 600);
});

const buscarEmpresa = (e) => {
    e.preventDefault();
        if( zona.value || categoria.value){
            removeElementsByClass("col-lg-4 col-sm-6 col-12 col-wrap");
            removeElementsByClass("buscar-error");

            const data = {  
                empresas: "",
                categoria: categoria.value,
                zona: zona.value 
            }
                const options = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                },
                    body: JSON.stringify(data)
                };
                fetch('https://cytiipty.com/buscar', options)
                .then(data => {
                    return data.json()
                    }).then( res => {
                            if(res === '!resultados'){

                                descripcion.textContent = `No hemos conseguido lo que buscas`;
                                
                            } else {
                                for(let i = 0; i < res.length; i++){

                                    let div1 = document.createElement('div');
                                        div1.id='div1'
                                        div1.className="col-lg-4 col-sm-6 col-12 col-wrap tc";
    
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
                                        a.target="_self";
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
    
                            }
                });

                
                
                    if( zona.value && categoria.value){
                        descripcion.textContent = `El resultado para ${categoria.value} en ${zona.value} es:`;
                    } else if( zona.value && !categoria.value){
                        descripcion.textContent = `El resultado para ${zona.value} es:`;
                    } else if( !zona.value && categoria.value){
                        descripcion.textContent = `El resultado para ${categoria.value} es:`;
                    
                      /*  } else {
                            getCards();
                            descripcion.textContent = ``;*/
                        }
                            
    
                    }
                    empresa.value='';
    }



// Campo de buscar Empresa
const state = {
    searchField: '',
 }




const filtrarEmpresas = (e) => {
    
    state.searchField = e.target.value;

    const empresasFiltradas = state.empresas.filter(i =>{
        return i.nombre.toLowerCase().includes(state.searchField.toLowerCase());
      });


      removeElementsByClass("col-lg-4 col-sm-6 col-12 col-wrap");
      removeElementsByClass("buscar-error");
    crearTarjetas(empresasFiltradas);
}


empresa.addEventListener('keyup', filtrarEmpresas);

boton.addEventListener("click", buscarEmpresa);

/*--------------------- Fin boton buscar--------------------- */
