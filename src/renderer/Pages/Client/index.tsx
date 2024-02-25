import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Register } from './Register'
import { List } from './List'
import styles from './styles.module.css'

export function Client() {
    const { pathname } = useLocation()

    return <>
        <header>
        <nav className={styles.navigation}>
            <Link to='/' data-active={pathname === '/'}>Lista</Link>
            <Link to='/novo-cliente' data-active={pathname === '/novo-cliente'}>Novo cliente</Link>
        </nav>
        </header>
        <main className={styles.content}>
        <Routes>
            <Route path='/' element={<List />}/>
            <Route path='/novo-cliente' element={<Register />}/>
        </Routes>
        </main>
    </>
}