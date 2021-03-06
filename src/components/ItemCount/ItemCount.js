import {useContext, useState} from "react";
import './ItemCount.css';
import CartContext from "../../context/CartContext";
import Swal from 'sweetalert2';

const ItemCount = ({setShowFinishButton, item}) => {
    const[count, setCount] = useState(0);

    const {addItemToCart} = useContext(CartContext);

    const addCount = () => {
        if(item.stock === 0){
            Swal.fire({
                title: 'Lo lamentamos!',
                text: 'No tenemos este servicio disponible momentáneamente',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor:'#1f5996',
                width: '320px'
            })
        } else if(item.stock > count){
            setCount(count + 1);
        }else{
            Swal.fire({
                title: 'Haz alcanzado el límite de unidades para este servicio!',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor:'#1f5996',
                width: '320px'
            })
        }
    }

    const removeCount = () => {
        if(count > 0){
            setCount(count - 1);
        }
    }

    const onAdd = () => {
        if(item.stock === 0){
            Swal.fire({
                title: 'Lo lamentamos!',
                text: 'No tenemos este servicio disponible momentáneamente',
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor:'#1f5996',
                width: '320px'
            })
        }else if(count > 0){
            addItemToCart(item, count);
            setShowFinishButton(true);
        }else{
            Swal.fire({
                title: 'Ups!',
                text: 'Debe ingresar una unidad mayor a 0!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor:'#1f5996',
                width: '320px'
            })
        }
    }

    return (
        <>
        <div className="itemCountContainer">
            <div className="itemCount">
                <button className="sizeButton" onClick={removeCount}>-</button>
                <p>{count}</p>
                <button className="sizeButton" onClick={addCount}>+</button>
            </div>
            <div>
                <button className="addCartButton" onClick={onAdd}>Agregar al carrito</button>
            </div>
        </div>
        </>
      );
}

export default ItemCount