const LS_KEY = 'pms_users';


export function useUsers() {
    return useMemo(() => {
        try { 
            // Intentamos obtener y parsear los usuarios del localStorage
            return JSON.parse(localStorage.getItem(LS_KEY)) || [];
        } catch { 
            return []; // Si ocurre un error, devolvemos un array vacío
        }
    }, []);
}
