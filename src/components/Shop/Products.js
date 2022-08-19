import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCTS = [
  { 
    id: 'p1', 
    price: 13, 
    title: 'my first book', 
    description: 'The first book i ever wrote' 
  },
  { 
    id: 'p2', 
    price: 30, 
    title: 'my second book', 
    description: 'The second book i ever wrote' 
  },
  { 
    id: 'p3', 
    price: 18, 
    title: 'my third book', 
    description: 'The third book i ever wrote' 
  }
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
         DUMMY_PRODUCTS.map((product) =>        <ProductItem
         title={product.title}
         price={product.price}
         description={product.description}
         id ={product.id}
         key ={product.id}
       />) 
        }

      </ul>
    </section>
  );
};

export default Products;
