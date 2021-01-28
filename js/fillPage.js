/**
 * {
    "matematica":[
        {
            "nome": "",
            "descricao": "",
            "imagem": "img.png"
            "dados":{
                
            }
        }
    ]
}
 */

function clearData() {
    const root = document.getElementById('games');
    if (root) {
        for (let i = 0; i < root.childNodes.length; i++) {
            const children = root.childNodes[i];
            root.remove(children);
        }
    }
}

function fillData(element, category, data, type = 'long') {
    const root = document.getElementById(element);
    if (data) {
        let i = 1;
        for (const d of data[category]) {
            d.id = i++;
            root.appendChild(createCard(category, d, type));
        }
    } else {
        root.appendChild(createCard(category, null, type));
    }
}

function createCard(category, data, type) {
    const card = document.createElement('div');
    card.id = 'fadeIn';
    if (type == 'short') {
        const element = setupOnClick(card, data, category);
        setupImage(category, element, data);
        setupName(category, element, data);
        setupDescription(category, element, data, type);
        setupCategory(category, element, type);
        card.classList.add('card');
        return card;
    }

    data = parseInfo();
    category = data.category;
    card.classList.add('card-info');
    setupImage(category, card, data);
    setupName(category, card, data);
    setupDescription(category, card, data, type);
    //setupCategory(category, card, type);
    setupData(card, data);
    return card;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupImage(category, element, data) {
    const imageElement = document.createElement('img');
    imageElement.src = `./imagens/jogos/${category}/${data.imagem}`;
    element.appendChild(imageElement);
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupName(category, element, data) {
    const nameElement = document.createElement('p');
    nameElement.textContent = data.nome;
    nameElement.classList.add('card-name');
    element.appendChild(nameElement);
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupDescription(category, element, data, type) {
    const descriptionElement = document.createElement('p');
    if(type == 'short')
    descriptionElement.textContent = data.descricao.slice(0, 30) + '...';
    else
    descriptionElement.textContent = data.descricao;    
    descriptionElement.classList.add('card-desc');
    element.appendChild(descriptionElement);
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupCategory(category, element, type) {
    const categoryElement = document.createElement('button');
    categoryElement.textContent = category.toUpperCase();
    categoryElement.classList.add('card-category');
    categoryElement.id = 'no-select';
    if (type == 'short') return element.appendChild(categoryElement);


    categoryElement.onclick = () => window.location = `/${category}.html`;
    return element.appendChild(categoryElement);
}


/**
 * 
 * @param {HTMLDivElement} rootElement 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupOnClick(rootElement, data, category) {
    const element = document.createElement('a');
    element.style.display = 'block';
    element.style.height = '100%';
    element.style.width = '100%';
    element.style.textDecoration = 'none';
    element.style.color = 'black';
    var params = new URLSearchParams(data);
    params.append('category', category);
    element.href = `jogo.html?${params.toString()}`;
    rootElement.appendChild(element);
    return element;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {{
 *     nome: string,
 *     descricao: string,
 *     imagem: string
 * }} data 
 */
function setupData(element, data) {
    if (!data.dados) // Apenas insira se realmente tiver algo...
        return element;

    const child = document.createElement('div');
    child.classList.add('card-extra-info');
    child.innerHTML = data.dados;
    element.appendChild(child);
    return element;
}


function parseInfo() {
    return paramsToObject(new URLSearchParams(window.location.search).entries());
}

function paramsToObject(entries) {
    const result = {}
    for (const [key, value] of entries) {
        result[key] = value;
    }
    return result;
}