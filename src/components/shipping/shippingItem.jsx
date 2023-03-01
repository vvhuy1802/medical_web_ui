function ShippingItem({ shippingMethod, register }) {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return (
    <label className="flex w-full py-3 px-2 items-center justify-between border border-light_grey/20 text-light_grey rounded-xl">
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="shipping"
          value={JSON.stringify(shippingMethod)}
          {...register('shipping')}
          className="peer"
        />
        <p>{shippingMethod.name}</p>
      </div>
      <p>
        {shippingMethod.price === 0
          ? 'Free'
          : `${formatPrice(shippingMethod.price)} VND`}
      </p>
    </label>
  )
}

export default ShippingItem
