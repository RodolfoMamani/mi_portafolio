const SITE_AUTOR = "Rodolfo Mamani";
const API_BASE = 'https://jsonplaceholder.typicode.com'
const POKE_API = "https://pokeapi.co/api/v2";
const WEATHER_API = "https://restcountries.com/v3.1";

let currentFile = 'all';
let pokemonPage = 1;
let projectsData = [];

const greep = (name) => `Hola desde el portafolio ${name}`;

// console.log(geep(SITE_AUTOR));


const formatPrice = (amount) => `$${Number(amount).toLocaleString('en-BO')}`;
const devProfile = {
    name: "Rodolfo Mamani",
    role: "Full Stack Developer",
    skills: ["JavaScript", "Python", "React", "Node.js"],
    location: "La Paz, Bolivia",
}


const { name, role, skills } = devProfile;
const [mainSkill, ...otherSkills] = skills;

console.log(`Name: ${name}`);
console.log(`Role: ${role}`);
console.log(`Skills: ${skills.join(', ')}`);

const frontEnd = ["HTML", "CSS", "JavaScript"];
const backEnd = ["Node.js", "Express", "MongoDB"];
const allTecnologies = [...frontEnd, ...backEnd];

console.log(`All Technologies: ${allTecnologies.join(', ')}`);

const UpdateProfiles = { ...devProfile, available: true };
console.log('Updated Profile:', UpdateProfiles);


// CLASES ES6 + OBJETOS

class Project {
    #id;

    constructor({ id, title, description, techs, emoji, category }) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.technologies = techs;
        this.emoji = emoji;
        this.category = category;
    }
    get id() {
        return this.#id
    }
    toHtml() {
        const badges = this.technologies
            .map(tech => `<span class="tech-badge">${tech}</span>`)
            .join(' ');
        return `
        <article class="project-card" data-id="${this.#id}" data-category="${this.category}" data-techs="${this.technologies.join(',')}" >
            <div class="project-emoji">${this.emoji}</div>
            <h3 class="project-name">${this.title}</h3>
            <p class="project-description">${this.description}</p>
            <footer class="project-tags"> ${badges} </footer>
        </article>

        `;
    }



}

const localProjects = [

    new Project({
        id: 1, category: 'frontend', emoji: '👨‍💻',
        title: 'Desarrollo de Sistema Web',
        description: 'Aplicación web con drag & drop, almacenamiento local y modo oscuro. UI minimalista con microinteracciones.',
        techs: ['JavaScript', 'Vue.js', 'Vuetify', 'PocketBase (BaaS)'],
    }),

    new Project({

        id: 2, category: 'fullstack', emoji: '📞',
        title: 'Implementación de Servicio VoIP',
        description: 'E-commerce sostenible con sistema de filtros, carrito de compras y diseño responsive.',
        techs: ['Asterisk', 'Ubuntu Linux', 'VoIP'],

    }),

    new Project({

        id: 3, category: 'fullstack', emoji: '📊',
        title: 'Dashboard Analytics',
        description: 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.',
        techs: ['Node.js', 'PostgreSQL', 'Chart.js'],

    }),

    new Project({

        id: 4, category: 'backend', emoji: '🔧',
        title: 'REST API – Inventario',
        description: 'API REST completa con autenticación JWT y documentación Swagger.',
        techs: ['Express', 'MySQL', 'JWT'],

    }),

    new Project({

        id: 5, category: 'fullstack', emoji: '🌍',
        title: 'GeoWeather App',
        description: 'Consulta clima en tiempo real usando la API de OpenWeather y países.',
        techs: ['React', 'Fetch API', 'OpenWeather'],

    }),

];

// flitra proyectos pro carpeta

const filterProjects = (category) => {
    return category === 'all'
        ? localProjects
        : localProjects.filter(project => project.category === category);
}

const getTitles = () => localProjects.map(project => project.title);

const countByProjects = () => localProjects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
}, {});

console.log('Titles:', getTitles());

// busca proyedctos por id

const findProjectById = (id) => localProjects.find(project => project.id === id);

console.log('Project with ID 3:', findProjectById(3));

// seleccion DOM + Manipulación

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const pokeSeccion = document.getElementById('poke-section');
const pokeGrid = document.getElementById('poke-grid');
const pockBtnNext = document.getElementById('poke-next');
const countryInput = document.getElementById('country-search');
const countryResult = document.getElementById('country-result');

// renderizado DOM

function renderProjects(category = 'all') {
    if (!projectGrid) return;
    const filtered = filterProjects(category);
    projectGrid.innerHTML = filtered.map(project => project.toHtml()).join('');
    filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    }
    );

    const counter = document.getElementById('project-count');
    if (counter) {
        counter.textContent = `Proyectos: ${filtered.length}`;
    }

    // eventos

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            renderProjects(btn.dataset.category);
        });
    });

    // scrool suave

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // local storage
}

renderProjects();


