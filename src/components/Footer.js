import {FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-list-containers">
                    <div className="footer-list-content">
                        <a className="list-item" href="nyheter.html">FAQ</a>
                        <a className="list-item" href="about.html">Om oss</a>
                        <a className="list-item" href="kontakt.html">Kontakt</a>
                    </div>
                    <div className="footer-contact-container">
                        <address className="footer-list-content contact">
                            <p className="h4-footer-contact">Address:</p>
                            <p>Sporty Clothing AB</p>
                            <p>Storgatan 123</p>
                            <p>123 45 Stadshamn</p>
                        </address>
                        <div className="footer-list-content contact">
                            <h4>Tel:</h4>
                            <a className="list-item" href="tel:014/248.446">010-222 333 44</a>
                            <h4>Email:</h4>
                            <a className="list-item" href="mailto:wemove@better.com">wemove@better.com</a>
                        </div>
                    </div>
                </div>
                <div className="footer-socials-list">
                    <a className="socials-icon" aria-label="Link to our Facebook" href="https://giphy.com/gifs/starwars-movie-star-wars-3ornka9rAaKRA2Rkac">
                        <FaFacebook />
                    </a>
                    <a className="socials-icon" aria-label="Link to our Instagram" href="https://www.youtube.com/watch?v=oHg5SJYRHA0">
                        <FaInstagram />
                    </a>
                    <a className="socials-icon" aria-label="Link to our LinkedIn" href="https://giphy.com/gifs/reactionseditor-3oKIPf3C7HqqYBVcCk">
                        <FaLinkedin />
                    </a>
                    <a className="socials-icon" aria-label="Link to our X/Twitter" href="https://giphy.com/gifs/reactionseditor-3oKIPf3C7HqqYBVcCk">
                        <FaXTwitter />
                    </a>
                    <a className="socials-icon" aria-label="Link to our TikTok" href="https://giphy.com/gifs/reactionseditor-3oKIPf3C7HqqYBVcCk">
                        <FaTiktok />
                    </a>
                    <a className="socials-icon" aria-label="Link to our YouTube" href="https://giphy.com/gifs/reactionseditor-3oKIPf3C7HqqYBVcCk">
                        <FaYoutube />
                    </a>
                </div>
            </div>
            <div class="footer-copyright">
                <p>copyright © 2023 all rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
