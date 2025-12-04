import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchProducts, deleteProduct, createProduct } from '../../src/services/productsApi';
import { API_BASE_URL } from '../../src/services/apiConfig';

// Mock del módulo axios
vi.mock('axios');

const PRODUCTS_URL = `${API_BASE_URL}/api/products`;

describe('productsApi service', () => {

  beforeEach(() => {
    // Limpiamos todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  // Pruebas para fetchProducts
  describe('fetchProducts', () => {
    it('debe llamar a axios.get y devolver los productos en caso de éxito', async () => {
      const mockData = [{ id: 1, nombre: 'Pastel de Prueba' }];
      axios.get.mockResolvedValue({ data: mockData });

      const result = await fetchProducts();

      expect(axios.get).toHaveBeenCalledWith(PRODUCTS_URL);
      expect(result).toEqual(mockData);
    });

    it('debe lanzar un error si la llamada a la API falla', async () => {
      axios.get.mockRejectedValue(new Error('Error de red'));

      await expect(fetchProducts()).rejects.toThrow('Error al obtener productos');
    });
  });

  // Pruebas para deleteProduct
  describe('deleteProduct', () => {
    it('debe llamar a axios.delete con el ID correcto', async () => {
      const productId = 1;
      axios.delete.mockResolvedValue({ data: {} });

      await deleteProduct(productId);

      expect(axios.delete).toHaveBeenCalledWith(`${PRODUCTS_URL}/${productId}`);
    });

    it('debe lanzar un error si la eliminación falla', async () => {
      axios.delete.mockRejectedValue(new Error('Error al eliminar'));

      await expect(deleteProduct(1)).rejects.toThrow('Error al eliminar producto');
    });
  });

  // Pruebas para createProduct
  describe('createProduct', () => {
    it('debe llamar a axios.post con los datos del producto y devolver el producto creado', async () => {
      const newProduct = { nombre: 'Pastel Nuevo', precio: 15000 };
      const createdProduct = { id: 2, ...newProduct };
      axios.post.mockResolvedValue({ data: createdProduct });

      const result = await createProduct(newProduct);

      expect(axios.post).toHaveBeenCalledWith(PRODUCTS_URL, newProduct, { headers: { "Content-Type": "application/json" } });
      expect(result).toEqual(createdProduct);
    });
  });
});