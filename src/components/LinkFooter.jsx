// Creazione di LinkFooter con props e collegamento a Footer.jsx
const LinkFooter = (props) => {
    return (
        <div className="link-footer  text-md-start">
            <ul className="list-unstyled text-center">
                {props.links.map((link, index) => (
                    <li key={index} className="mb-2">
                        <a href={link.url} className="text-decoration-none footer-link-url">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Esportazione di LinkFooter
export default LinkFooter;