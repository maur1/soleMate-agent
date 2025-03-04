const customerShoes = [
    {
      model: 'Saucony Endorphin Speed 3',
      description:'Great for long-distance runs, lightweight, and responsive.',
      store: "Anton sport Storo",
      price: "10$"
    },
    {
      model: 'Nike ZoomX Vaporfly NEXT% 2',
      description:'Designed for speed and efficiency; ideal for those looking to improve their race times.',
      store: "Anton sport Storo",
      price: "100$"
    },
    {
      model: 'Adidas Adizero Adios Pro 2',
      description: 'A favorite among competitive runners for its lightweight and fast feel.',
      store: "Anton sport Storo",
      price: "200$"
    },
  ];
  
/**
 * Returns a list of shoes with their model names and image references.
 *
 * @returns {Array<{ model: string, image_ref: string }>}
 */
export function getShoeList() {
    return customerShoes.map(({ model, store, price}) => ({
      model,
      store,
      price,
    }));
  }