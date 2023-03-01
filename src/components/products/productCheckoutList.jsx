import ProductCheckout from './productCheckout'

function ProductCheckoutList({ productList }) {
  const price = (gia)=>{
    return gia.split(' ')[0]
  }
  return (
    <div className="w-full flex flex-col gap-4">
      {productList.map((product) => (
        <ProductCheckout
          key={product.uid}
          img={product.cartItem.image[0]}
          name={product.cartItem.name}
          price={price(product.cartItem.gia)}
          numberProduct={product.number}
        />
      ))}
    </div>
  )
}

export default ProductCheckoutList
