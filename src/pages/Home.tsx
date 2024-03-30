import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLatestProductsQuery } from "../Redux/Api/Product";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { CartItem } from "../Types/Types";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Reducer/Cart";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Item added to Cart");
  };

  if (isError) toast.error("Cannot fetch the Products");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
