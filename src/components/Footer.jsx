import LinkFooter from './LinkFooter';
// import footerIconFacebook from '../assets/footer-facebook.png';
// import footerIconTwitter from '../assets/footer-twitter.png';
// import footerIconYoutube from '../assets/footer-youtube.png';
// import footerIconPinterest from '../assets/footer-pinterest.png';
// import footerIconPeriscope from '../assets/footer-periscope.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';




const GamesUrl = [
    { name: 'Condizioni di vendita', url: '/#' },
    { name: 'Informativa sulla privacy', url: '/#' },
    { name: 'Programma Affiliazione', url: '/#' },
    { name: 'Contatti', url: '/#' },
    { name: 'Games', url: '/#' },
    { name: 'Riscatta una Gift Card', url: '/#' }
];



// SocialURL
const socialUrl = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: faFacebook },
    { name: 'Twitter', url: 'https://twitter.com', icon: faSquareXTwitter },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: faYoutube },
    { name: 'Pinterest', url: 'https://www.pinterest.com', icon: faPinterest }
];


export default function Footer() {
    return (
        <footer className='footer shadow bg-dark text-light'>
            <div className='footer-container row'>

                <LinkFooter title="" links={GamesUrl} />

                <div className="footer-logo col-4">
                    <img src="../public/logo-tg-footer.png" alt="Top Games!" />
                </div>

                <div className="social-container bg-dark col-4">
                    <span className="follow-us">FOLLOW US</span>
                    <div className="social-icone">
                        {/* Collegamento di socialUrl */}
                        {socialUrl.map((social, index) => (
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label={social.name}>
                                <FontAwesomeIcon icon={social.icon} className='social-icon' />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
}