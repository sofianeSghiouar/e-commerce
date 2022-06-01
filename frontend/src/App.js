import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href='/'>The Good Deals</a>
      </header>

      <main>
        <h1>Featured Products</h1>
        <div className='products'>
          {data.products.map((product, index) => (
            <div className='product' key={index}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className='product-info'>
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p><strong>${product.price}</strong></p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
