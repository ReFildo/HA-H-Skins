// Lista de skins
const products = [
  { name: 'Canivete Doppler', rarity: 'Raro', condition: 'Nova de Fábrica', price: 'R$ 24.671', category: 'facas', img: 'img/doppler.jpg' },
  { name: 'Luvas de Motociclismo', rarity: 'Excepcional', condition: 'Pouco Usada', price: 'R$ 8.444', category: 'luvas', img: 'img/luvas.jpg' },
  { name: 'AK-47 Vulcan', rarity: 'Alta', condition: 'Nova de Fábrica', price: 'R$ 5.566', category: 'rifles', img: 'img/vulcan.jpg' },
  { name: 'AWP Asiimov', rarity: 'Icônica', condition: 'Testada em Campo', price: 'R$ 3.200', category: 'snipers', img: 'img/asiimov.jpg' },
  { name: 'Karambit Fade', rarity: 'Lendário', condition: 'Nova de Fábrica', price: 'R$ 35.000', category: 'facas', img: 'img/karambit.jpg' },
  { name: 'M4A4 Howl', rarity: 'Mítica', condition: 'Pouco Usada', price: 'R$ 18.900', category: 'rifles', img: 'img/howl.jpg' },
  { name: 'Luvas Esportivas Vice', rarity: 'Icônica', condition: 'Nova de Fábrica', price: 'R$ 12.700', category: 'luvas', img: 'img/vice.jpg' }
];

let cart = [];

// Renderização genérica
function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${item.img}" alt="${item.name}" loading="lazy"></div>
      <h3 class="title">${item.name}</h3>
      <div class="rarity">${item.rarity}</div>
      <div class="price">${item.price}</div>
      <div class="row-actions">
        <button class="btn sm primary js-add">Adicionar</button>
        <button class="btn sm js-details">Detalhes</button>
      </div>
    `;

    card.querySelector('.js-add').addEventListener('click', () => addToCart(item));

    container.appendChild(card);
  });

  // Atualiza eventos do botão de detalhes
  updateDetailsButtons();
}

// Adiciona ao carrinho
function addToCart(product) {
  cart.push(product);
  updateCart();
}

// Atualiza carrinho
function updateCart() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const countEl = document.getElementById('cartCount');
  itemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" width="40">
      <div>
        <div>${p.name}</div>
        <small>${p.price}</small>
      </div>
      <button class="btn sm ghost">x</button>
    `;
    div.querySelector('button').addEventListener('click', () => {
      cart.splice(i, 1);
      updateCart();
    });
    itemsEl.appendChild(div);
    total += parseFloat(p.price.replace(/[^\d]/g, ''));
  });

  totalEl.textContent = 'R$ ' + total.toLocaleString('pt-BR');
  countEl.textContent = cart.length;
}

// Contador regressivo
function startCountdown(sec) {
  const el = document.getElementById('countdown');
  let remaining = sec;

  function tick() {
    const min = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    el.textContent = `${min}:${s}`;
    if (remaining > 0) {
      remaining--;
      setTimeout(tick, 1000);
    } else {
      el.textContent = "Expirado";
    }
  }

  tick();
}

// Carousel
function scrollCarousel(direction) {
  const carousel = document.getElementById("csCarousel");
  const scrollAmount = 300; // pixels
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// Drawer de Especificações (mantido caso queira usar no futuro)
const specsDrawer = document.getElementById("specsDrawer");
const closeSpecs = document.getElementById("closeSpecs");
const specsContent = document.getElementById("specsContent");

if (closeSpecs) {
  closeSpecs.addEventListener("click", () => {
    specsDrawer.classList.remove("open");
  });
}

// Atualiza eventos de detalhes em cada card (abre nova aba)
function updateDetailsButtons() {
  document.querySelectorAll(".js-details").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".card");
      const title = card.querySelector(".title").textContent;

      // URLs individuais de exemplo
      let url = "#";
      if (title.includes("Karambit")) url = "https://csgoskins.gg/items/karambit-forest-ddpat";
      if (title.includes("Doppler")) url = "https://csgoskins.gg/items/canivete-doppler";
      if (title.includes("Luvas de Motociclismo")) url = "https://csgoskins.gg/items/luvas-de-motociclismo";
      if (title.includes("AK-47 Vulcan")) url = "https://csgoskins.gg/items/ak47-vulcan";
      if (title.includes("AWP Asiimov")) url = "https://csgoskins.gg/items/awp-asiimov";
      if (title.includes("Karambit Fade")) url = "https://csgoskins.gg/items/karambit-fade";
      if (title.includes("M4A4 Howl")) url = "https://csgoskins.gg/items/m4a4-howl";
      if (title.includes("Luvas Esportivas Vice")) url = "https://csgoskins.gg/items/luvas-vice";

      // Abre nova aba
   window.open("tela.html", "_blank");

    });
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products, 'grid');
  startCountdown(600);

  // Filtro por categoria
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      renderProducts(f === 'all' ? products : products.filter(p => p.category === f), 'grid');
    });
  });

  // Busca
  document.getElementById('search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    renderProducts(products.filter(p => p.name.toLowerCase().includes(term)), 'grid');
  });

  // Carrinho
  const drawer = document.getElementById('cartDrawer');
  document.getElementById('openCart').addEventListener('click', () => drawer.classList.add('open'));
  document.getElementById('closeCart').addEventListener('click', () => drawer.classList.remove('open'));
});
