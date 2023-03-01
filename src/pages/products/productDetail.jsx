import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { EmailField } from '../../components/emails'
import useScrollPosition from '../../hooks/useScrollPosition'
import {
  getProductDetail,
  selectProduct,
  selectStatus
} from '../../redux/features/productSlice'
import {
  addToCart,
  addItemToUserCart
} from '../../redux/features/carts/cartSlice'
import { selectUserUid } from '../../redux/features/userSlice'
import WhiteRoomImg from '../../assets/images/bannerApp.png'
import { InfoItemList, Overview } from '../../components/others'
import {
  ProductDesc,
  ProductCarousel,
  ProductScrollView
} from '../../components/products'
import useClientRect from '../../hooks/useClientRect'
import {
  addNewItemToWishlist,
  removeItemFromWishlist,
  selectWishlistList
} from '../../redux/features/wishlist/wishlistSlice'
import { CommentDrawer } from '../../components/comments'
import { getCommentByProductId } from '../../redux/features/comment/commentSlice'
import Loading2 from '../../components/animations/loading2animation'

function ProductDetailPage() {
  // get scroll position
  const scrollY = useScrollPosition()
  // get element height
  const { rect: imgsRect, ref: imgsRef } = useClientRect()

  // scroll to index image when click on image overview
  const handleScroll = (index) => {
    window.scrollTo({
      top: index * (imgsRect?.height / 4) + 144,
      left: 0,
      behavior: 'smooth'
    })
  }

  //get product id
  const { productId } = useParams()

  //declare dispatch
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const product = useSelector(selectProduct)
  const userUid = useSelector(selectUserUid)
  const wishlist = useSelector(selectWishlistList)
  const [commentOpen, setCommentOpen] = useState(false)

  //fetch Data
  useEffect(() => {
    dispatch(getProductDetail(productId))
  }, [productId])

  //handle Add to cart
  const handleAddToCart = (number = 0) => {
    if (userUid) {
      dispatch(addItemToUserCart(userUid, product, number))
    } else {
      dispatch(addToCart({ cartItem: product, number: number }))
    }
  }

  const handleAddToWishlist = () => {
    if (userUid) {
      dispatch(addNewItemToWishlist(userUid, product))
    } else {
      alert('please sign in before add to wishlist')
    }
  }

  const handleRemoveFromWishlist = (wishlistUid) => {
    dispatch(removeItemFromWishlist(wishlistUid))
  }

  return (
    <div className="mx-2 tablet:mx-6 laptop:mx-20">
      {/*helmet async*/}
      <Helmet>{/* <title>{product.name}</title> */}</Helmet>

      {/* Product detail */}
      {status === 'idle' && product.uuid !== undefined ? (
        <section className="flex flex-col w-full tablet:flex-row tablet:gap-4">
          {/* product image list for mobile*/}
          <div className="block tablet:hidden mb-8">
            <ProductCarousel images={product.image} />
          </div>

          {/* product image list for laptop */}
          <div className="w-full hidden tablet:block" ref={imgsRef}>
            <ProductScrollView images={product.image} />
          </div>

          {/* floating overview */}
          <div className="hidden tablet:block">
            <Overview
              images={product.image}
              visible={
                scrollY <= (imgsRect?.height / 4) * 3 + 144 && scrollY > 0
                  ? true
                  : false
              }
              onClick={handleScroll}
            />
          </div>

          {/* Product information  */}
          <div className="w-full h-full sticky top-20 bg-border_grey dark:bg-secondary rounded-xl shadow-lg shadow-gray-700/40 dark:shadow-gray-300/40">
            <ProductDesc
              name={product.name}
              desc={product.mota}
              benh={product.benh}
              price={product.gia}
              saved={wishlist.find(
                (item) => item.product.uuid === product.uuid
              )}
              quantity={product.quantity}
              handleAddToCart={(number) => handleAddToCart(number)}
              handleAddToWishlist={() => handleAddToWishlist()}
              removeFromWishlist={() =>
                handleRemoveFromWishlist(
                  wishlist.find((item) => item.product.uuid === product.uuid)
                    ?.uid
                )
              }
            />
          </div>
        </section>
      ) : (
        <div className="flex justify-center">
          <Loading2 />
        </div>
      )}

      {/* Infor Card List */}
      <div className="w-full py-12 laptop:py-20">
        <InfoItemList />
      </div>

      {/* Email sign up */}
      <section className="flex flex-col laptop:flex-row laptop:-mx-20">
        <div className="-mx-6 laptop:basis-3/6 laptop:mx-0">
          <img className="w-full h-auto" src={WhiteRoomImg} alt="feature" />
        </div>
        <div className="flex flex-col py-9 laptop:p-10 laptop:basis-3/6">
          <div className="mb-14 text-h4">
            <h4 className="text-h4 mb-4 laptop:text-h2 laptop:mb-5">
            Chúng tôi cũng có một ứng dụng dành cho thiết bị di động!
            </h4>
            <small className="text-body-sm laptop:text-body-md">
            Tải xuống ứng dụng của chúng tôi để có trải nghiệm tốt nhất, nhận ưu đãi tốt và lời khuyên tuyệt vời từ các dược sĩ hàng đầu
            </small>
          </div>
          <div className="flex-1"></div>
          <div className="flex laptop:max-w-md">
            <EmailField Color="light" />
          </div>
        </div>
      </section>

      {/*comment*/}
      <CommentDrawer
        commentOpen={commentOpen}
        handleOpen={(setValue) => {
          setCommentOpen(!commentOpen)
          setValue()
        }}
        productUid={product.uuid}
      />
    </div>
  )
}

export default ProductDetailPage
