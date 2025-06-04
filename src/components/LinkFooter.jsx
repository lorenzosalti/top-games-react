// Creazione di LinkFooter con props e collegamento a Footer.jsx
const LinkFooter = (props) => {
    return (
        <>
            <ul className="footer-url col-4 py-4">
                {props.links.map((link, index) => (
                    <li key={index} className="footer-link">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link-url fs-4">
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