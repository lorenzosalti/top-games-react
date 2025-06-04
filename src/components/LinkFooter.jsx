// Creazione di LinkFooter con props e collegamento a Footer.jsx
const LinkFooter = (props) => {
    return (
        <>
            <h3 className="footer-title">{props.title}</h3>
            <ul className="footer-url">
                {props.links.map((link, index) => (
                    <li key={index} className="footer-link">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link-url">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

// Esportazione di LinkFooter
export default LinkFooter;