// promesas


function validateEmail(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (valid) resolve({ ok: true, email });
            else reject(new Error(`Email inválido: ${email}`));
        }, 500);
    });
}

validateEmail('hebert@ejemplo.com')
    .then(({ email }) => console.log(`✅ Email válido: ${email}`))
    .catch(err => console.error('❌', err.message));

/** manejo de errores en fetch */
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ｜ ${res.statusText}`);
    return await res.json();        // res.json() devuelve una Promesa
}

async function fetchProjects() {
    const loader = document.getElementById('project-loader');
    if (loader) loader.classList.remove('hidden');

    try {
        const posts = await fetchJSON(`${API_BASE}/posts?limit=5`);
        console.log(posts);

        const extra = posts.map(({ id, title, body }) => new Project({
            id: id + 100,
            category: 'api',
            emoji: '🔗',
            title: title.slice(0, 40) + '...',
            // En la imagen dice 'boby', probablemente deba ser 'body'
            description: body.slice(0, 80) + '...',
            techs: ['API', 'Fetch', 'Async/Await']
        }));

        projectsData = [...localProjects, ...extra];
        showToast('Proyectos cargados desde API');

    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        showToast('Error al cargar proyectos', 'error');
    } finally {
        if (loader) loader.classList.add('hidden');
    }
}


// 

/**
 * https://pokeapi.co/api/v2
 * Carga Pokémon en paralelo usando Promise.all
 */
async function fetchPokemon(offset = 0, limit = 6) {
    if (!pokeGrid) return;
    pokeGrid.innerHTML = '<p>Cargando pokemones...</p>';
    
    try {
        // 1. Obtener la lista de Pokémon
        const { results } = await fetchJSON(`${POKE_API}/pokemon?offset=${offset}&limit=${limit}`);
        
        // 2. Obtener detalles de cada Pokémon en paralelo con Promise.all
        const detailsPromises = results.map(pokemon => fetchJSON(pokemon.url));
        const details = await Promise.all(detailsPromises);
        
        // 3. Renderizar las tarjetas
        pokeGrid.innerHTML = details.map(({ name, id, sprites, types }) => {
            const type = types[0].type.name;
            const img = sprites.other['official-artwork'].front_default || sprites.front_default;
            
            return `
                <div class="poke-card poke--${type}">
                    <img src="${img}" alt="${name}" loading="lazy" />
                    <p class="poke-name">${name}</p>
                    <span class="poke-type">${type}</span>
                </div>`;
        }).join('');

    } catch (error) {
        console.error('Error al cargar pokemones:', error);
        pokeGrid.innerHTML = '<p class="error-text">Error al cargar pokemones</p>';
        showToast('Error al cargar pokemones', 'error');
    }
}

// Botón para cargar siguientes Pokémon
if (pockBtnNext) {
    pockBtnNext.addEventListener('click', () => {
        pokemonPage++;
        fetchPokemon((pokemonPage - 1) * 6, 6);
    });
}

// Inicializar Pokémon al cargar la página
fetchPokemon(0, 6);


async function fetchCountry(query) {
    if(!countryResult || !query.trim()) return;
    countryResult.innerHTML = '<p>Buscando país...</p>';
    try {
        const [country] = await fetchJSON(
            `${WEATHER_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,flags,region`
        );

        const {
            name: { common },
            capital: [capital] = ['N/A'],
            population,
            flags: { svg: flag },
            region,
        } = country;

        countryResult.innerHTML = `
            <div class="country-card">
                <img src="${flag}" alt="Bandera de ${common}" class="country-flag" />
                <div class="country-info">
                    <h4>${common}</h4>
                    <p>🏛️ Capital: <strong>${capital}</strong></p>
                    <p>🌍 Región: <strong>${region}</strong></p>
                    <p>👥 Población: <strong>${population.toLocaleString()}</strong></p>
                </div>
            </div>`;

    } catch (error) {
        countryResult.innerHTML = `<p class="error-text">País no encontrado.</p>`;
        console.error('Error al buscar país:', error);
        showToast('Error al buscar país', 'error');
    }
}

let searchTimer;
if (countryInput) {
    countryInput.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => fetchCountry(e.target.value), 600);
    });
}


async function loadDashboardData() {
    try {
        const [posts, users, todos] = await Promise.all([
            fetchJSON(`${API_BASE}/posts?_limit=5`),
            fetchJSON(`${API_BASE}/users?_limit=5`),
            fetchJSON(`${API_BASE}/todos?_limit=5`)
        ]);

        console.log('Posts:', posts);
        console.log('Users:', users);
        console.log('Todos:', todos);

        showToast('Datos del dashboard cargados');
    } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        showToast('Error al cargar datos del dashboard', 'error');
    }
}

/**
 * Función para mostrar notificaciones toast
 */
function showToast(message, type = 'success') {
    // Crear el elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(toast);
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('toast--show'), 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('toast--show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


