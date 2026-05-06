/* =========================================================
   PORTFOLIO PESSOAL - JAVASCRIPT PRINCIPAL
   Disciplina: Fundamentos da Programacao Web - UNINTER

   Funcionalidades implementadas:
   1. Alternancia de tema claro / escuro
   2. Menu hamburguer para dispositivos moveis
   3. Sombra na navbar ao rolar a pagina
   4. Destaque do link ativo na navegacao
   5. Validacao completa do formulario de contato
   6. Simulacao de envio com modal de confirmacao
   ========================================================= */


/* =========================================================
   1. ALTERNANCIA DE TEMA CLARO / ESCURO
   - Usa localStorage para memorizar a preferencia do usuario
   - Tambem detecta a preferencia do sistema operacional
   ========================================================= */

const htmlEl    = document.documentElement;    // Elemento <html>
const themeBtn  = document.getElementById('theme-toggle');

/**
 * Aplica o tema escolhido e salva a preferencia no localStorage.
 * @param {string} theme - 'light' ou 'dark'
 */
function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Verifica preferencia salva; se nao houver, usa a do sistema operacional
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

applyTheme(savedTheme);

// Alterna o tema ao clicar no botao
themeBtn.addEventListener('click', function () {
    var current = htmlEl.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* =========================================================
   2. MENU HAMBURGUER (DISPOSITIVOS MOVEIS)
   - O botao hamburguer exibe/oculta o menu de navegacao
   - O menu fecha automaticamente ao clicar em um link
   ========================================================= */

var menuToggle = document.getElementById('menu-toggle');
var navMenu    = document.getElementById('nav-menu');

/**
 * Abre ou fecha o menu mobile, alternando as classes CSS
 * e atualizando o atributo aria-expanded para acessibilidade.
 */
function toggleMenu() {
    var isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    // Informa leitores de tela sobre o estado do menu
    menuToggle.setAttribute('aria-expanded', String(isOpen));
}

menuToggle.addEventListener('click', toggleMenu);

// Fecha o menu ao clicar em qualquer link de navegacao
var navLinks = navMenu.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});


/* =========================================================
   3. SOMBRA NA NAVBAR AO ROLAR A PAGINA
   - Adiciona a classe 'scrolled' na navbar quando o usuario
     rola mais de 10px, ativando a sombra definida no CSS
   ========================================================= */

var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
});


/* =========================================================
   4. DESTAQUE DO LINK ATIVO NA NAVEGACAO
   - Monitora o scroll e destaca o link correspondente
     a secao que esta atualmente visivel na tela
   ========================================================= */

var sections    = document.querySelectorAll('section[id]');
var allNavLinks = document.querySelectorAll('.nav-link');

/**
 * Compara a posicao de cada secao com a posicao atual do scroll
 * e aplica a classe 'active' no link de navegacao correspondente.
 */
