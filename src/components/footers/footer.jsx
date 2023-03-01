import { EmailField } from '../emails'
import { LinkButton } from '../buttons'
import { SocialMedia } from '../others'

function Footer() {
  return (
    <div className="w-full flex flex-col items-center bg-secondary dark:bg-dark_secondary">
      {/* top footer */}
      <div className="w-full flex flex-col px-10 py-10 gap-10 text-white tablet:flex-row tablet:gap-0 tablet:items-start">
        {/* "categories" component */}
        <div className="flex flex-col gap-5 items-center py-5 border border-primary dark:border-light_grey/30 rounded-xl tablet:border-none tablet:items-start tablet:grow">
          <p className="text-h3 tablet:text-h5">
Thể loại
</p>
          <ul className="flex flex-col items-center gap-2 text-body-lg tablet:text-body-sm tablet:items-start">
            <li>
              <LinkButton size="small" path="/products/medical-gadgets">
               
Đồ dùng y tế
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/dietary-supplement">
Bổ sung chế độ ăn uống
                
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/medicines">
                
Các loại thuốc
              </LinkButton>
            </li>
            <li>
              <LinkButton size="small" path="/products/covid">
                Covid-19
              </LinkButton>
            </li>
          </ul>
        </div>

        {/* 'menu' component */}
        <div className="flex flex-col gap-5 items-center py-5 border border-primary dark:border-light_grey/30 rounded-xl tablet:border-none tablet:items-start tablet:grow">
          <p className="text-h3 tablet:text-h5">
Thực đơn</p>
          <ul className="flex flex-col items-center gap-2 text-body-lg tablet:text-body-sm tablet:items-start">
            <li>
              <LinkButton path="/products">
Điểm đến mới</LinkButton>
            </li>
            <li>
              <LinkButton path="/products">
Bán chạy nhất</LinkButton>
            </li>
            <li>
              <LinkButton path="/products">Đã xem gần đây</LinkButton>
            </li>
            <li>
              <LinkButton path="/products">Phổ biến tuần này</LinkButton>
            </li>
            <li>
              <LinkButton path="/products">Tất cả sản phẩm</LinkButton>
            </li>
          </ul>
        </div>

        {/* 'our company' conponent */}
        <div className="flex flex-col gap-5 items-center py-5 border border-primary dark:border-light_grey/30 rounded-xl tablet:border-none tablet:items-start tablet:grow">
          <p className="text-h3 tablet:text-h5">Công ty chúng tôi</p>
          <ul className="flex flex-col items-center gap-2 text-body-lg tablet:text-body-sm tablet:items-start">
            <li>
              <LinkButton path="/about">Về chúng tôi</LinkButton>
            </li>
            <li>
              <LinkButton path="/vacancies">Vị trí tuyển dụng</LinkButton>
            </li>
            <li>
              <LinkButton path="/contactUs">Liên hệ chúng tôi</LinkButton>
            </li>
            <li>
              <LinkButton path="/privacy">
Sự riêng tư</LinkButton>
            </li>
            <li>
              <LinkButton path="/returnPolicy">Chính sách hoàn trả</LinkButton>
            </li>
          </ul>
        </div>

        {/* email field component */}
        <div className="flex flex-col gap-2 py-5 tablet:grow-[2]">
          {/* email title */}
          <p className="text-h5">Tham gia danh sách gửi thư của chúng tôi</p>

          {/* email field */}
          <EmailField />
        </div>
      </div>

      {/* divider */}
      <hr className="w-[calc(100%-4rem)] border-t border-t-primary dark:border-t-light_grey" />

      {/* footer bottom */}
      <div className="w-full py-5 tablet:px-8 tablet:flex tablet:flex-row tablet:items-center">
        {/* copyright */}
        <p className="text-body-sm text-white text-center mr-auto">
        Bản quyền 2022 Công ty TNHH Medeli
        </p>

        {/* social media */}
        <div className="hidden tablet:block">
          <SocialMedia Color="dark" />
        </div>
      </div>
    </div>
  )
}

export default Footer
