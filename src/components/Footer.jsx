import LinkFooter from './LinkFooter';
import footerIconFacebook from '../assets/footer-facebook.png';
import footerIconTwitter from '../assets/footer-twitter.png';
import footerIconYoutube from '../assets/footer-youtube.png';
import footerIconPinterest from '../assets/footer-pinterest.png';
import footerIconPeriscope from '../assets/footer-periscope.png';



const GamesUrl = [
    { name: 'Condizioni di vendita', url: '/#' },
    { name: 'Informativa sulla privacy', url: '/#' },
    { name: 'Programma Affiliazione', url: '/#' },
    { name: 'Contatti', url: '/#' },
    { name: 'Games', url: '/#' },
    { name: 'Trova le ultime notizie sui videogiochi', url: 'https://multiplayer.it/articoli/notizie/' },
    { name: 'Riscatta una Gift Card', url: '/#' }
];



// SocialURL
const socialUrl = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: footerIconFacebook },
    { name: 'Twitter', url: 'https://twitter.com', icon: footerIconTwitter },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: footerIconYoutube },
    { name: 'Pinterest', url: 'https://www.pinterest.com', icon: footerIconPinterest },
    { name: 'Location', url: 'https://www.topgames.com', icon: footerIconPeriscope }
];


export default function Footer() {
    return (
        <footer className='footer shadow bg-dark text-light'>
            <div className='footer-container'>
                <div className='container-fluid  py-4 mt-5'>
                    <div className="footer-link-container">

                        <LinkFooter title="" links={GamesUrl} />

                    </div>
                </div>




                <div className="social-container bg-dark">
                    <span className="follow-us">FOLLOW US</span>
                    <div className="social-icone">
                        {/* Collegamento di socialUrl */}
                        {socialUrl.map((social, index) => (
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={social.name}>
                                <img src={social.icon} alt={social.name} className="social-icon-img" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
}