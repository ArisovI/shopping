import React from "react";
import {
  TbBrandTelegram,
  TbBrandFacebook,
  TbBrandSkype,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbPhone,
  TbMessage2,
  TbLocation,
} from "react-icons/tb";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-inner__top">
            <div className="footer-inner__top_info">
              <span>Информация</span>
              <ul>
                <li>
                  <a href="#">Часто задаваемые вопросы</a>
                </li>
                <li>
                  <a href="#">Пункты выдачи</a>
                </li>
                <li>
                  <a href="#">Блог</a>
                </li>
                <li>
                  <a href="#">Наши бренды</a>
                </li>
                <li>
                  <a href="#">Публичная оферта (Пользовательское соглашение)</a>
                </li>
                <li>
                  <a href="#">Оферта для покупок в рассрочку</a>
                </li>
                <li>
                  <a href="#">О нас</a>
                </li>
              </ul>
            </div>
            <div className="footer-inner__top_connect">
              <span>Для связи</span>
              <ul>
                <li>
                  <a href="#">
                    <TbPhone /> <span>+998905949914 </span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <TbMessage2 /> <span>cool.ilxam@gmail.com </span>
                  </a>
                </li>

                <li>
                  <a href="#">
                    <TbLocation />
                    <span>улица Ислама Каримова, 49, Ташкент </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-inner__top_social">
              <span>Мы в соц. сетях</span>
              <ul>
                <li>
                  <a href="#">
                    <TbBrandInstagram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TbBrandLinkedin />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TbBrandSkype />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TbBrandTelegram />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TbBrandFacebook />
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-inner__top_payment">
              <span>Виды оплаты</span>
              <ul>
                <li>
                  <img
                    src="https://api.logobank.uz/media/logos_png/payme-01.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://e7.pngegg.com/pngimages/436/322/png-clipart-mastercard-logo-moneylive-mobile-payment-brand-mastercard-text-orange.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://api.logobank.uz/media/logos_png/Uzcard-01.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://kapital24.uz/upload/media/icons/cards/system-humo_c.png"
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-inner__bottom">
            <h3>
              Все права защищены. Указанная стоимость товаров и условия их
              приобретения действительны по состоянию на текущую дату. Доставка
              товаров осуществляется во все регионы.
            </h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
