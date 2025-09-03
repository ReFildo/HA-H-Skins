document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.querySelector('.add-to-cart');
  const viewInspectButton = document.querySelector('.view-inspect');

  addToCartButton.addEventListener('click', () => {
    alert('Item adicionado ao carrinho!');
  });

  viewInspectButton.addEventListener('click', () => {
    window.open('https://steamcommunity.com/market/listings/730/★%20Karambit%20|%20Forest%20DDPAT', '_blank');
  });
});
