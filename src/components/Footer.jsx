import LinkFooter from './LinkFooter';
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
        <footer className='footer shadow bg-dark text-light py-4'>
            <div className='container'>
                <div className='row text-center text-md-start align-items-center'>

                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <LinkFooter title="" links={GamesUrl} />
                    </div>


                    <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex justify-content-center">
                        <img src="/logo-tg-footer.png" alt="Top Games!" className="img-fluid" />
                    </div>

                    <div className="col-12 col-md-4 text-center text-md-end">
                        <span className="follow-us d-block fs-5 mb-2">FOLLOW US</span>
                        <div className="social-icone d-flex justify-content-center justify-content-md-end gap-3">
                            {socialUrl.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-link text-light"
                                    aria-label={social.name}
                                >
                                    <FontAwesomeIcon icon={social.icon} className='fs-4' />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}