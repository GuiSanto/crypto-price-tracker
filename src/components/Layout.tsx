export type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({children}: LayoutProps) => {
    return (
        <div className='p-4'>
            {children}
        </div>
    )
}

export default Layout;
