import fs from "fs";

let carts = [];
const pathFile = "./src/data/carts.json"

// Función para obtener los carritos desde el archivo JSON
const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile);
  carts = JSON.parse(cartsJson) || [];

  return carts;
}

// Función para crear un nuevo carrito
const createCart = async () => {
  await getCarts();

  // Genera un nuevo carrito con un ID único y sin productos
  const newCart = {
    id: carts.length + 1,
    products: []
  };

  // Agrega el nuevo carrito a la lista de carritos
  carts.push(newCart);

  // Guarda la lista de carritos actualizada en el archivo JSON
  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return newCart;
}

// Función para obtener los productos de un carrito por su ID
const getCartById = async (cid) => {
  await getCarts();
  
  // Busca el carrito con el ID dado
  const cart = carts.find(c => c.id === cid);

  // Si no se encuentra el carrito, devuelve un mensaje de error
  if (!cart) return `No se encuentra el carrito con el id ${cid}`;

  return cart.products;
}

// Función para agregar un producto a un carrito por su ID
const addProductToCart = async (cid, pid) => {
  await getCarts();
  
  // Busca el índice del carrito en la lista de carritos
  const index = carts.findIndex(c => c.id === cid);

  // Si no se encuentra el carrito, devuelve un mensaje de error
  if (index === -1) return `No se encontró el carrito con el id ${cid}`;

  const cart = carts[index];

  // Busca si el producto ya existe en el carrito
  const productIndex = cart.products.findIndex(p => p.product === pid);

  // Si el producto ya existe en el carrito, incrementa su cantidad
  if (productIndex !== -1) {
    cart.products[productIndex].quantity++;
  } else {
    // Si el producto no existe en el carrito, agrégalo con cantidad 1
    cart.products.push({
      product: pid,
      quantity: 1
    });
  }

  // Guarda la lista de carritos actualizada en el archivo JSON
  await fs.promises.writeFile(pathFile, JSON.stringify(carts));

  return cart;
}

// Exporta las funciones de manejo de carritos
export default {
  getCarts,
  createCart,
  getCartById,
  addProductToCart
};
