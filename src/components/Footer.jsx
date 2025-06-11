const Footer = () => {
    return (
        <footer className="py-4">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} WBS Coding School. All rights reserved.</p>
            <p>
            Code is hosted on{' '}
            <a href="https://github.com/Vaeshkar/75_project06_10hours" className="text-yellow-400 hover:underline">
                GitHub
            </a>{' '}
            and{' '}
            <a href="https://wbspersonaldairy.netlify.app/" className="text-yellow-400 hover:underline">
                LiveDemo
            </a>.
            </p>
        </div>
        </footer>
    );
}

export default Footer;
