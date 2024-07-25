import { useState, useEffect } from 'react';

export default function ProductForm({ producto, onSubmit, onReset }) {
    const [id, setId] = useState(producto ? producto.id : '');
    const [name, setName] = useState(producto ? producto.name : '');
    const [code, setCode] = useState(producto ? producto.code : '');
    const [category, setCategory] = useState(producto ? producto.category : '');
    const [description, setDescription] = useState(producto ? producto.description : '');
    const [location, setLocation] = useState(producto ? producto.location : '');

    useEffect(() => {
        if (producto) {
            setId(producto.id);
            setName(producto.name);
            setCode(producto.code);
            setCategory(producto.category);
            setDescription(producto.description);
            setLocation(producto.location);
        } else {
            setId('');
            setName('');
            setCode('');
            setCategory('');
            setDescription('');
            setLocation('');
        }
    }, [producto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await fetch(`/api/products/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, code, category, description, location }),
            });
        } else {
            await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, code, category, description, location }),
            });
        }

        onSubmit();
        handleReset();
    };

    const handleReset = () => {
        setId("");
        setName("");
        setCode("");
        setCategory("");
        setDescription("");
        setLocation("");
        onReset();
    }

    return (
        <form onSubmit={ handleSubmit } style={{ width: '60%' }}>
            <input
                type="hidden"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del Producto"
                className="m-2"
                style={{ width: '100%' }}
                required
            />
            <br />
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Código del Producto"
                className="m-2"
                style={{ width: '100%' }}
                required
            />
            <br />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Categoría del Producto"
                className="m-2"
                style={{ width: '100%' }}
                required
            />
            <br />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={ 6 }
                placeholder="Descripción del Producto"
                className="m-2"
                style={{ width: '100%' }}
                required
            />
            <br />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ubicación del Producto"
                className="m-2"
                style={{ width: '100%' }}
                required
            />
            <br />
            <button 
                type="submit" 
                className="box-border m-2"
                style={{ width: '45%' }}>
                    {producto ? 'Actualizar' : 'Crear'}
            </button>
            <button 
                type="button" 
                onClick={ handleReset }
                className="box-border m-2"
                style={{ width: '45%' }}>
                    Limpiar
            </button>
        </form>
    );
};