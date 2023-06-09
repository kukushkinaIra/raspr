import React from "react"
import insta from "./images/Инста.svg"
import logo from "./images/Logo-01 1.svg"
import vk from "./images/ВК.svg"
import telegram from "./images/Телега.svg"
import binance from "./images/Binance.svg"

function Footer() {
	return(
		<footer>
            <div className="footer_container">
                <div className="footer_info">
                    <div className="logo">
                        <img src={logo}  alt={logo}/>
                    </div>
                    <div>
                        <a target="_blank" href="https://www.instagram.com/alex.hurevich/">
                            <img src={insta}  alt="inst"/>
                        </a>
                        <a target="_blank" href="https://vk.com/alex.hurevich">
                            <img src={vk}  alt="vk"/>
                        </a>
                        <a target="_blank" href="https://t.me/raspred_by">
                            <img src={telegram}  alt="tg"/>
                        </a>
                    </div>
                    <div>
                        <img src={binance}  alt="binance"/>
                    </div>
                    <div>
                        <p>lorem_ipsum@gmail.com</p>
                    </div>
                </div>
                <div className="footer_year">
                    <p>Alexey Hurevich © 2023</p>
                </div>
            </div>
        </footer>
	)
}
export default Footer
