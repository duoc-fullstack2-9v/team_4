import React from "react";
import styles from "../styles/Index.module.css"; // Asegúrate de que el archivo CSS está correctamente importado

function ListaProductos({ productos }) {
  // Verifica si 'props.productos' es un arreglo antes de usar map()
  if (!Array.isArray(productos)) {
    return <p>No se han encontrado productos o los datos son incorrectos.</p>;
  }

  return (
    <div className={styles.productos}>
      {productos.map((item) => (
          <div key={item.id} className={styles.unidad}>
            <img
              src={`http://localhost:8080${item.imagen}`}
              alt={item.nombre}
              className={styles.img}
            />
            <h3 className={styles.h1}>{item.nombre}</h3>
            <p className={styles.p}>{item.descripcion}</p>
            <p>${item.precio} CLP</p>
            <p>Stock: {item.stock}</p>
          </div>
      ))}
    </div>
  );
}

export default ListaProductos;
