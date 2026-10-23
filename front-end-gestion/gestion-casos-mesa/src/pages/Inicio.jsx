import { useState, useEffect } from 'react';

export default function Inicio() {
    // Inicializar el estado leyendo desde LocalStorage (si existe) para no perder datos al recargar
    const [nombres, setNombres] = useState(() => {
        const guardados = localStorage.getItem('ciclo_nombres');
        return guardados ? JSON.parse(guardados) : [];
    });
    const [nuevoNombre, setNuevoNombre] = useState('');

    // Guardar en LocalStorage de forma automática cada vez que la lista cambie
    useEffect(() => {
        localStorage.setItem('ciclo_nombres', JSON.stringify(nombres));
    }, [nombres]);

    // 1. Agregar un nuevo nombre a la lista
    const agregarNombre = (e) => {
        e.preventDefault();
        if (!nuevoNombre.trim()) return;

        const nuevoItem = {
            id: Date.now(),
            texto: nuevoNombre,
            cuadritos: 0 // Inicia sin asignaciones
        };

        setNombres([...nombres, nuevoItem]);
        setNuevoNombre(''); // Limpia el input
    };

    // 2. Asignar: Suma un cuadrito y lo manda al final de la lista
    const asignarNombre = (id) => {
        const elementoAsignado = nombres.find(n => n.id === id);
        if (!elementoAsignado) return;

        const elementoActualizado = {
            ...elementoAsignado,
            cuadritos: elementoAsignado.cuadritos + 1
        };

        // Filtra para removerlo de su posición actual
        const listaFiltrada = nombres.filter(n => n.id !== id);

        // Lo inyecta en la última posición del arreglo
        setNombres([...listaFiltrada, elementoActualizado]);
    };

    // 3. Limpiar toda la lista por completo
    const limpiarLista = () => {
        if (window.confirm("¿Seguro que deseas reiniciar y borrar toda la lista?")) {
            setNombres([]);
        }
    };

    return (
        <main className="main-content">
            <header className="content-header">
                <h2>🏠 Panel de Inicio</h2>
                <p>Bienvenido al sistema de gestión de casos de mesa.</p>
            </header>

            {/* Formulario para agregar nombres */}
            <form onSubmit={agregarNombre} className="form-agregar">
                <input
                    type="text"
                    placeholder="Escribe un nombre..."
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="input-nombre"
                />
                <button type="submit" className="btn-mas">➕ Agregar</button>
            </form>

            {/* Lista dinámica de turnos */}
            <div className="lista-contenedor">
                {nombres.length === 0 ? (
                    <p className="lista-vacia">No hay nombres en la lista. ¡Agrega uno arriba!</p>
                ) : (
                    <>
                        <ul className="lista-nombres">
                            {nombres.map((item) => (
                                <li key={item.id} className="item-nombre">
                                    <div className="info-nombre">
                                        {/* Contenedor flexible para los cuadritos */}
                                        <div className="cuadritos-wrapper">
                                            {item.cuadritos > 0 && (
                                                <span className="conteo-numero">({item.cuadritos})</span>
                                            )}
                                            <div className="cuadritos-container">
                                                {Array.from({ length: item.cuadritos }).map((_, index) => (
                                                    <span key={index} className="cuadrito-visual"></span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="texto-nombre">{item.texto}</span>
                                    </div>
                                    <button
                                        onClick={() => asignarNombre(item.id)}
                                        className="btn-asignar"
                                    >
                                        🔄 Asignar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={limpiarLista} className="btn-limpiar">
                            🗑️ Reiniciar Lista
                        </button>
                    </>
                )}
            </div>
        </main>
    );
}
