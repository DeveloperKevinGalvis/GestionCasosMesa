import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Inicio from './pages/Inicio';
import Casos from './pages/Casos';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [userRol, setUserRol] = useState(''); // Guardará: 'tecnico', 'agente', 'administrador' o 'auditor'

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const [loginData, setLoginData] = useState({ user: '', password: '', rolSelected: 'tecnico' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.user.trim() !== '') {
            setIsLoggedIn(true);
            setUsuario(loginData.user);
            setUserRol(loginData.rolSelected); // Asignamos el rol elegido en el formulario
            setShowLoginModal(false);
            setLoginData({ user: '', password: '', rolSelected: 'tecnico' });
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert(`Técnico ${registerData.name} registrado con éxito. Por defecto tu rol será 'tecnico'.`);
        setShowRegisterModal(false);
        setShowLoginModal(true);
        setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsuario('');
        setUserRol('');
    };

    return (
        <Router>
            <div style={{ fontFamily: 'sans-serif', margin: 0, padding: 0, minHeight: '100vh', background: '#f5f5f5' }}>

                {/* BARRA DE NAVEGACIÓN SPA */}
                <nav style={{ padding: '10px 20px', background: '#222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>

                        {/* Solo se muestra "Ver Casos" si el usuario está logueado (cualquier rol) */}
                        {isLoggedIn && (
                            <Link to="/casos" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Ver Casos</Link>
                        )}

                        {/* ENLACES EXCLUSIVOS POR ROL */}
                        {isLoggedIn && userRol === 'administrador' && (
                            <span style={{ color: '#ffc107', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Panel Admin</span>
                        )}
                        {isLoggedIn && userRol === 'auditor' && (
                            <span style={{ color: '#17a2b8', fontWeight: 'bold', cursor: 'pointer' }}>📊 Logs Auditoría</span>
                        )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
                        <FaUserCircle size={26} style={{ color: isLoggedIn ? '#4CAF50' : '#ccc' }} />
                        {isLoggedIn && (
                            <span style={{ fontSize: '14px', color: '#aaa' }}>
                                {usuario} ({userRol})
                            </span>
                        )}

                        {isLoggedIn ? (
                            <button onClick={handleLogout} style={buttonStyle('#d9534f')}>Cerrar Sesión</button>
                        ) : (
                            <button onClick={() => setShowLoginModal(true)} style={buttonStyle('#0275d8')}>Iniciar Sesión</button>
                        )}
                    </div>
                </nav>

                {/* CONTENIDO Y PROTECCIÓN DE RUTAS */}
                <main style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Inicio />} />

                        {/* Ruta protegida: si no está logueado, lo devuelve al inicio */}
                        <Route
                            path="/casos"
                            element={isLoggedIn ? <Casos rol={userRol} /> : <Navigate to="/" />}
                        />
                    </Routes>
                </main>

                {/* MODAL: INICIAR SESIÓN (CON SELECTOR DE ROL PARA PRUEBAS) */}
                {showLoginModal && (
                    <div style={backdropStyle}>
                        <div style={modalStyle}>
                            <h3 style={{ marginTop: 0, color: '#333' }}>Iniciar Sesión</h3>
                            <form onSubmit={handleLoginSubmit} style={formStyle}>
                                <input
                                    type="text"
                                    placeholder="Usuario"
                                    required
                                    style={inputStyle}
                                    value={loginData.user}
                                    onChange={(e) => setLoginData({ ...loginData, user: e.target.value })}
                                />
                                <input type="password" placeholder="Contraseña" required style={inputStyle} />

                                {/* Selector de Rol Temporal para simular los 4 escenarios */}
                                <label style={{ fontSize: '13px', color: '#666' }}>Selecciona tu Rol para probar:</label>
                                <select
                                    style={inputStyle}
                                    value={loginData.rolSelected}
                                    onChange={(e) => setLoginData({ ...loginData, rolSelected: e.target.value })}
                                >
                                    <option value="tecnico">Técnico (Ver casos escalados)</option>
                                    <option value="agente">Agente (Escalar casos)</option>
                                    <option value="administrador">Administrador (Gestionar Roles)</option>
                                    <option value="auditor">Auditor (Verificar cambios)</option>
                                </select>

                                <button type="submit" style={buttonStyle('#0275d8', '100%')}>Ingresar</button>
                            </form>

                            <p style={{ fontSize: '13px', textAlign: 'center', color: '#666', margin: '15px 0 0' }}>
                                ¿Eres nuevo técnico?{' '}
                                <span
                                    onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                                    style={{ color: '#0275d8', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Regístrate aquí
                                </span>
                            </p>
                            <button onClick={() => setShowLoginModal(false)} style={closeButtonStyle}>✕</button>
                        </div>
                    </div>
                )}

                {/* MODAL: AUTO-REGISTRO TÉCNICO */}
                {showRegisterModal && (
                    <div style={backdropStyle}>
                        <div style={modalStyle}>
                            <h3 style={{ marginTop: 0, color: '#333' }}>Registro de Técnico</h3>
                            <form onSubmit={handleRegisterSubmit} style={formStyle}>
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    required
                                    style={inputStyle}
                                    value={registerData.name}
                                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    required
                                    style={inputStyle}
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    required
                                    style={inputStyle}
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirmar Contraseña"
                                    required
                                    style={inputStyle}
                                    value={registerData.confirmPassword}
                                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                />
                                <button type="submit" style={buttonStyle('#4CAF50', '100%')}>Crear Cuenta Técnico</button>
                            </form>
                            <button onClick={() => setShowRegisterModal(false)} style={closeButtonStyle}>✕</button>
                        </div>
                    </div>
                )}

            </div>
        </Router>
    );
}

/* --- ESTILOS EN LÍNEA --- */
const buttonStyle = (bgColor, width = 'auto') => ({
    background: bgColor, color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: width
});
const backdropStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};
const modalStyle = {
    background: 'white', padding: '30px', borderRadius: '8px', width: '320px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', position: 'relative'
};
const formStyle = { display: 'flex', flexDirection: 'column', gap: '12px' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' };
const closeButtonStyle = { position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#999' };
