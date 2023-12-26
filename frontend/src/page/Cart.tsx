import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../components/CartProduct';
import EmptyGif from '../assets/empty-cart1.gif';


const Cart = () => {

    const productCartItem = useSelector((state: any) => state.product.cartItem)
    console.log(productCartItem);

    // /get t0toal price
    const totalPrice = productCartItem.reduce((acc: any, curr: any) => acc + parseInt(curr.total), 0)
    //get qty
    const totalQty = productCartItem.reduce((acc: any, curr: any) => acc + parseInt(curr.qty), 0)

    return (

        <>


            <div className="p-2 md:p-4">
                <h2 className="text-lg md:text-2xl font-bold text-slate-800 font-mono">Your Cart Items 🛒</h2>

                {/* calculate items */}

                {
                    // if product exist it show cart else it didnt show cart
                    productCartItem[0] ?

                        <div className="my-2 gap-3 flex">
                            {/* display cart items */}
                            <div className="w-full max-w-3xl ">
                                {
                                    productCartItem.map((el: any) => {
                                        return (
                                            <CartProduct
                                                key={el._id}
                                                id={el._id}
                                                image={el.image}
                                                name={el.name}
                                                price={el.price}
                                                category={el.category}
                                                qty={el.qty}
                                                total={el.total}
                                            />
                                        )
                                    })
                                }
                            </div>

                            {/* total cart items */}
                            <div className="w-full max-w-md bg-slate-400 ml-auto">
                                <h2 className="bg-blue-600 text-white p-2 text-lg ">Summery</h2>
                                <div className="flex w-full py-2 text-lg border-b">
                                    <p>Total Qty</p>
                                    <p className="ml-auto w-24 font-bold">{totalQty}</p>
                                </div>

                                <div className="flex w-full py-2 text-lg border-b">
                                    <p>Total Price</p>
                                    <p className="ml-auto w-24 font-bold"> <span className="text-red-500">Rs. </span>{totalPrice}</p>
                                </div>
                                <button className="bg-red-600 w-full text-lg font-mono py-2 text-white">Payment</button>
                            </div>
                        </div>
                        :
                        <>
                            <div className="flex justify-center items-center m-40 flex-col">
                                <img src={EmptyGif} alt="" className="bg-slate-400 w-full max-w-sm" />
                                <p className="text-slate-700 text-4xl font-mono">Cart is Empty </p>
                            </div>
                        </>
                }
            </div>

        </>
    )
}

export default Cart;