import './styles.scss';

type HeaderProps = {
    children: JSX.Element
}


export const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <header className="header">
            {children}
        </header>)
}