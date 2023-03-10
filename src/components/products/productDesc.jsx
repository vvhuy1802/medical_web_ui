/*
Name: ProductDesc
Description: Product Description (for Product Detail Page)
Properties:
  - name: string 
  - price: number
  - desc: string
  - dimensions: object
  - quantity: number
*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Button } from '../buttons'

function ProductDesc({
  name,
  price,
  benh,
  desc,
  quantity,
  saved,
  handleAddToCart,
  handleAddToWishlist,
  removeFromWishlist
}) {
  //
  const [count, setCount] = useState(1)
  //handle increase count
  const increaseCount = () => {
    if (count < quantity) setCount(count + 1)
  }
  //handle decrease count
  const decreaseCount = () => {
    if (count > 1) setCount(count - 1)
  }

  return (
    <div className="col-span-4 laptop:col-span-6 laptop:ml-9 px-2">
      {/* Top Text */}
      <div className="mt-7 mb-4 laptop:mt-9 laptop:mb-7">
        <h3 className="text-h3 mb-3 laptop:text-h1 laptop:mb-4">{name}</h3>
        <h4 className="text-h4 laptop:text-h3">Bệnh: {benh}</h4>
        <h4 className="text-h4 laptop:text-h3">{price}</h4>
      </div>
      <hr />
      {/* Description */}
      <div className="mt-7 laptop:mt-6">
        <strong className="text-h5 mb-5">Mô tả sản phẩm</strong> <br />
        <p className="text-body-sm laptop:text-body-md">{desc}</p>
      </div>
      {/* Stepper */}
      <div className="mt-7 laptop:w-fit laptop:mt-10">
        <strong className="text-h5 mb-5 ">Số lượng</strong>
        <div className="flex items-center gap-2">
          {/*Counter*/}
          <div>
            <div className="min-w-fit min-h-fit p-2 flex justify-center items-center gap-5 rounded-xl bg-light_grey dark:bg-dark_secondary border-border_grey dark:border-dark_secondary shadow-sm shadow-gray-600/50 dark:shadow-gray-200/40">
              <div className="w-6 h-6 flex justify-center items-center hover:bg-border_dark dark:hover:bg-secondary rounded-full cursor-pointer">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="m-auto"
                  onClick={decreaseCount}
                />
              </div>
              <div>{count}</div>
              <div className="w-6 h-6 flex justify-center items-center hover:bg-border_dark dark:hover:bg-secondary rounded-full cursor-pointer">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="m-auto"
                  onClick={increaseCount}
                />
              </div>
            </div>
          </div>
          {/*remain on stock*/}
          <div>{quantity} Sản phẩm</div>
          {/**/}
        </div>
      </div>
      {/* Group btn */}
      <div className="gap-4 ml-8 flex flex-col laptop:items-center mt-8 mb-8 laptop:mt-12 laptop:w-96 laptop:flex-row-reverse">
        <Button
          Color={saved ? 'red' : 'white'}
          onClick={saved ? removeFromWishlist : handleAddToWishlist}
        >
          {saved ? 'Sản phẩm yêu thích' : 'Sản phẩm yêu thích'}
        </Button>
        <Button Color="primary" onClick={() => handleAddToCart(count)}>
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  )
}

export default ProductDesc
