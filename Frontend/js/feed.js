const feed = document.getElementById("img_list");
const loader = document.getElementById("loader");

let isLoading = false;

function getPathName(){
    const currentURL = document.location.pathname
    return currentURL
}

// Simulação de textos
async function getInfo(){
    try {
        const currentURL = getPathName()
        //console.log(currentURL)
        const URL = `http://localhost:3000/api${currentURL}`
        //"http://localhost:3000/api/servicos"

        const repose = await fetch(URL); // isso aqui tem que mudar conforma a pagina
        const data = await repose.json()
        //console.log(data)
        //Fazer um if-else para cada endpoint 
        /*const data = 
        [
            {
                nome:"nicolas"
            },
            {
                nome:"fernandes"
            },
            {
                nome:"abrão"
            },
            {
                nome:"beatriz"
            },
            {
                nome:"kauan"
            }
        ]
        */
        return data

    } catch (error) {
        throw error
    }
}

// Ajeitar para recerber os dados 
async function createCard(text) {
    const card = document.createElement("li");

    card.innerHTML = `
        <p>
        ${text}
        </p>
    
    `;
    feed.appendChild(card);
}

function createMessage(object, pathname){
    try{
        const servicos = "/servicos"
        const equipe = "/equipe"
        const lista_cliente = "/lista_cliente"
        let message = ""

        //console.log(pathname.includes(lista_cliente))
        if(pathname.includes(servicos)){
            message = 
            `
            código do serviço: ${object.cod_servico} <br>
            cabelereiro: ${object.cabeleireiro.nome_cabeleireiro} <br>
            especialização: ${object.cabeleireiro.especializacao} <br> 
            forma de pagamento: ${object.pagamento} <br>
            cliente: ${object.cliente.nome_cliente} <br>
            `

        }else if(pathname.includes(equipe)){
            message =
            `
            Nome: ${object.nome_cabeleireiro}<br>
            Especialização: ${object.especializacao}<br>
            contato: ${object.celular}<br>
            `

        }else if(pathname.includes(lista_cliente)){
            message =
            `
            Nome:${object.nome_cliente}<br>
            CPF:${object.cpf_cliente} <br>
            CEP: ${object.cep} <br>
            Rua: ${object.rua} <br>
            Celular: ${object.celular}<br>
            `
            
            
        }

        return message
    }catch{
        throw error
    } 

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Carrega mais conteúdo
async function loadMore(a) {
    try {
        const frame_limit = 5;
        const data = await getInfo();
        const pathname = getPathName();

        //let start = page;
        //const end = page + frame_limit;
        console.log(data.length)

        await delay(800);

        for (let i = 0; i < frame_limit; i++) {
            let idx = i+ frame_limit*a
            if (idx >= data.length) return false;
            const object = data[idx];
            const message = createMessage(object, pathname);
            createCard(message);
        }

        return true

   } catch (error){
        createCard(`Houve um problema: ${error.message}`)  
    }

}

async function handleIntersection(){
    if (isLoading) return;

    isLoading = true;
    loader.style.visibility = "visible";

    console.log(repetitions)
    const hasMore = await loadMore(repetitions);
    console.log(hasMore);

    loader.style.visibility = "hidden";
    isLoading = false;

    if(hasMore){
        repetitions++;

    }else{
        
        console.log("false");
        observer.unobserve(loader);
    }
}

let repetitions = 0 

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !isLoading){
        //entries[0].isIntersecting && !isLoading
        handleIntersection(repetitions);
 
    }
});

observer.observe(loader);


