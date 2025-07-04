import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function BarNav() {

function CustomLink({ to, children, ...props }) { /* Funcion para linkear con router */
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

    return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        ☀ App Meteorologa
      </Link>
      <ul>
        <CustomLink to="/pronostico">Pronostico</CustomLink>
        <CustomLink to="/cuenta">Cuenta</CustomLink>
      </ul>
    </nav>
  )
}