function updateActiveLink() {
    var scrollY     = window.scrollY + 100; // Offset para ativar o link um pouco antes
    var currentId   = '';

    // Percorre as secoes de cima para baixo
    sections.forEach(function (section) {
        if (scrollY >= section.offsetTop) {
            currentId = section.getAttribute('id');
        }
    });

    // Aplica ou remove a classe 'active' nos links
    allNavLinks.forEach(function (link) {
        var href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === currentId);
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // Executa na carga inicial da pagina


/* =========================================================
   5. VALIDACAO DO FORMULARIO DE CONTATO
   - Verifica se todos os campos estao preenchidos
   - Valida o formato do e-mail com expressao regular
   - Exibe mensagens de erro especificas por campo
   ========================================================= */

var contactForm = document.getElementById('contact-form');

/**
 * Verifica se o e-mail informado possui formato valido.
 * Exemplo valido: usuario@dominio.com
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Marca o campo como invalido e exibe a mensagem de erro.
 * @param {HTMLElement} input    - Campo do formulario
 * @param {string}      errorId  - ID do elemento de mensagem de erro
 * @param {string}      message  - Texto do erro a exibir
 */
function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
}

/**
 * Remove a marcacao de erro e limpa a mensagem de erro.
 * @param {HTMLElement} input   - Campo do formulario
 * @param {string}      errorId - ID do elemento de mensagem de erro
 */
function clearError(input, errorId) {
    input.classList.remove('invalid');
    document.getElementById(errorId).textContent = '';
}

/**
 * Executa a validacao de todos os campos do formulario.
 * Retorna true apenas se todos os campos forem validos.
 * @returns {boolean}
 */
function validateForm() {
    var nome     = document.getElementById('nome');
    var email    = document.getElementById('email');
    var mensagem = document.getElementById('mensagem');
    var isValid  = true;

    // --- Validacao do campo Nome ---
    if (nome.value.trim() === '') {
        showError(nome, 'nome-error', 'Por favor, informe seu nome.');
        isValid = false;
    } else if (nome.value.trim().length < 3) {
        showError(nome, 'nome-error', 'O nome deve ter pelo menos 3 caracteres.');
        isValid = false;
    } else {
        clearError(nome, 'nome-error');
    }

    // --- Validacao do campo E-mail ---
    if (email.value.trim() === '') {
        showError(email, 'email-error', 'Por favor, informe seu e-mail.');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'email-error', 'Formato invalido. Exemplo: usuario@dominio.com');
        isValid = false;
    } else {
        clearError(email, 'email-error');
    }

    // --- Validacao do campo Mensagem ---
    if (mensagem.value.trim() === '') {
        showError(mensagem, 'mensagem-error', 'Por favor, escreva sua mensagem.');
        isValid = false;
    } else if (mensagem.value.trim().length < 10) {
        showError(mensagem, 'mensagem-error', 'A mensagem deve ter pelo menos 10 caracteres.');
        isValid = false;
    } else {
        clearError(mensagem, 'mensagem-error');
    }

    return isValid;
}

// Remove erros em tempo real enquanto o usuario digita nos campos
['nome', 'email', 'mensagem'].forEach(function (fieldId) {
    var field = document.getElementById(fieldId);
    field.addEventListener('input', function () {
        clearError(field, fieldId + '-error');
    });
});


/* =========================================================
   6. SIMULACAO DE ENVIO E MODAL DE CONFIRMACAO
   - Apos validacao, simula um atraso de envio (setTimeout)
   - Limpa o formulario e exibe um modal de sucesso
   - O modal pode ser fechado pelo botao, pelo overlay ou pela
     tecla Escape
   ========================================================= */

var modalOverlay = document.getElementById('modal-overlay');
var modalClose   = document.getElementById('modal-close');

/** Exibe o modal de confirmacao de envio. */
function openModal() {
    modalOverlay.removeAttribute('hidden');
    // Move o foco para o botao de fechar (acessibilidade)
    modalClose.focus();
}

/** Oculta o modal de confirmacao. */
function closeModal() {
    modalOverlay.setAttribute('hidden', '');
}

// Fecha o modal ao clicar no botao "Fechar"
modalClose.addEventListener('click', closeModal);

// Fecha o modal ao clicar fora da caixa (no fundo escuro)
modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Fecha o modal ao pressionar a tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalOverlay.hasAttribute('hidden')) {
        closeModal();
    }
});

// Intercepta o submit do formulario
contactForm.addEventListener('submit', function (e) {
    // Impede o envio real para o servidor
    e.preventDefault();

    // Cancela se houver erros de validacao
    if (!validateForm()) {
        return;
    }

    // Desabilita o botao durante o "envio" para evitar cliques duplos
    var submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simula o tempo de resposta de uma requisicao de rede (800ms)
    setTimeout(function () {
        // Limpa todos os campos do formulario apos o envio
        contactForm.reset();

        // Restaura o estado original do botao de envio
        submitBtn.textContent = 'Enviar mensagem';
        submitBtn.disabled = false;

        // Exibe o modal de confirmacao de sucesso
        openModal();
    }, 800);
});
