// src/pages/Casos.jsx
export default function Casos({ rol }) {
    return (
        <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>📦 Panel de Casos</h2>
            <p style={{ color: '#666' }}>Tu rol actual es: <strong style={{ color: '#0275d8' }}>{rol.toUpperCase()}</strong></p>

            <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderLeft: '4px solid #0275d8' }}>
                {rol === 'tecnico' && (
                    <div>
                        <h3>🔧 Vista de Técnico</h3>
                        <p>🛠️ Aquí solo ves los casos que te han sido **escalados** directamente a ti.</p>
                    </div>
                )}

                {rol === 'agente' && (
                    <div>
                        <h3>🎧 Vista de Agente</h3>
                        <p>➡️ Aquí puedes crear casos nuevos y **escalar casos** hacia los técnicos disponibles.</p>
                        <button style={{ padding: '8px 12px', background: '#0275d8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            + Escalar Nuevo Caso
                        </button>
                    </div>
                )}

                {rol === 'administrador' && (
                    <div>
                        <h3>👑 Vista de Administrador</h3>
                        <p>👥 Tienes acceso total para **gestionar usuarios** y reasignar roles en el sistema.</p>
                    </div>
                )}

                {rol === 'auditor' && (
                    <div>
                        <h3>🔍 Vista de Auditor</h3>
                        <p>📜 Aquí visualizas el **historial de cambios** y logs del sistema para verificar modificaciones.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
