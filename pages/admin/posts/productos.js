import { useState, useEffect } from 'react';

export default function Producto({ product, onSubmit, onReset }){
  const [id, setId] = useState(product ? product.id : '');
  const [code, setCode] = useState(product ? product.code : '');
  const [category, setCategory] = useState(product ? product.category : '');
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [location, setLocation] = useState(product ? product.location : '');
  const [image, setImage] = useState(product ? product.image : '');
  const [availability, setAvailability] = useState(product ? product.availability : 0);
  const [timebox, setTimebox] = useState(product ? product.timebox : '');

  useEffect(() => {
    if (product) {
      setId(product.id);
      setCode(product.code);
      setCategory(product.category);
      setName(product.name);
      setDescription(product.description);
      setLocation(product.location);
      setImage(product.image);
      setAvailability(product.availability);
      setTimebox(product.timebox);
    } else {
      setId('');
      setCode('');
      setCategory('');
      setName('');
      setDescription('');
      setLocation('');
      setImage('');
      setAvailability('');
      setTimebox('');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/products/${id}` : '/api/products';
    const body = JSON.stringify({ code, category, name, description, location, image, availability: parseInt(availability, 10), timebox });
  
    console.log('Sending data:', body); // Agrega este log para verificar los datos
  
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        return;
      }
  
      if (typeof onSubmit === 'function') {
        onSubmit();
      }
      handleReset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setId('');
    setCode('');
    setCategory('');
    setName('');
    setDescription('');
    setLocation('');
    setImage('');
    setAvailability('');
    setTimebox('');
    if (typeof onReset === 'function') {
      onReset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold my-4">Ingresar Productos</h1>
        <label htmlFor="code" className="mb-2">Código:</label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-2">Categoría:</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2">Nombre:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-2">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="location" className="mb-2">Ubicación:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="mb-2">Nombre de la imagen</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="availability" className="mb-2">Disponibilidad</label>
        <input
          id="availability"
          type="number"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="timebox" className="mb-2">Tiempo</label>
        <input
          id="timebox"
          type="text"
          value={timebox}
          onChange={(e) => setTimebox(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Guardar</button>
        <button type="button" onClick={handleReset} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">Resetear</button>
      </div>
    </form>
  );
};

