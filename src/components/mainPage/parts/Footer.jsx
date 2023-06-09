import React from "react"
import insta from "./images/Инста.svg"
import logo from "./images/Logo-01 1.svg"
import vk from "./images/ВК.svg"
import telegram from "./images/Телега.svg"
import binance from "./images/Binance.svg"

function Footer() {
	return(
		<footer>
            <div class="footer_container">
                <div class="footer_info">
                    <div class="logo">
                        <img src={logo} />
                    </div>
                    <div>
                        <a target="_blank" href="https://www.instagram.com/alex.hurevich/">
                            <img src={insta} />
                        </a>
                        <a target="_blank" href="https://vk.com/alex.hurevich">
                            <img src={vk} />
                        </a>
                        <a target="_blank" href="https://t.me/raspred_by">
                            <img src={telegram} />
                        </a>
                    </div>
                    <div>
                        <img src={binance} />
                    </div>
                    <div>
                        <p>lorem_ipsum@gmail.com</p>
                    </div>
                </div>
                <div class="footer_year">
                    <p>Alexey Hurevich © 2023</p>
                </div>
            </div>
        </footer>
	)
}
export default Footer
